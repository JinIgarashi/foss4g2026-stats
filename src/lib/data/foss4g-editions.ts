/**
 * Registration figures for every FOSS4G global conference.
 *
 * Source: "FOSS4G Year-Over-Year Summary of Key Metrics"
 * https://docs.google.com/spreadsheets/d/1ux_hFq-C165140ZD48RRImPTHSpXj42OG3nBr9cyZYo/
 * Last synced: 2026-08-21
 *
 * Hand-maintained on purpose: the site is fully prerendered and never talks to
 * an API, so the numbers live in git and every change shows up in a diff. When
 * the spreadsheet is updated, edit this table and bump the date above.
 *
 * `city` is free text and is never translated, matching how residence names are
 * handled elsewhere. `iso` exists so `localizeCountry()` can translate the
 * country name via `Intl.DisplayNames`.
 */

export type Foss4gEdition = {
	year: number;
	city: string;
	/** ISO 3166-1 alpha-2, passed to `localizeCountry` in `$lib/i18n/display-names`. */
	iso: string;
	/** English country name, used as the fallback when `Intl` cannot translate `iso`. */
	country: string;
	/** Cancelled editions carry no figures at all. */
	cancelled?: boolean;
	/** Total registrations, including online-only ones. */
	total?: number;
	/** Of `total`, how many attended online. `0` for the pre-2021 in-person-only years. */
	online?: number;
	/** Of `total`, how many attended in person. */
	inPerson?: number;
	/** Registrations from the host country. */
	hostCountry?: number;
	/** Registrations from outside the host country. */
	international?: number;
};

/**
 * Chronological, oldest first.
 *
 * Gaps and inconsistencies carried over from the spreadsheet, all handled by
 * the helpers below rather than by silently patching the numbers:
 *
 * - 2012 Beijing has no row at all; it is added here as cancelled, per
 *   https://wiki.osgeo.org/wiki/FOSS4G.
 * - 2013 / 2014 / 2016 have no host/international split.
 * - 2010's split covers only 411 of its 870 registrations, and 2023's covers
 *   683 of 733; the share is taken over the part that is known.
 * - 2023 registered 733 but only 683 attended in person; the 50 difference is
 *   no-shows, not online attendance, so `online` stays 0 and the two bars do
 *   not add up to `total`.
 * - 2021 was fully online and is not comparable to an in-person edition.
 */
export const FOSS4G_EDITIONS: Foss4gEdition[] = [
	{
		year: 2006,
		city: 'Lausanne',
		iso: 'CH',
		country: 'Switzerland',
		total: 566,
		online: 0,
		inPerson: 566,
		hostCountry: 156,
		international: 410
	},
	{
		year: 2007,
		city: 'Victoria',
		iso: 'CA',
		country: 'Canada',
		total: 722,
		online: 0,
		inPerson: 722,
		hostCountry: 253,
		international: 469
	},
	{
		year: 2008,
		city: 'Cape Town',
		iso: 'ZA',
		country: 'South Africa',
		total: 531,
		online: 0,
		inPerson: 531,
		hostCountry: 297,
		international: 234
	},
	{
		year: 2009,
		city: 'Sydney',
		iso: 'AU',
		country: 'Australia',
		total: 436,
		online: 0,
		inPerson: 436,
		hostCountry: 218,
		international: 218
	},
	{
		year: 2010,
		city: 'Barcelona',
		iso: 'ES',
		country: 'Spain',
		total: 870,
		online: 0,
		inPerson: 870,
		hostCountry: 72,
		international: 339
	},
	{
		year: 2011,
		city: 'Denver',
		iso: 'US',
		country: 'United States',
		total: 886,
		online: 0,
		inPerson: 886,
		hostCountry: 621,
		international: 265
	},
	{ year: 2012, city: 'Beijing', iso: 'CN', country: 'China', cancelled: true },
	{
		year: 2013,
		city: 'Nottingham',
		iso: 'GB',
		country: 'United Kingdom',
		total: 797,
		online: 0,
		inPerson: 797
	},
	{
		year: 2014,
		city: 'Portland',
		iso: 'US',
		country: 'United States',
		total: 858,
		online: 0,
		inPerson: 858
	},
	{
		year: 2015,
		city: 'Seoul',
		iso: 'KR',
		country: 'South Korea',
		total: 562,
		online: 0,
		inPerson: 562,
		hostCountry: 253,
		international: 309
	},
	{ year: 2016, city: 'Bonn', iso: 'DE', country: 'Germany', total: 950, online: 0, inPerson: 950 },
	{
		year: 2017,
		city: 'Boston',
		iso: 'US',
		country: 'United States',
		total: 1162,
		online: 0,
		inPerson: 1162,
		hostCountry: 854,
		international: 317
	},
	{
		year: 2018,
		city: 'Dar es Salaam',
		iso: 'TZ',
		country: 'Tanzania',
		total: 1135,
		online: 0,
		inPerson: 1135,
		hostCountry: 607,
		international: 528
	},
	{
		year: 2019,
		city: 'Bucharest',
		iso: 'RO',
		country: 'Romania',
		total: 1069,
		online: 0,
		inPerson: 1069,
		hostCountry: 167,
		international: 902
	},
	{ year: 2020, city: 'Calgary', iso: 'CA', country: 'Canada', cancelled: true },
	{
		year: 2021,
		city: 'Buenos Aires',
		iso: 'AR',
		country: 'Argentina',
		total: 1899,
		online: 1899,
		inPerson: 0,
		hostCountry: 122,
		international: 1752
	},
	{
		year: 2022,
		city: 'Florence',
		iso: 'IT',
		country: 'Italy',
		total: 1303,
		online: 259,
		inPerson: 1044,
		hostCountry: 126,
		international: 1177
	},
	{
		year: 2023,
		city: 'Prizren',
		iso: 'XK',
		country: 'Kosovo',
		total: 733,
		online: 0,
		inPerson: 683,
		hostCountry: 119,
		international: 564
	},
	{
		year: 2024,
		city: 'Belém',
		iso: 'BR',
		country: 'Brazil',
		total: 366,
		online: 0,
		inPerson: 366,
		hostCountry: 179,
		international: 146
	},
	{
		year: 2025,
		city: 'Auckland',
		iso: 'NZ',
		country: 'New Zealand',
		total: 400,
		online: 0,
		inPerson: 400,
		hostCountry: 120,
		international: 280
	}
];

/** The edition this site is about. Its figures come from the live registration data. */
export const CURRENT_EDITION = {
	year: 2026,
	city: 'Hiroshima',
	iso: 'JP',
	country: 'Japan'
} as const;

/**
 * The host/international counts an edition reports, or `null` when the
 * spreadsheet has neither.
 *
 * The two are taken as they are, without reconciling them against `total`:
 * 2017's parts overshoot its total by 9, and 2010 (411 of 870), 2023 (50
 * no-shows) and 2024 fall short of theirs. What they do not account for is
 * carried separately, as `unknown` in `$lib/editionRows`, and drawn as its own
 * slice of the bar rather than folded into either side.
 */
export function editionSplit(
	edition: Pick<Foss4gEdition, 'hostCountry' | 'international'>
): { host: number; international: number } | null {
	const { hostCountry, international } = edition;
	if (hostCountry === undefined || international === undefined) return null;

	const sum = hostCountry + international;
	if (sum <= 0) return null;

	return { host: hostCountry, international };
}
