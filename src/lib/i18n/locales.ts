import type { Language } from '@watergis/maplibre-gl-export';

/**
 * Locale definition.
 *
 * The order of {@link LOCALES} is the order shown in the language dropdown:
 * English first (site default), then Japanese (host country), then the
 * remaining languages ordered by how many attendees hold that nationality.
 */
export interface LocaleDefinition {
	/** URL segment, e.g. `/ja`. */
	code: string;
	/** Name of the language written in that language. */
	label: string;
	/** ISO 3166-1 alpha-2 code used by `flag-icons` (`fi fi-jp`). */
	flag: string;
	/** BCP 47 tag passed to `Intl` / `toLocaleDateString`. */
	dateLocale: string;
	/**
	 * Language code of the Protomaps basemap style.
	 * Protomaps does not translate every language we ship, so unsupported
	 * ones fall back to `en`.
	 * @see https://docs.protomaps.com/basemaps/localization
	 */
	protomaps: string;
	/** Locale of `MaplibreExportControl`, which ships its own smaller set. */
	exportLocal: Language;
}

export const LOCALES = [
	{
		code: 'en',
		label: 'English',
		flag: 'gb',
		dateLocale: 'en-US',
		protomaps: 'en',
		exportLocal: 'en'
	},
	{
		code: 'ja',
		label: '日本語',
		flag: 'jp',
		dateLocale: 'ja-JP',
		protomaps: 'ja',
		exportLocal: 'ja'
	},
	{
		code: 'ko',
		label: '한국어',
		flag: 'kr',
		dateLocale: 'ko-KR',
		protomaps: 'ko',
		exportLocal: 'en'
	},
	{
		code: 'th',
		label: 'ไทย',
		flag: 'th',
		dateLocale: 'th-TH',
		protomaps: 'en',
		exportLocal: 'en'
	},
	{
		code: 'hi',
		label: 'हिन्दी',
		flag: 'in',
		dateLocale: 'hi-IN',
		protomaps: 'hi',
		exportLocal: 'en'
	},
	{
		code: 'pt',
		label: 'Português',
		flag: 'pt',
		dateLocale: 'pt-PT',
		protomaps: 'pt',
		exportLocal: 'pt'
	},
	{
		code: 'de',
		label: 'Deutsch',
		flag: 'de',
		dateLocale: 'de-DE',
		protomaps: 'de',
		exportLocal: 'de'
	},
	{
		code: 'zh',
		label: '中文（简体）',
		flag: 'cn',
		dateLocale: 'zh-Hans-CN',
		protomaps: 'zh-Hans',
		exportLocal: 'zhHans'
	},
	{
		code: 'fr',
		label: 'Français',
		flag: 'fr',
		dateLocale: 'fr-FR',
		protomaps: 'fr',
		exportLocal: 'fr'
	},
	{
		code: 'no',
		label: 'Norsk',
		flag: 'no',
		dateLocale: 'nb-NO',
		protomaps: 'no',
		exportLocal: 'en'
	},
	{
		code: 'fil',
		label: 'Filipino',
		flag: 'ph',
		dateLocale: 'fil-PH',
		protomaps: 'en',
		exportLocal: 'en'
	},
	{
		code: 'it',
		label: 'Italiano',
		flag: 'it',
		dateLocale: 'it-IT',
		protomaps: 'it',
		exportLocal: 'en'
	},
	{
		code: 'es',
		label: 'Español',
		flag: 'es',
		dateLocale: 'es-ES',
		protomaps: 'es',
		exportLocal: 'es'
	}
] as const satisfies readonly LocaleDefinition[];

export type Locale = (typeof LOCALES)[number]['code'];

export const DEFAULT_LOCALE: Locale = 'en';

const LOCALE_BY_CODE = new Map(LOCALES.map((locale) => [locale.code as Locale, locale]));

export function isLocale(value: unknown): value is Locale {
	return typeof value === 'string' && LOCALE_BY_CODE.has(value as Locale);
}

export function getLocaleDefinition(locale: Locale): (typeof LOCALES)[number] {
	return LOCALE_BY_CODE.get(locale) ?? LOCALE_BY_CODE.get(DEFAULT_LOCALE)!;
}

/**
 * Picks the best locale for a visitor landing on `/`, preferring a previously
 * chosen locale over the browser's language list.
 */
export function resolvePreferredLocale(
	stored: string | null,
	navigatorLanguages: readonly string[]
): Locale {
	if (isLocale(stored)) return stored;

	for (const language of navigatorLanguages) {
		if (isLocale(language)) return language;
		const base = language.split('-')[0];
		if (isLocale(base)) return base;
	}

	return DEFAULT_LOCALE;
}
