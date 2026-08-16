import nationalityDataRaw from '$lib/assets/nationality.geojson?raw';
import type { Locale } from '$lib/i18n/locales';
import {
	NATIONALITY_LANGUAGES,
	UNMAPPED_NATIONALITIES,
	type NationalityEntry
} from '$lib/i18n/nationality-languages';

type NationalityFeatures = GeoJSON.FeatureCollection<
	GeoJSON.Point,
	{ name?: string; count: number }
>;

/**
 * Attendees per site language, so the language dialog can order and label its
 * entries. Computed once at module scope while prerendering rather than kept
 * as a checked-in table, which would drift the moment
 * `scripts/geocoding-attendee-locations.ts` regenerates the GeoJSON.
 *
 * A nationality mapping to several official languages adds its count to each
 * of them, so the totals deliberately sum to more than the attendee count.
 */
const languageCounts: Partial<Record<Locale, number>> = (() => {
	const data: NationalityFeatures = JSON.parse(nationalityDataRaw);
	const counts: Partial<Record<Locale, number>> = {};
	const unmapped: string[] = [];

	for (const feature of data.features) {
		const name = feature.properties.name ?? '';
		const entry: NationalityEntry | undefined =
			NATIONALITY_LANGUAGES[name as keyof typeof NATIONALITY_LANGUAGES];

		if (!entry) {
			if (!UNMAPPED_NATIONALITIES.includes(name)) unmapped.push(name);
			continue;
		}

		for (const code of entry.languages)
			counts[code] = (counts[code] ?? 0) + feature.properties.count;
	}

	if (unmapped.length > 0) {
		console.warn(
			`[i18n] nationality.geojson has names missing from NATIONALITY_LANGUAGES: ${unmapped.join(', ')}`
		);
	}

	return counts;
})();

export function load() {
	return { languageCounts };
}
