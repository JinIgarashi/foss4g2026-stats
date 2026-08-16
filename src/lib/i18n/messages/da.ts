import type { Messages } from './en';

const da: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Deltagerstatistik',
		description:
			'Interaktiv kortvisualisering af hvor deltagerne på konferencen FOSS4G Hiroshima 2026 bor, og hvilke nationaliteter de har.'
	},
	header: {
		siteName: 'Deltagerstatistik',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'GitHub-lager',
		language: 'Skift sprog',
		theme: 'Skift tema'
	},
	theme: {
		light: 'Lyst',
		dark: 'Mørkt',
		system: 'System'
	},
	language: {
		contribute: 'Bidrag til at forbedre oversættelseskvaliteten',
		title: 'Vælg dit sprog',
		description:
			'Sprogene er sorteret efter, hvor mange deltagere der har en nationalitet, hvor sproget er officielt. Søg på sprog eller land.',
		search: 'Søg efter sprog',
		searchPlaceholder: 'Sprog eller land…',
		noResults: 'Ingen sprog matcher din søgning',
		resultCount: (n) => `${n} sprog tilgængelige`,
		attendees: (n) => `${n} deltagere`
	},
	map: {
		loading: 'Indlæser...',
		venueName: 'FOSS4G 2026-sted',
		venueAddress: 'Hiroshima Internationale Konferencecenter',
		register: 'Deltag i FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Lag',
		close: 'Luk lagpanelet',
		show: 'Vis lagstyring',
		residence: 'Hvor deltagerne kommer fra',
		nationality: 'Hvilken nationalitet deltagerne har',
		attendees: (n) => `${n} deltagere`,
		places: (n, layer) => `fra ${n} ${layer === 'residence' ? 'steder' : 'nationaliteter'}`,
		asOf: (date) => `Pr. ${date}`,
		about: 'Om deltagerdata',
		aboutText:
			'Disse data bygger på registrerede deltageres svar på frivillige spørgsmål om deres by og land samt deres nationalitet.'
	},
	chart: {
		show: 'Vis diagram over deltagerstatistik',
		title: 'Deltagerstatistik',
		preparingData: 'Forbereder diagramdata...',
		preparing: 'Forbereder diagram...',
		dataType: 'Datatype:',
		area: 'Område:',
		filter: 'Filter:',
		residence: 'Bopæl',
		nationality: 'Nationalitet',
		all: 'Alle',
		currentExtent: 'Nuværende visning',
		excludeJapan: 'Udelad japanske deltagere',
		tabChart: 'Diagram',
		tabTable: 'Tabel',
		noData: 'Ingen data i dette interval',
		topN: (n, kind) => `Top ${n} ${kind}`,
		xAxis: (kind) => `X-akse: ${kind}`,
		byCountry: (n) => `Efter land (top ${n})`,
		byRegion: 'Efter region',
		share: 'Andel af deltagere',
		attendeesLabel: 'Deltagere',
		attendeesCount: (n) => `${n} deltagere`,
		selectedAttendees: (n) => `Deltagere: ${n}`,
		others: 'Øvrige'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Sorteret efter ${key} (${direction === 'desc' ? 'faldende' : 'stigende'}): ${rows} rækker`,
		sortKeyName: 'navn',
		sortKeyCount: 'antal deltagere',
		sortKeyCountry: 'land',
		sortKeyRegion: 'region',
		headResidence: 'Bopæl',
		headNationality: 'Nationalitet',
		headAttendees: 'Deltagere',
		headCountry: 'Land',
		headRegion: 'Region',
		total: 'I alt'
	}
};

export default da;
