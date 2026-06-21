/**
 * Utility helpers for converting GeoJSON data into chart-friendly formats.
 */

export type LocationProperties = {
	count: number;
	name?: string;
	country?: string;
	region?: string;
};

export type GeoJSONFeature = GeoJSON.Feature<GeoJSON.Point, LocationProperties & { name: string }>;

export interface ChartData {
	name: string;
	count: number;
	country: string;
	region: string;
}

/**
 * Converts an array of GeoJSON features into chart data.
 * @param features - Array of GeoJSON features.
 * @returns Array in chart-ready format.
 */
export function geoJsonToChartData(features: GeoJSONFeature[]): ChartData[] {
	return features
		.map((feature) => ({
			name: feature.properties.name || 'Unknown',
			count: feature.properties.count || 0,
			country: feature.properties.country || '-',
			region: feature.properties.region || '-'
		}))
		.sort((a, b) => b.count - a.count);
}

/**
 * Filters GeoJSON features by the given coordinate bounds.
 * @param features - Array of GeoJSON features.
 * @param bounds - Coordinate bounds as [west, south, east, north].
 * @returns Filtered features.
 */
export function filterFeaturesByBounds(
	features: GeoJSONFeature[],
	bounds: [number, number, number, number]
): GeoJSONFeature[] {
	const [west, south, east, north] = bounds;

	return features.filter((feature) => {
		const [lng, lat] = feature.geometry.coordinates;
		return lng >= west && lng <= east && lat >= south && lat <= north;
	});
}

/**
 * Calculates summary statistics for chart data.
 * @param features - Array of GeoJSON features.
 * @returns { total: total attendees, locations: number of locations }
 */
export function calculateStats(features: GeoJSONFeature[]): {
	total: number;
	locations: number;
} {
	const total = features.reduce((sum, f) => sum + (f.properties.count || 0), 0);
	const locations = features.length;

	return { total, locations };
}
