import { page } from '$app/state';
import { REPO_URL } from '$lib/seo';
import { messages, type Messages } from './messages';
import { DEFAULT_LOCALE, getLocaleDefinition, isLocale, type Locale } from './locales';

export * from './locales';
export type { Messages };

/** Key under which the visitor's last choice is remembered for `/`. */
export const LOCALE_STORAGE_KEY = 'locale';

/**
 * The active locale, derived from the `[lang]` route parameter — the URL is the
 * single source of truth, so there is no separate locale store to keep in sync.
 *
 * Must be called during component initialisation or inside a reactive context
 * so that `page` stays reactive.
 */
export function currentLocale(): Locale {
	return isLocale(page.params.lang) ? page.params.lang : DEFAULT_LOCALE;
}

/** Translations for the active locale. Use as `const t = $derived(currentMessages());` */
export function currentMessages(): Messages {
	return messages[currentLocale()];
}

/** Definition (flag, date locale, basemap language) for the active locale. */
export function currentLocaleDefinition() {
	return getLocaleDefinition(currentLocale());
}

/**
 * GitHub's editor for a locale's message file. Locale codes are lowercase and
 * match the filenames exactly, so `zh-hant` resolves to `zh-hant.ts`. GitHub
 * forks the repository for the visitor and opens a pull request on save, so a
 * translator needs nothing but an account.
 */
export function messagesEditUrl(locale: Locale): string {
	return `${REPO_URL}/edit/main/src/lib/i18n/messages/${locale}.ts`;
}
