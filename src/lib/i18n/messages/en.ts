const en = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Attendee Statistics',
		description:
			'Interactive map visualization of FOSS4G Hiroshima 2026 conference attendee locations and nationalities.'
	},
	header: {
		siteName: 'Attendee Statistics',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'GitHub Repository',
		language: 'Change language',
		theme: 'Change theme'
	},
	theme: {
		light: 'Light',
		dark: 'Dark',
		system: 'System'
	},
	language: {
		/** Map control linking to the GitHub editor for this locale's message file. */
		contribute: 'Contribute to improving translation quality',
		title: 'Choose your language',
		/** Shown under the title: explains both the ordering and the count badges. */
		description:
			'Languages are ordered by how many attendees hold a nationality where the language is official. Search by language or country name.',
		search: 'Search languages',
		searchPlaceholder: 'Language or country…',
		noResults: 'No language matches your search',
		resultCount: (n: number) => `${n} languages available`,
		/** Label of the attendee-count badge on each row. */
		attendees: (n: number) => `${n} attendees`
	},
	map: {
		loading: 'Loading...',
		venueName: 'FOSS4G 2026 Venue',
		venueAddress: 'International Conference Center Hiroshima',
		register: 'Join FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Layers',
		close: 'Close layer panel',
		show: 'Show layer control',
		residence: 'Where attendees come from',
		nationality: 'What nationality attendees have',
		/** Shown next to a person icon, e.g. "756 attendees". */
		attendees: (n: number) => `${n} attendees`,
		/** Shown next to a flag icon, e.g. "from 248 locations". */
		places: (n: number, layer: 'residence' | 'nationality') =>
			`from ${n} ${layer === 'residence' ? 'locations' : 'nationalities'}`,
		asOf: (date: string) => `As of ${date}`,
		about: 'About attendee data',
		aboutText:
			"This data is based on registered attendee's answers to optional questions about their City and Country and Nationality."
	},
	chart: {
		show: 'Show attendee statistics chart',
		title: 'Attendee statistics',
		preparing: 'Preparing chart...',
		area: 'Area',
		residence: 'Residence',
		nationality: 'Nationality',
		all: 'All',
		currentExtent: 'Current extent',
		excludeJapan: 'Exclude Japanese attendees',
		tabChart: 'Chart',
		tabTable: 'Table',
		noData: 'No data available in this range',
		/** e.g. "Top 20 Nationality" */
		topN: (n: number, kind: string) => `Top ${n} ${kind}`,
		xAxis: (kind: string) => `X-axis: ${kind}`,
		byCountry: (n: number) => `By country (Top ${n})`,
		byRegion: 'By region',
		share: 'Attendee share',
		attendeesLabel: 'Attendees',
		attendeesCount: (n: string) => `${n} attendees`,
		selectedAttendees: (n: number) => `Attendees: ${n}`,
		others: 'Others',
		/** The `Editions` section: historical FOSS4G registration figures, not map data. */
		editions: {
			tab: 'Editions',
			title: 'Attendance by edition',
			splitDesc: 'Share of registrations',
			inPersonOnly: 'In person',
			includeOnline: 'Include online',
			hostCountry: 'Host country',
			international: 'International',
			cancelled: 'Cancelled',
			shareLabel: 'Share',
			/** Registrations the host/international split does not account for. */
			unknown: 'Not broken down',
			noBreakdown: 'Some editions have no breakdown data.',
			partialSplit: 'Breakdown covers only part of the total',
			source: 'Source: FOSS4G year-over-year metrics',
			table: {
				edition: 'Edition',
				registrations: 'Registered',
				inPerson: 'In person',
				online: 'Online',
				hostShare: 'Host share',
				status: 'Status'
			}
		}
	},
	table: {
		sortedBy: (key: string, direction: 'asc' | 'desc', rows: number) =>
			`Sorted by ${key} (${direction === 'desc' ? 'descending' : 'ascending'}): ${rows} rows`,
		sortKeyName: 'name',
		sortKeyCount: 'attendee count',
		sortKeyCountry: 'country',
		sortKeyRegion: 'region',
		headResidence: 'Residence',
		headNationality: 'Nationality',
		headAttendees: 'Attendees',
		headCountry: 'Country',
		headRegion: 'Region',
		total: 'Total'
	},
	/**
	 * The seven World Bank regions carried in the GeoJSON. Country names come
	 * from `Intl.DisplayNames` and are never hand-translated, but `Intl` has no
	 * World-Bank-region API, so these are. See `$lib/i18n/regions.ts`.
	 */
	region: {
		eastAsiaPacific: 'East Asia & Pacific',
		europeCentralAsia: 'Europe & Central Asia',
		latinAmericaCaribbean: 'Latin America & Caribbean',
		middleEastNorthAfrica: 'Middle East & North Africa',
		northAmerica: 'North America',
		southAsia: 'South Asia',
		subSaharanAfrica: 'Sub-Saharan Africa'
	}
};

export type Messages = typeof en;

export default en;
