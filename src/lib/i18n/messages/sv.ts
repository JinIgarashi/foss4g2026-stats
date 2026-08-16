import type { Messages } from './en';

const sv: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Deltagarstatistik',
		description:
			'Interaktiv kartvisualisering av var deltagarna på konferensen FOSS4G Hiroshima 2026 bor och vilka nationaliteter de har.'
	},
	header: {
		siteName: 'Deltagarstatistik',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'GitHub-förvar',
		language: 'Byt språk',
		theme: 'Byt tema'
	},
	theme: {
		light: 'Ljust',
		dark: 'Mörkt',
		system: 'System'
	},
	language: {
		contribute: 'Bidra till att förbättra översättningskvaliteten',
		title: 'Välj språk',
		description:
			'Språken är sorterade efter hur många deltagare som har en nationalitet där språket är officiellt. Sök på språk eller land.',
		search: 'Sök språk',
		searchPlaceholder: 'Språk eller land…',
		noResults: 'Inget språk matchar din sökning',
		resultCount: (n) => `${n} språk tillgängliga`,
		attendees: (n) => `${n} deltagare`
	},
	map: {
		loading: 'Läser in...',
		venueName: 'FOSS4G 2026-lokal',
		venueAddress: 'Hiroshimas internationella konferenscenter',
		register: 'Delta i FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Lager',
		close: 'Stäng lagerpanelen',
		show: 'Visa lagerkontroll',
		residence: 'Var deltagarna kommer ifrån',
		nationality: 'Vilken nationalitet deltagarna har',
		attendees: (n) => `${n} deltagare`,
		places: (n, layer) => `från ${n} ${layer === 'residence' ? 'platser' : 'nationaliteter'}`,
		asOf: (date) => `Per ${date}`,
		about: 'Om deltagardata',
		aboutText:
			'Uppgifterna bygger på registrerade deltagares svar på frivilliga frågor om deras stad och land samt nationalitet.'
	},
	chart: {
		show: 'Visa diagram över deltagarstatistik',
		title: 'Deltagarstatistik',
		preparingData: 'Förbereder diagramdata...',
		preparing: 'Förbereder diagram...',
		dataType: 'Datatyp:',
		area: 'Område:',
		filter: 'Filter:',
		residence: 'Bostadsort',
		nationality: 'Nationalitet',
		all: 'Alla',
		currentExtent: 'Nuvarande vy',
		excludeJapan: 'Uteslut japanska deltagare',
		tabChart: 'Diagram',
		tabTable: 'Tabell',
		noData: 'Inga data i detta intervall',
		topN: (n, kind) => `Topp ${n} ${kind}`,
		xAxis: (kind) => `X-axel: ${kind}`,
		byCountry: (n) => `Per land (topp ${n})`,
		byRegion: 'Per region',
		share: 'Andel deltagare',
		attendeesLabel: 'Deltagare',
		attendeesCount: (n) => `${n} deltagare`,
		selectedAttendees: (n) => `Deltagare: ${n}`,
		others: 'Övriga'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Sorterat efter ${key} (${direction === 'desc' ? 'fallande' : 'stigande'}): ${rows} rader`,
		sortKeyName: 'namn',
		sortKeyCount: 'antal deltagare',
		sortKeyCountry: 'land',
		sortKeyRegion: 'region',
		headResidence: 'Bostadsort',
		headNationality: 'Nationalitet',
		headAttendees: 'Deltagare',
		headCountry: 'Land',
		headRegion: 'Region',
		total: 'Totalt'
	}
};

export default sv;
