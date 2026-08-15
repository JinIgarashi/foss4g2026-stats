import { error } from '@sveltejs/kit';
import nationalityDataRaw from '$lib/assets/nationality.geojson?raw';
import residenceDataRaw from '$lib/assets/residence.geojson?raw';
import { isLocale, LOCALES } from '$lib/i18n/locales';

type LocationProperties = {
	count: number;
	name?: string;
	country?: string;
	region?: string;
};

type GeoJSONData = GeoJSON.FeatureCollection<GeoJSON.Point, LocationProperties> & {
	created_at?: string;
};

type LayerStats = {
	attendees: number;
	locations: number;
	/** Raw ISO timestamp — formatted client-side so it follows the active locale. */
	createdAt: string;
};

const nationalityData: GeoJSONData = JSON.parse(nationalityDataRaw);
const residenceData: GeoJSONData = JSON.parse(residenceDataRaw);

function calculateStats(data: GeoJSONData): LayerStats {
	const attendees = data.features.reduce(
		(sum: number, f: { properties: { count: number } }) => sum + f.properties.count,
		0
	);
	const locations = data.features.length;

	return { attendees, locations, createdAt: data.created_at ?? '' };
}

export function entries() {
	return LOCALES.map((locale) => ({ lang: locale.code }));
}

export async function load({ params }) {
	if (!isLocale(params.lang)) {
		error(404, 'Unknown language');
	}

	const residenceStats = calculateStats(residenceData);
	const nationalityStats = calculateStats(nationalityData);

	return {
		residenceData,
		residenceStats,
		nationalityData,
		nationalityStats
	};
}
