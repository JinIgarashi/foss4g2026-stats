/**
 * One row per FOSS4G edition, shared by the chart (`EditionsView`) and the
 * table (`EditionsTable`) so both always show the same set of editions and the
 * same numbers — including the live 2026 figures, which are derived from the
 * registration GeoJSON rather than from the hand-maintained table.
 */

import { CURRENT_EDITION, FOSS4G_EDITIONS, editionSplit } from '$lib/data/foss4g-editions';
import type { GeoJSONFeature, LocationProperties } from '$lib/chartUtils';
import { localizeCountry } from '$lib/i18n/display-names';
import type { Locale } from '$lib/i18n/locales';

/** The bucket for attendees who did not state a nationality. */
const NO_ANSWER = 'No answer';

export type EditionRow = {
	year: number;
	/** Free text, never translated — same policy as residence names. */
	city: string;
	/** `2026 Hiroshima` — the year alone is too thin to identify an edition. */
	tickLabel: string;
	country: string;
	cancelled: boolean;
	current: boolean;
	/** Stacked as a share; both are 0 for the editions with no breakdown. */
	host: number;
	international: number;
	hasSplit: boolean;
	/** `host` over everything the bar stacks — host, international and unknown —
	 *  so the table's percentage is the one the chart draws. `null` without a
	 *  breakdown. */
	hostShare: number | null;
	/** Registrations the breakdown does not account for, kept out of `host` and
	 *  `international` rather than folded into either: attendees who left the
	 *  question blank in 2026, and the shortfall the spreadsheet leaves in
	 *  2010 / 2023 / 2024. */
	unknown: number;
	/** Drives the line, and exists for editions the split cannot cover. */
	total: number;
	/** Registrations as recorded, whatever the in-person/online toggle says. */
	registrations: number;
	inPerson: number;
	online: number;
};

/**
 * This year's figures come from the live registration data rather than from a
 * hard-coded row: the GeoJSON is regenerated as registration goes on. Japan is
 * the host country, matching `hostCountry` in past editions.
 *
 * Nationality — not residence — is what the count is taken from: it is the
 * complete registrant count (it covers the people who left the residence
 * question blank), and it is the same number the layer panel reports for the
 * nationality layer, so the two never disagree.
 */
function currentTotals(
	nationalityData?: GeoJSON.FeatureCollection<GeoJSON.Point, LocationProperties>
) {
	const features = (nationalityData?.features ?? []) as GeoJSONFeature[];
	let total = 0;
	let host = 0;
	let unknown = 0;
	for (const { properties } of features) {
		const count = properties.count || 0;
		total += count;
		// `No answer` is matched on the raw name, the way `TableView` does it, so
		// the bucket is the same in every language. It sits at Null Island, which
		// the spatial join tags France — counting it as international would put 77
		// people in a country none of them named.
		if (properties.name === NO_ANSWER) unknown += count;
		else if (properties.country === CURRENT_EDITION.country) host += count;
	}
	return { total, host, international: total - host - unknown, unknown };
}

/**
 * @param includeOnline Whether fully-online editions and the online half of
 *   hybrid ones are counted. A fully online edition still gets a row when they
 *   are not, but an empty one — see below.
 */
export function buildEditionRows(
	nationalityData: GeoJSON.FeatureCollection<GeoJSON.Point, LocationProperties> | undefined,
	includeOnline: boolean,
	locale: Locale
): EditionRow[] {
	const rows: EditionRow[] = [];

	for (const edition of FOSS4G_EDITIONS) {
		const online = edition.online ?? 0;
		const inPerson = edition.inPerson ?? 0;
		// A fully online edition is a different population, so under `In person` it
		// contributes no figures — but it keeps its slot on the axis, the way a
		// cancelled edition does, rather than disappearing from the history.
		const onlineOnly = !includeOnline && online > 0 && inPerson === 0;

		const split = onlineOnly ? null : editionSplit(edition);
		const splitSum = split ? split.host + split.international : 0;
		rows.push({
			year: edition.year,
			city: edition.city,
			tickLabel: `${edition.year} ${edition.city}`,
			country: localizeCountry(edition.iso, edition.country, locale),
			cancelled: edition.cancelled === true,
			current: false,
			host: split?.host ?? 0,
			international: split?.international ?? 0,
			hasSplit: split !== null,
			hostShare: split ? split.host / Math.max(edition.total ?? 0, splitSum) : null,
			// What the two parts leave unaccounted for: 459 of 2010's registrations,
			// 2023's 50 no-shows, 2024's 41. Never negative — 2017's parts overshoot
			// its total by 9.
			unknown: split ? Math.max((edition.total ?? 0) - splitSum, 0) : 0,
			total: onlineOnly ? 0 : includeOnline ? inPerson + online : inPerson,
			registrations: edition.total ?? 0,
			inPerson,
			online
		});
	}

	const current = currentTotals(nationalityData);
	rows.push({
		year: CURRENT_EDITION.year,
		city: CURRENT_EDITION.city,
		tickLabel: `${CURRENT_EDITION.year} ${CURRENT_EDITION.city}`,
		country: localizeCountry(CURRENT_EDITION.iso, CURRENT_EDITION.country, locale),
		cancelled: false,
		current: true,
		host: current.host,
		international: current.international,
		hasSplit: current.host + current.international > 0,
		hostShare: current.total > 0 ? current.host / current.total : null,
		unknown: current.unknown,
		total: current.total,
		registrations: current.total,
		inPerson: current.total,
		online: 0
	});

	return rows;
}
