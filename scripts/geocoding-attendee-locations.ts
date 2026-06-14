import { parse } from 'csv-parse/sync';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(import.meta.dirname, 'data');
const CACHE_FILE = join(DATA_DIR, 'geocode-cache.json');
const OUTPUT_DIR = join(import.meta.dirname, '..', 'static');

const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org/search';
const USER_AGENT = 'foss4g2026-stats (https://github.com/JinIgarashi/foss4g2026-stats)';

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
	properties: { name: string; count: number };
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

			const city = (row['City and Country'] || '').trim();
			const nationality = (row['Nationality'] || '').trim();

			if (city) {
				residenceCounts.set(city, (residenceCounts.get(city) || 0) + 1);
			}
			if (nationality) {
				nationalityCounts.set(nationality, (nationalityCounts.get(nationality) || 0) + 1);
			}
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
	for (const [key, { lat, lon, count, names }] of residenceGeo) {
		residenceForGeoJSON.set(names.join(', '), { lat, lon, count });
	}

	const residenceFeatures = buildGeoJSON(residenceForGeoJSON);
	const nationalityFeatures = buildGeoJSON(nationalityGeo);

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
