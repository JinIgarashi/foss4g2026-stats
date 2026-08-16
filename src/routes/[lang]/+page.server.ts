import { error } from '@sveltejs/kit';
import nationalityDataRaw from '$lib/assets/nationality.geojson?raw';
import residenceDataRaw from '$lib/assets/residence.geojson?raw';
import { isLocale, LOCALES } from '$lib/i18n/locales';
import { REGION_KEYS } from '$lib/i18n/regions';

type LocationProperties = {
	count: number;
	name?: string;
	country?: string;
	region?: string;
	iso?: string;
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

/**
 * Warns once during prerender when the GeoJSON carries geography the UI cannot
 * localize — the chart and table fall back to the raw English string, which is
 * easy to miss. Both cases mean `scripts/geocoding-attendee-locations.ts`
 * produced something new: a country without an `ISO_A2_EH` code, or a
 * `REGION_WB` value missing from the `region` message namespace.
 */
function warnUnlocalizableGeography(label: string, data: GeoJSONData): void {
	const withoutIso = new Set<string>();
	const unknownRegions = new Set<string>();

	for (const { properties } of data.features) {
		if (properties.country && !properties.iso) withoutIso.add(properties.country);
		if (properties.region && !(properties.region in REGION_KEYS))
			unknownRegions.add(properties.region);
	}

	if (withoutIso.size > 0) {
		console.warn(
			`[i18n] ${label} has countries without an ISO code, so they cannot be localized: ${[...withoutIso].join(', ')}`
		);
	}
	if (unknownRegions.size > 0) {
		console.warn(
			`[i18n] ${label} has regions missing from the \`region\` messages: ${[...unknownRegions].join(', ')}`
		);
	}
}

warnUnlocalizableGeography('nationality.geojson', nationalityData);
warnUnlocalizableGeography('residence.geojson', residenceData);

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
