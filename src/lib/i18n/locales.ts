import type { Language } from '@watergis/maplibre-gl-export';

/**
 * Locale definition.
 *
 * The site ships one locale per major official language of every nationality
 * held by an attendee (see `nationality-languages.ts`). The order of
 * {@link LOCALES} below is *not* a UI order any more — `LanguageDialog.svelte`
 * sorts at runtime by attendee count — it only decides the order in which the
 * `hreflang` alternates are emitted. It is kept roughly count-descending for
 * readability.
 */
export interface LocaleDefinition {
	/**
	 * URL segment, e.g. `/ja`. Always lowercase: these become prerendered file
	 * names (`build/zh-hant.html`), and mixed-case paths break on static hosts.
	 */
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
	/**
	 * Locale of `MaplibreExportControl`, which ships its own smaller set:
	 * `en fr fi de sv es ca vi uk zhHans zhHant ja pt ru`. Anything else is `en`.
	 */
	exportLocal: Language;
	/** Writing direction. Drives `<html dir>` and the logical CSS properties. */
	dir: 'ltr' | 'rtl';
	/**
	 * Canonical BCP 47 tag for `hreflang` / `<html lang>` when it differs from
	 * the lowercase {@link code}. Only Traditional Chinese needs it today.
	 */
	bcp47?: string;
}

