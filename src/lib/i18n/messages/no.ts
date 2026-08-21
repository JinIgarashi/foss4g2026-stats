import type { Messages } from './en';

const no: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 – Deltakerstatistikk',
		description:
			'Interaktiv kartvisning av bosted og nasjonalitet for deltakerne på konferansen FOSS4G Hiroshima 2026.'
	},
	header: {
		siteName: 'Deltakerstatistikk',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'GitHub-repositorium',
		language: 'Bytt språk',
		theme: 'Bytt tema'
	},
	theme: {
		light: 'Lys',
		dark: 'Mørk',
		system: 'System'
	},
	language: {
		contribute: 'Bidra til å forbedre oversettelseskvaliteten',
		title: 'Velg språk',
		description:
			'Språkene er sortert etter hvor mange deltakere som har en nasjonalitet der språket er offisielt. Søk på språk eller land.',
		search: 'Søk etter språk',
		searchPlaceholder: 'Språk eller land…',
		noResults: 'Ingen språk samsvarer med søket',
		resultCount: (n) => `${n} språk tilgjengelig`,
		attendees: (n) => `${n} deltakere`
	},
	map: {
		loading: 'Laster …',
		venueName: 'Konferansested FOSS4G 2026',
		venueAddress: 'International Conference Center Hiroshima',
		register: 'Bli med på FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Lag',
		close: 'Lukk lagpanelet',
		show: 'Vis lagkontroll',
		residence: 'Hvor deltakerne kommer fra',
		nationality: 'Hvilken nasjonalitet deltakerne har',
		attendees: (n) => `${n} deltakere`,
		places: (n, layer) => `fra ${n} ${layer === 'residence' ? 'steder' : 'nasjonaliteter'}`,
		asOf: (date) => `Per ${date}`,
		about: 'Om deltakerdataene',
		aboutText:
			'Disse dataene er basert på registrerte deltakeres svar på valgfrie spørsmål om by og land samt nasjonalitet.'
	},
	chart: {
		show: 'Vis diagram over deltakerstatistikk',
		title: 'Deltakerstatistikk',
		preparing: 'Forbereder diagram …',
		area: 'Område',
		residence: 'Bosted',
		nationality: 'Nasjonalitet',
		all: 'Alle',
		currentExtent: 'Gjeldende kartutsnitt',
		excludeJapan: 'Utelat japanske deltakere',
		tabChart: 'Diagram',
		tabTable: 'Tabell',
		noData: 'Ingen data tilgjengelig i dette området',
		topN: (n, kind) => `Topp ${n} – ${kind}`,
		xAxis: (kind) => `X-akse: ${kind}`,
		byCountry: (n) => `Etter land (topp ${n})`,
		byRegion: 'Etter region',
		share: 'Andel deltakere',
		attendeesLabel: 'Deltakere',
		attendeesCount: (n) => `${n} deltakere`,
		selectedAttendees: (n) => `Deltakere: ${n}`,
		others: 'Andre',
		editions: {
			tab: 'Utgaver',
			title: 'Deltakelse per utgave',
			splitDesc: 'Andel av påmeldingene',
			inPersonOnly: 'Fysisk',
			includeOnline: 'Ta med nett',
			hostCountry: 'Vertsland',
			international: 'Internasjonalt',
			cancelled: 'Avlyst',
			shareLabel: 'Andel',
			unknown: 'Ikke fordelt',
			noBreakdown: 'Noen utgaver mangler detaljerte data.',
			partialSplit: 'Fordelingen dekker bare en del av totalen',
			source: 'Kilde: FOSS4G-årstall',
			table: {
				edition: 'Utgave',
				registrations: 'Påmeldte',
				inPerson: 'Fysisk',
				online: 'Nett',
				hostShare: 'Vertslandets andel',
				status: 'Status'
			}
		}
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Sortert etter ${key} (${direction === 'desc' ? 'synkende' : 'stigende'}): ${rows} rader`,
		sortKeyName: 'navn',
		sortKeyCount: 'antall deltakere',
		sortKeyCountry: 'land',
		sortKeyRegion: 'region',
		headResidence: 'Bosted',
		headNationality: 'Nasjonalitet',
		headAttendees: 'Deltakere',
		headCountry: 'Land',
		headRegion: 'Region',
		total: 'Totalt'
	},
	region: {
		eastAsiaPacific: 'Øst-Asia og Stillehavet',
		europeCentralAsia: 'Europa og Sentral-Asia',
		latinAmericaCaribbean: 'Latin-Amerika og Karibia',
		middleEastNorthAfrica: 'Midtøsten og Nord-Afrika',
		northAmerica: 'Nord-Amerika',
		southAsia: 'Sør-Asia',
		subSaharanAfrica: 'Afrika sør for Sahara'
	}
};

export default no;
