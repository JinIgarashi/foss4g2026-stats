import type { Messages } from './en';

const de: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 – Teilnehmerstatistik',
		description:
			'Interaktive Kartenvisualisierung der Wohnorte und Nationalitäten der Teilnehmenden der Konferenz FOSS4G Hiroshima 2026.'
	},
	header: {
		siteName: 'Teilnehmerstatistik',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'GitHub-Repository',
		language: 'Sprache ändern',
		theme: 'Design ändern'
	},
	theme: {
		light: 'Hell',
		dark: 'Dunkel',
		system: 'System'
	},
	language: {
		contribute: 'Zur Verbesserung der Übersetzungsqualität beitragen',
		title: 'Sprache wählen',
		description:
			'Die Sprachen sind danach sortiert, wie viele Teilnehmende eine Staatsangehörigkeit haben, in der die Sprache Amtssprache ist. Nach Sprache oder Land suchen.',
		search: 'Sprachen suchen',
		searchPlaceholder: 'Sprache oder Land…',
		noResults: 'Keine Sprache entspricht Ihrer Suche',
		resultCount: (n) => `${n} Sprache${n === 1 ? '' : 'n'} verfügbar`,
		attendees: (n) => `${n} Teilnehmende`
	},
	map: {
		loading: 'Wird geladen …',
		venueName: 'Veranstaltungsort FOSS4G 2026',
		venueAddress: 'International Conference Center Hiroshima',
		register: 'Bei FOSS4G Hiroshima 2026 mitmachen'
	},
	layers: {
		title: 'Ebenen',
		close: 'Ebenen-Panel schließen',
		show: 'Ebenensteuerung anzeigen',
		residence: 'Woher die Teilnehmenden kommen',
		nationality: 'Welche Nationalität die Teilnehmenden haben',
		attendees: (n) => `${n} Teilnehmende`,
		places: (n, layer) => `aus ${n} ${layer === 'residence' ? 'Orten' : 'Nationalitäten'}`,
		asOf: (date) => `Stand: ${date}`,
		about: 'Über die Teilnehmerdaten',
		aboutText:
			'Diese Daten beruhen auf den Antworten registrierter Teilnehmender auf optionale Fragen zu Stadt, Land und Nationalität.'
	},
	chart: {
		show: 'Diagramm zur Teilnehmerstatistik anzeigen',
		title: 'Teilnehmerstatistik',
		preparingData: 'Diagrammdaten werden vorbereitet …',
		preparing: 'Diagramm wird vorbereitet …',
		dataType: 'Datentyp:',
		area: 'Bereich:',
		filter: 'Filter:',
		residence: 'Wohnort',
		nationality: 'Nationalität',
		all: 'Alle',
		currentExtent: 'Aktueller Kartenausschnitt',
		excludeJapan: 'Japanische Teilnehmende ausschließen',
		tabChart: 'Diagramm',
		tabTable: 'Tabelle',
		noData: 'In diesem Bereich sind keine Daten verfügbar',
		topN: (n, kind) => `Top ${n} – ${kind}`,
		xAxis: (kind) => `X-Achse: ${kind}`,
		byCountry: (n) => `Nach Land (Top ${n})`,
		byRegion: 'Nach Region',
		share: 'Anteil der Teilnehmenden',
		attendeesLabel: 'Teilnehmende',
		attendeesCount: (n) => `${n} Teilnehmende`,
		selectedAttendees: (n) => `Teilnehmende: ${n}`,
		others: 'Sonstige'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Sortiert nach ${key} (${direction === 'desc' ? 'absteigend' : 'aufsteigend'}): ${rows} Zeilen`,
		sortKeyName: 'Name',
		sortKeyCount: 'Teilnehmerzahl',
		sortKeyCountry: 'Land',
		sortKeyRegion: 'Region',
		headResidence: 'Wohnort',
		headNationality: 'Nationalität',
		headAttendees: 'Teilnehmende',
		headCountry: 'Land',
		headRegion: 'Region',
		total: 'Gesamt'
	},
	region: {
		eastAsiaPacific: 'Ostasien und Pazifik',
		europeCentralAsia: 'Europa und Zentralasien',
		latinAmericaCaribbean: 'Lateinamerika und Karibik',
		middleEastNorthAfrica: 'Naher Osten und Nordafrika',
		northAmerica: 'Nordamerika',
		southAsia: 'Südasien',
		subSaharanAfrica: 'Subsahara-Afrika'
	}
};

export default de;