export const LOCALES = [
	{
		code: 'en',
		label: 'English',
		flag: 'gb',
		dateLocale: 'en-US',
		protomaps: 'en',
		exportLocal: 'en',
		dir: 'ltr'
	},
	{
		code: 'ja',
		label: '日本語',
		flag: 'jp',
		dateLocale: 'ja-JP',
		protomaps: 'ja',
		exportLocal: 'ja',
		dir: 'ltr'
	},
	{
		code: 'ko',
		label: '한국어',
		flag: 'kr',
		dateLocale: 'ko-KR',
		protomaps: 'ko',
		exportLocal: 'en',
		dir: 'ltr'
	},
	{
		code: 'fr',
		label: 'Français',
		flag: 'fr',
		dateLocale: 'fr-FR',
		protomaps: 'fr',
		exportLocal: 'fr',
		dir: 'ltr'
	},
	{
		code: 'th',
		label: 'ไทย',
		flag: 'th',
		dateLocale: 'th-TH',
		protomaps: 'en',
		exportLocal: 'en',
		dir: 'ltr'
	},
	{
		code: 'pt',
		label: 'Português',
		flag: 'pt',
		dateLocale: 'pt-PT',
		protomaps: 'pt',
		exportLocal: 'pt',
		dir: 'ltr'
	},
	{
		code: 'hi',
		label: 'हिन्दी',
		flag: 'in',
		dateLocale: 'hi-IN',
		protomaps: 'hi',
		exportLocal: 'en',
		dir: 'ltr'
	},
	{
		code: 'de',
		label: 'Deutsch',
		flag: 'de',
		dateLocale: 'de-DE',
		protomaps: 'de',
		exportLocal: 'de',
		dir: 'ltr'
	},
	{
		code: 'zh',
		label: '中文（简体）',
		flag: 'cn',
		dateLocale: 'zh-Hans-CN',
		protomaps: 'zh-Hans',
		exportLocal: 'zhHans',
		dir: 'ltr'
	},
	{
		code: 'ms',
		label: 'Bahasa Melayu',
		flag: 'my',
		dateLocale: 'ms-MY',
		protomaps: 'en',
		exportLocal: 'en',
		dir: 'ltr'
	},
	{
		code: 'it',
		label: 'Italiano',
		flag: 'it',
		dateLocale: 'it-IT',
		protomaps: 'it',
		exportLocal: 'en',
		dir: 'ltr'
	},
	{
		code: 'es',
		label: 'Español',
		flag: 'es',
		dateLocale: 'es-ES',
		protomaps: 'es',
		exportLocal: 'es',
		dir: 'ltr'
	},
	{
		code: 'no',
		label: 'Norsk',
		flag: 'no',
		dateLocale: 'nb-NO',
		protomaps: 'no',
		exportLocal: 'en',
		dir: 'ltr'
	},
	{
		code: 'fil',
		label: 'Filipino',
		flag: 'ph',
		dateLocale: 'fil-PH',
		protomaps: 'en',
		exportLocal: 'en',
		dir: 'ltr'
	},
	{
		code: 'ta',
		label: 'தமிழ்',
		flag: 'in',
		dateLocale: 'ta-IN',
		protomaps: 'en',
		exportLocal: 'en',
		dir: 'ltr'
	},
	{
		code: 'nl',
		label: 'Nederlands',
		flag: 'nl',
		dateLocale: 'nl-NL',
		protomaps: 'nl',
		exportLocal: 'en',
		dir: 'ltr'
	},
	{
		code: 'sw',
		label: 'Kiswahili',
		flag: 'ke',
		dateLocale: 'sw-KE',
		protomaps: 'en',
		exportLocal: 'en',
		dir: 'ltr'
	},
	{
		code: 'id',
		label: 'Bahasa Indonesia',
		flag: 'id',
		dateLocale: 'id-ID',
		protomaps: 'id',
		exportLocal: 'en',
		dir: 'ltr'
	},
	{
		code: 'pl',
		label: 'Polski',
		flag: 'pl',
		dateLocale: 'pl-PL',
		protomaps: 'pl',
		exportLocal: 'en',
		dir: 'ltr'
	},
	{
		code: 'sl',
		label: 'Slovenščina',
		flag: 'si',
		dateLocale: 'sl-SI',
		protomaps: 'sl',
		exportLocal: 'en',
		dir: 'ltr'
	},
	{
		code: 'hr',
		label: 'Hrvatski',
		flag: 'hr',
		dateLocale: 'hr-HR',
		protomaps: 'hr',
		exportLocal: 'en',
		dir: 'ltr'
	},
	{
		code: 'zh-hant',
		label: '中文（繁體）',
		flag: 'tw',
		dateLocale: 'zh-Hant-TW',
		protomaps: 'zh-Hant',
		exportLocal: 'zhHant',
		dir: 'ltr',
		// Lowercase in the URL, canonical casing in `lang`/`hreflang`.
		bcp47: 'zh-Hant'
	},
	{
		code: 'ar',
		label: 'العربية',
		// `ar-EG` rather than `ar-SA`: some ICU builds pair `ar-SA` with the
		// Umm al-Qura calendar, which would date the stats in Hijri years.
		flag: 'sa',
		dateLocale: 'ar-EG',
		protomaps: 'ar',
		exportLocal: 'en',
		dir: 'rtl'
	},
	{
		code: 'ro',
		label: 'Română',
		flag: 'ro',
		dateLocale: 'ro-RO',
		protomaps: 'ro',
		exportLocal: 'en',
		dir: 'ltr'
	},
	{
		code: 'sv',
		label: 'Svenska',
		flag: 'se',
		dateLocale: 'sv-SE',
		protomaps: 'sv',
		exportLocal: 'sv',
		dir: 'ltr'
	},
	{
		code: 'cs',
		label: 'Čeština',
		flag: 'cz',
		dateLocale: 'cs-CZ',
		protomaps: 'cs',
		exportLocal: 'en',
		dir: 'ltr'
	},
	{
		code: 'et',
		label: 'Eesti',
		flag: 'ee',
		dateLocale: 'et-EE',
		protomaps: 'et',
		exportLocal: 'en',
		dir: 'ltr'
	},
	{
		code: 'tr',
		label: 'Türkçe',
		flag: 'tr',
		dateLocale: 'tr-TR',
		protomaps: 'tr',
		exportLocal: 'en',
		dir: 'ltr'
	},
	{
		code: 'ur',
		label: 'اردو',
		flag: 'pk',
		dateLocale: 'ur-PK',
		protomaps: 'ur',
		exportLocal: 'en',
		dir: 'rtl'
	},
	{
		code: 'da',
		label: 'Dansk',
		flag: 'dk',
		dateLocale: 'da-DK',
		protomaps: 'da',
		exportLocal: 'en',
		dir: 'ltr'
	},
	{
		code: 'fi',
		label: 'Suomi',
		flag: 'fi',
		dateLocale: 'fi-FI',
		protomaps: 'fi',
		exportLocal: 'fi',
		dir: 'ltr'
	},
	{
		code: 'ne',
		label: 'नेपाली',
		flag: 'np',
		dateLocale: 'ne-NP',
		protomaps: 'ne',
		exportLocal: 'en',
		dir: 'ltr'
	},
	{
		code: 'si',
		label: 'සිංහල',
		flag: 'lk',
		dateLocale: 'si-LK',
		protomaps: 'en',
		exportLocal: 'en',
		dir: 'ltr'
	},
	{
		code: 'vi',
		label: 'Tiếng Việt',
		flag: 'vn',
		dateLocale: 'vi-VN',
		protomaps: 'vi',
		exportLocal: 'vi',
		dir: 'ltr'
	},
	{
		code: 'fa',
		// `fa-IR` resolves to the Persian calendar, which is what Persian
		// readers expect (`th-TH` likewise already renders Buddhist years).
		label: 'فارسی',
		flag: 'ir',
		dateLocale: 'fa-IR',
		protomaps: 'fa',
		exportLocal: 'en',
		dir: 'rtl'
	},
	{
		code: 'ru',
		label: 'Русский',
		flag: 'ru',
		dateLocale: 'ru-RU',
		protomaps: 'ru',
		exportLocal: 'ru',
		dir: 'ltr'
	},
	{
		code: 'sk',
		label: 'Slovenčina',
		flag: 'sk',
		dateLocale: 'sk-SK',
		protomaps: 'sk',
		exportLocal: 'en',
		dir: 'ltr'
	},
	{
		code: 'sq',
		label: 'Shqip',
		flag: 'al',
		dateLocale: 'sq-AL',
		protomaps: 'en',
		exportLocal: 'en',
		dir: 'ltr'
	},
	{
		code: 'sr',
		label: 'Српски',
		flag: 'rs',
		dateLocale: 'sr-RS',
		protomaps: 'en',
		exportLocal: 'en',
		dir: 'ltr'
	},
	{
		code: 'uk',
		label: 'Українська',
		flag: 'ua',
		dateLocale: 'uk-UA',
		protomaps: 'uk',
		exportLocal: 'uk',
		dir: 'ltr'
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
 * The tag to put in `lang` / `hreflang` / `Intl` lookups, which is the locale
 * code unless a canonical BCP 47 spelling was declared.
 */
export function localeTag(locale: LocaleDefinition | Locale): string {
	// Widened to the interface: the `as const` literals drop the optional
	// `bcp47` key entirely on the entries that do not declare it.
	const definition: LocaleDefinition =
		typeof locale === 'string' ? getLocaleDefinition(locale) : locale;
	return definition.bcp47 ?? definition.code;
}

/**
 * Browser tags that do not match a locale code but clearly mean one of them.
 * Without `zh-tw` here a Taiwanese visitor would fall through to `zh`
 * (Simplified) via the base-code rule below.
 */
const LANGUAGE_ALIASES: Record<string, Locale> = {
	'zh-tw': 'zh-hant',
	'zh-hk': 'zh-hant',
	'zh-mo': 'zh-hant',
	'zh-hant': 'zh-hant',
	'zh-cn': 'zh',
	'zh-sg': 'zh',
	'zh-hans': 'zh',
	nb: 'no',
	nn: 'no',
	tl: 'fil',
	// Legacy ISO 639 codes still emitted by some browsers.
	in: 'id',
	mo: 'ro'
};

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
		const parts = language.toLowerCase().split('-');
		// Longest prefix first, so `zh-hant-hk` matches `zh-hant` before `zh`.
		for (let length = parts.length; length >= 1; length--) {
			const prefix = parts.slice(0, length).join('-');
			if (isLocale(prefix)) return prefix;
			const alias = LANGUAGE_ALIASES[prefix];
			if (alias) return alias;
		}
	}

	return DEFAULT_LOCALE;
}
