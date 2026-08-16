import { localeTag, type Locale } from './locales';

/**
 * Localized country names via `Intl.DisplayNames`.
 *
 * Country names are **never hand-translated** in this project: the GeoJSON
 * carries an ISO 3166-1 alpha-2 code per feature (`properties.iso`, emitted by
 * `scripts/geocoding-attendee-locations.ts` from Natural Earth's `ISO_A2_EH`),
 * and `Intl` turns that into the name in whichever language the visitor picked.
 */

const cache = new Map<string, Intl.DisplayNames>();

/** `Intl.DisplayNames` for a locale, built once per locale and reused. */
export function regionDisplayNames(locale: Locale): Intl.DisplayNames {
	const tag = localeTag(locale);
	let names = cache.get(tag);
	if (!names) {
		names = new Intl.DisplayNames([tag], { type: 'region' });
		cache.set(tag, names);
	}
	return names;
}

/**
 * The country name for `iso` in the active locale.
 *
 * Falls back to `fallback` — the English name already in the data — whenever
 * there is no code, or `Intl` has no translation and echoes the code back.
 */
export function localizeCountry(iso: string | undefined, fallback: string, locale: Locale): string {
	if (!iso) return fallback;

	const localized = regionDisplayNames(locale).of(iso);
	if (!localized || localized === iso) return fallback;

	return localized;
}
