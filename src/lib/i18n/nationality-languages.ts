import type { Locale } from './locales';

/**
 * Which site languages a nationality maps to.
 *
 * Scope is *major* official languages: a country whose only other official
 * language is a small-nation or minority one (Tetum, Guaraní, Lingala,
 * Chichewa, Fijian, Samoan, Luxembourgish, Māori, Romansh) maps to the
 * lingua franca instead, because we cannot maintain a trustworthy UI
 * translation for those. Countries with several widely-written official
 * languages (Canada, Switzerland, Singapore, India, Pakistan…) map to all of
 * them, and their attendee count is added to each.
 */
export interface NationalityEntry {
	/** ISO 3166-1 alpha-2, used with `Intl.DisplayNames({ type: 'region' })`. */
	iso: string;
	languages: readonly Locale[];
}

/**
 * Keys are the verbatim `properties.name` values in
 * `$lib/assets/nationality.geojson` — free text as the attendee typed it, so
 * `Türkiye`, `Czechia` and `Congo, The Democratic Republic of the` are exact.
 *
 * `No answer` is deliberately absent: those attendees gave no nationality and
 * are excluded from every per-language count.
 */
export const NATIONALITY_LANGUAGES = {
	Japan: { iso: 'JP', languages: ['ja'] },
	'South Korea': { iso: 'KR', languages: ['ko'] },
	'United States': { iso: 'US', languages: ['en'] },
	Thailand: { iso: 'TH', languages: ['th'] },
	Australia: { iso: 'AU', languages: ['en'] },
	India: { iso: 'IN', languages: ['hi', 'en'] },
	Brazil: { iso: 'BR', languages: ['pt'] },
	Canada: { iso: 'CA', languages: ['en', 'fr'] },
	Germany: { iso: 'DE', languages: ['de'] },
	China: { iso: 'CN', languages: ['zh'] },
	'United Kingdom': { iso: 'GB', languages: ['en'] },
	France: { iso: 'FR', languages: ['fr'] },
	Norway: { iso: 'NO', languages: ['no'] },
	Philippines: { iso: 'PH', languages: ['fil', 'en'] },
	Italy: { iso: 'IT', languages: ['it'] },
	'New Zealand': { iso: 'NZ', languages: ['en'] },
	Netherlands: { iso: 'NL', languages: ['nl'] },
	Malaysia: { iso: 'MY', languages: ['ms'] },
	Poland: { iso: 'PL', languages: ['pl'] },
	Slovenia: { iso: 'SI', languages: ['sl'] },
	Singapore: { iso: 'SG', languages: ['en', 'zh', 'ms', 'ta'] },
	Indonesia: { iso: 'ID', languages: ['id'] },
	Croatia: { iso: 'HR', languages: ['hr'] },
	Kenya: { iso: 'KE', languages: ['sw', 'en'] },
	Taiwan: { iso: 'TW', languages: ['zh-hant'] },
	Portugal: { iso: 'PT', languages: ['pt'] },
	Switzerland: { iso: 'CH', languages: ['de', 'fr', 'it'] },
	Spain: { iso: 'ES', languages: ['es'] },
	Romania: { iso: 'RO', languages: ['ro'] },
	Fiji: { iso: 'FJ', languages: ['en'] },
	Czechia: { iso: 'CZ', languages: ['cs'] },
	Nigeria: { iso: 'NG', languages: ['en'] },
	Estonia: { iso: 'EE', languages: ['et'] },
	Türkiye: { iso: 'TR', languages: ['tr'] },
	Pakistan: { iso: 'PK', languages: ['ur', 'en'] },
	Denmark: { iso: 'DK', languages: ['da'] },
	Egypt: { iso: 'EG', languages: ['ar'] },
	Tanzania: { iso: 'TZ', languages: ['sw', 'en'] },
	Paraguay: { iso: 'PY', languages: ['es'] },
	Vietnam: { iso: 'VN', languages: ['vi'] },
	Finland: { iso: 'FI', languages: ['fi', 'sv'] },
	Colombia: { iso: 'CO', languages: ['es'] },
	'Timor-Leste': { iso: 'TL', languages: ['pt'] },
	'Saudi Arabia': { iso: 'SA', languages: ['ar'] },
	'Sri Lanka': { iso: 'LK', languages: ['si', 'ta'] },
	'South Africa': { iso: 'ZA', languages: ['en'] },
	Sweden: { iso: 'SE', languages: ['sv'] },
	Nepal: { iso: 'NP', languages: ['ne'] },
	Malawi: { iso: 'MW', languages: ['en'] },
	Mexico: { iso: 'MX', languages: ['es'] },
	Austria: { iso: 'AT', languages: ['de'] },
	Argentina: { iso: 'AR', languages: ['es'] },
	Jamaica: { iso: 'JM', languages: ['en'] },
	Luxembourg: { iso: 'LU', languages: ['fr', 'de'] },
	Slovakia: { iso: 'SK', languages: ['sk'] },
	Ukraine: { iso: 'UA', languages: ['uk'] },
	Albania: { iso: 'AL', languages: ['sq'] },
	'Russian Federation': { iso: 'RU', languages: ['ru'] },
	'Hong Kong': { iso: 'HK', languages: ['zh-hant', 'en'] },
	'Congo, The Democratic Republic of the': { iso: 'CD', languages: ['fr'] },
	Serbia: { iso: 'RS', languages: ['sr'] },
	Iran: { iso: 'IR', languages: ['fa'] },
	'Syrian Arab Republic': { iso: 'SY', languages: ['ar'] },
	Samoa: { iso: 'WS', languages: ['en'] },
	'United Arab Emirates': { iso: 'AE', languages: ['ar'] }
} as const satisfies Record<string, NationalityEntry>;

export type Nationality = keyof typeof NATIONALITY_LANGUAGES;

/**
 * Nationalities that are known to carry no language, so an unmapped name is a
 * data change worth warning about rather than an oversight.
 */
export const UNMAPPED_NATIONALITIES: readonly string[] = ['No answer'];

function invert<T>(pick: (entry: NationalityEntry, name: string) => T): Record<string, T[]> {
	const result: Record<string, T[]> = {};
	for (const [name, entry] of Object.entries(NATIONALITY_LANGUAGES) as [
		string,
		NationalityEntry
	][]) {
		for (const code of entry.languages) (result[code] ??= []).push(pick(entry, name));
	}
	return result;
}

/** Locale → the nationality names (English, as in the geojson) that map to it. */
export const LOCALE_NATIONALITIES: Record<string, readonly string[]> = invert(
	(_entry, name) => name
);

/** Locale → the ISO 3166-1 alpha-2 codes that map to it, for `Intl.DisplayNames`. */
export const LOCALE_REGIONS: Record<string, readonly string[]> = invert((entry) => entry.iso);
