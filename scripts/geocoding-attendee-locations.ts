import { parse } from 'csv-parse/sync';
import duckdb from 'duckdb';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(import.meta.dirname, 'data');
const CACHE_FILE = join(DATA_DIR, 'geocode-cache.json');
const COUNTRIES_PARQUET_FILE = join(DATA_DIR, 'ne_10m_admin_0_countries.parquet');
const OUTPUT_DIR = join(import.meta.dirname, '..', 'src', 'lib', 'assets');

const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org/search';
const USER_AGENT = 'foss4g2026-stats (https://github.com/JinIgarashi/foss4g2026-stats)';
const NO_ANSWER_LABEL = 'No answer';
const NULL_ISLAND = { lat: 0, lon: 0 };

interface NominatimResult {
	lat: string;
	lon: string;
	display_name: string;
}

interface GeoCache {
	[query: string]: { lat: number; lon: number; display_name: string } | null;
}

interface GeoJSONFeature {
	type: 'Feature';
	geometry: { type: 'Point'; coordinates: [number, number] };
	properties: { name: string; count: number; country?: string; region?: string };
}

interface PointCountryRegionRow {
	feature_index: number;
	country: string | null;
	region: string | null;
}

function escapeSqlString(input: string): string {
	return input.replace(/'/g, "''");
}

function runSql(conn: duckdb.Database, sql: string): Promise<void> {
	return new Promise((resolve, reject) => {
		conn.run(sql, (err) => {
			if (err) {
				reject(err);
				return;
			}
			resolve();
		});
	});
}

function allSql<T>(conn: duckdb.Database, sql: string): Promise<T[]> {
	return new Promise((resolve, reject) => {
		conn.all(sql, (err: Error | null, rows: unknown) => {
			if (err) {
				reject(err);
				return;
			}
			resolve((rows ?? []) as T[]);
		});
	});
}

function closeConnection(conn: duckdb.Database): Promise<void> {
	return new Promise((resolve, reject) => {
		conn.close((err) => {
			if (err) {
				reject(err);
				return;
			}
			resolve();
		});
	});
}

async function enrichGeoJsonWithCountryAndRegion(features: GeoJSONFeature[]): Promise<void> {
	if (!existsSync(COUNTRIES_PARQUET_FILE)) {
		console.warn('Countries parquet file was not found. country/region enrichment skipped.');
		return;
	}

	if (features.length === 0) {
		return;
	}

	const conn = new duckdb.Database(':memory:');

	try {
		try {
			await runSql(conn, 'LOAD spatial;');
		} catch {
			await runSql(conn, 'INSTALL spatial;');
			await runSql(conn, 'LOAD spatial;');
		}

		await runSql(
			conn,
			'CREATE TEMP TABLE points (feature_index INTEGER, name VARCHAR, count INTEGER, lon DOUBLE, lat DOUBLE);'
		);

		const pointRows = features
			.map((feature, featureIndex) => {
				const [lon, lat] = feature.geometry.coordinates;
				const name = escapeSqlString(feature.properties.name || 'Unknown');
				const count = Number.isFinite(feature.properties.count) ? feature.properties.count : 0;
				return `(${featureIndex}, '${name}', ${count}, ${lon}, ${lat})`;
			})
			.join(', ');

		await runSql(conn, `INSERT INTO points VALUES ${pointRows};`);

		const parquetPath = escapeSqlString(COUNTRIES_PARQUET_FILE);
		const pointCountryRegion = await allSql<PointCountryRegionRow>(
			conn,
			`
				WITH countries AS (
					SELECT
						NAME,
						REGION_WB,
						CASE
							WHEN TRY_CAST(geometry AS GEOMETRY) IS NOT NULL THEN TRY_CAST(geometry AS GEOMETRY)
							ELSE ST_GeomFromWKB(CAST(geometry AS BLOB))
						END AS geom
					FROM read_parquet('${parquetPath}')
				),
				polygon_matches AS (
					SELECT
						p.feature_index,
						c.NAME AS country,
						c.REGION_WB AS region,
						1 AS match_priority,
						CASE
							WHEN lower(p.name) LIKE '%' || lower(c.NAME) || '%' THEN 0
							ELSE 1
						END AS name_bias,
						0.0 AS centroid_distance,
						ST_Area(c.geom) AS area
					FROM points p
					JOIN countries c ON ST_Intersects(ST_Point(p.lon, p.lat), c.geom)
				),
				bbox_matches AS (
					SELECT
						p.feature_index,
						c.NAME AS country,
						c.REGION_WB AS region,
						2 AS match_priority,
						CASE
							WHEN lower(p.name) LIKE '%' || lower(c.NAME) || '%' THEN 0
							ELSE 1
						END AS name_bias,
						ST_Distance(ST_Point(p.lon, p.lat), ST_Centroid(c.geom)) AS centroid_distance,
						ST_Area(c.geom) AS area
					FROM points p
					JOIN countries c ON ST_Intersects(ST_Point(p.lon, p.lat), ST_Envelope(c.geom))
					WHERE NOT EXISTS (
						SELECT 1
						FROM polygon_matches pm
						WHERE pm.feature_index = p.feature_index
					)
				),
				candidate_matches AS (
					SELECT * FROM polygon_matches
					UNION ALL
					SELECT * FROM bbox_matches
				),
				ranked_matches AS (
					SELECT
						p.feature_index,
						cm.country,
						cm.region,
						ROW_NUMBER() OVER (
							PARTITION BY p.feature_index
							ORDER BY cm.match_priority, cm.name_bias, cm.centroid_distance, cm.area
						) AS rank_in_match
					FROM points p
					LEFT JOIN candidate_matches cm ON p.feature_index = cm.feature_index
				)
				SELECT feature_index, country, region
				FROM ranked_matches
				WHERE rank_in_match = 1 OR rank_in_match IS NULL
				ORDER BY feature_index;
			`
		);

		for (const row of pointCountryRegion) {
			const feature = features[row.feature_index];
			if (!feature) continue;

			if (row.country) {
				feature.properties.country = row.country;
			}
			if (row.region) {
				feature.properties.region = row.region;
			}
		}
	} finally {
		await closeConnection(conn);
	}
}

function loadCache(): GeoCache {
	if (existsSync(CACHE_FILE)) {
		return JSON.parse(readFileSync(CACHE_FILE, 'utf-8'));
	}
	return {};
}

function saveCache(cache: GeoCache): void {
	writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

async function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function geocode(
	query: string,
	cache: GeoCache
): Promise<{ lat: number; lon: number; display_name: string } | null> {
	if (query in cache) {
		return cache[query];
	}

	const url = new URL(NOMINATIM_BASE);
	url.searchParams.set('q', query);
	url.searchParams.set('format', 'json');
	url.searchParams.set('limit', '1');

	await sleep(1000);

	const res = await fetch(url.toString(), {
		headers: { 'User-Agent': USER_AGENT }
	});

	if (!res.ok) {
		console.error(`  HTTP ${res.status} for "${query}"`);
		cache[query] = null;
		return null;
	}

	const data: NominatimResult[] = await res.json();
	if (data.length === 0) {
		console.warn(`  No results for "${query}"`);
		cache[query] = null;
		return null;
	}

	const result = {
		lat: parseFloat(data[0].lat),
		lon: parseFloat(data[0].lon),
		display_name: data[0].display_name
	};
	cache[query] = result;
	return result;
}

function buildGeoJSON(locationCounts: Map<string, { lat: number; lon: number; count: number }>): {
	type: 'FeatureCollection';
	created_at: string;
	features: GeoJSONFeature[];
} {
	const features: GeoJSONFeature[] = [];
	for (const [name, { lat, lon, count }] of locationCounts) {
		features.push({
			type: 'Feature',
			geometry: { type: 'Point', coordinates: [lon, lat] },
			properties: { name, count }
		});
	}
	return { type: 'FeatureCollection', created_at: new Date().toISOString(), features };
}

async function main() {
	const csvFiles = readdirSync(DATA_DIR).filter((f) => f.endsWith('.csv'));
	if (csvFiles.length === 0) {
		console.error('No CSV files found in scripts/data/');
		process.exit(1);
	}

	const cache = loadCache();
	const seenEmails = new Set<string>();
	const residenceCounts = new Map<string, number>();
	const nationalityCounts = new Map<string, number>();

	for (const file of csvFiles) {
		console.log(`Reading ${file}...`);
		const content = readFileSync(join(DATA_DIR, file), 'utf-8');
		const records: Record<string, string>[] = parse(content, {
			columns: true,
			skip_empty_lines: true,
			trim: true
		});

		for (const row of records) {
			const email = (row['Ticket Email'] || '').toLowerCase().trim();
			if (!email || seenEmails.has(email)) continue;
			seenEmails.add(email);

			const city = (row['City and Country'] || '').trim() || NO_ANSWER_LABEL;
			const nationality = (row['Nationality'] || '').trim() || NO_ANSWER_LABEL;

			residenceCounts.set(city, (residenceCounts.get(city) || 0) + 1);
			nationalityCounts.set(nationality, (nationalityCounts.get(nationality) || 0) + 1);
		}
	}

	console.log(`\nUnique attendees: ${seenEmails.size}`);
	console.log(`Unique residence locations: ${residenceCounts.size}`);
	console.log(`Unique nationalities: ${nationalityCounts.size}`);

	console.log('\nGeocoding residence locations...');
	const residenceGeo = new Map<
		string,
		{ lat: number; lon: number; count: number; names: string[] }
	>();
	let i = 0;
	for (const [city, count] of residenceCounts) {
		i++;
		if (city === NO_ANSWER_LABEL) {
			const key = `${NULL_ISLAND.lat},${NULL_ISLAND.lon}`;
			const existing = residenceGeo.get(key);
			if (existing) {
				existing.count += count;
				if (!existing.names.includes(NO_ANSWER_LABEL)) {
					existing.names.push(NO_ANSWER_LABEL);
				}
			} else {
				residenceGeo.set(key, {
					lat: NULL_ISLAND.lat,
					lon: NULL_ISLAND.lon,
					count,
					names: [NO_ANSWER_LABEL]
				});
			}
			continue;
		}

		const cached = city in cache;
		if (!cached) {
			console.log(`  [${i}/${residenceCounts.size}] Geocoding "${city}"...`);
		}
		const result = await geocode(city, cache);
		if (result) {
			const key = `${result.lat},${result.lon}`;
			const existing = residenceGeo.get(key);
			if (existing) {
				existing.count += count;
				if (!existing.names.includes(city)) {
					existing.names.push(city);
				}
			} else {
				residenceGeo.set(key, { lat: result.lat, lon: result.lon, count, names: [city] });
			}
		}
	}

	console.log('\nGeocoding nationalities...');
	const nationalityGeo = new Map<string, { lat: number; lon: number; count: number }>();
	i = 0;
	for (const [nationality, count] of nationalityCounts) {
		i++;
		if (nationality === NO_ANSWER_LABEL) {
			nationalityGeo.set(NO_ANSWER_LABEL, {
				lat: NULL_ISLAND.lat,
				lon: NULL_ISLAND.lon,
				count
			});
			continue;
		}

		const cached = nationality in cache;
		if (!cached) {
			console.log(`  [${i}/${nationalityCounts.size}] Geocoding "${nationality}"...`);
		}
		const result = await geocode(nationality, cache);
		if (result) {
			nationalityGeo.set(nationality, { lat: result.lat, lon: result.lon, count });
		}
	}

	saveCache(cache);

	const residenceForGeoJSON = new Map<string, { lat: number; lon: number; count: number }>();
	for (const { lat, lon, count, names } of residenceGeo.values()) {
		residenceForGeoJSON.set(names.join(', '), { lat, lon, count });
	}

	const residenceFeatures = buildGeoJSON(residenceForGeoJSON);
	const nationalityFeatures = buildGeoJSON(nationalityGeo);

	console.log('\nAdding country/region attributes with DuckDB spatial intersection...');
	await enrichGeoJsonWithCountryAndRegion(residenceFeatures.features);
	await enrichGeoJsonWithCountryAndRegion(nationalityFeatures.features);

	writeFileSync(join(OUTPUT_DIR, 'residence.geojson'), JSON.stringify(residenceFeatures, null, 2));
	writeFileSync(
		join(OUTPUT_DIR, 'nationality.geojson'),
		JSON.stringify(nationalityFeatures, null, 2)
	);

	console.log(`\nOutput:`);
	console.log(`  residence.geojson: ${residenceFeatures.features.length} points`);
	console.log(`  nationality.geojson: ${nationalityFeatures.features.length} points`);
}

main().catch(console.error);
