import type { Handle } from '@sveltejs/kit';
import { DEFAULT_LOCALE, isLocale } from '$lib/i18n/locales';

/**
 * Bakes the active language into `<html lang>`. This runs while prerendering,
 * so each generated page ships the correct attribute without any client JS.
 */
export const handle: Handle = ({ event, resolve }) => {
	const lang = isLocale(event.params.lang) ? event.params.lang : DEFAULT_LOCALE;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%page.lang%', lang)
	});
};
