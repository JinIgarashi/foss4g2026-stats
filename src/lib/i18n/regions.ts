import type { Messages } from './messages/en';

/**
 * The seven World Bank regions (`REGION_WB` in Natural Earth) that
 * `scripts/geocoding-attendee-locations.ts` writes to `properties.region`.
 *
 * Unlike country names, these have no `Intl` equivalent — there is no
 * `DisplayNames` type for World Bank regions — so they are the one geographic
 * vocabulary translated by hand, in the `region` namespace of every message
 * file. Keys here are the raw strings, verbatim.
 */
export const REGION_KEYS = {
	'East Asia & Pacific': 'eastAsiaPacific',
	'Europe & Central Asia': 'europeCentralAsia',
	'Latin America & Caribbean': 'latinAmericaCaribbean',
	'Middle East & North Africa': 'middleEastNorthAfrica',
	'North America': 'northAmerica',
	'South Asia': 'southAsia',
	'Sub-Saharan Africa': 'subSaharanAfrica'
} as const satisfies Record<string, keyof Messages['region']>;

/**
 * The region name in the active language, or the raw value for anything
 * unmapped — including the `-` placeholder used when a point matched no
 * country.
 */
export function localizeRegion(raw: string, t: Messages): string {
	const key = REGION_KEYS[raw as keyof typeof REGION_KEYS];
	return key ? t.region[key] : raw;
}
