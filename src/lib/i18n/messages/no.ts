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
		preparingData: 'Forbereder diagramdata …',
		preparing: 'Forbereder diagram …',
		dataType: 'Datatype:',
		area: 'Område:',
		filter: 'Filter:',
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
		others: 'Andre'
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
	}
};

export default no;
