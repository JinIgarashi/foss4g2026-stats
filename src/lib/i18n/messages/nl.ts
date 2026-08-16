import type { Messages } from './en';

const nl: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Deelnemersstatistieken',
		description:
			'Interactieve kaartvisualisatie van de woonplaatsen en nationaliteiten van de deelnemers aan FOSS4G Hiroshima 2026.'
	},
	header: {
		siteName: 'Deelnemersstatistieken',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'GitHub-repository',
		language: 'Taal wijzigen',
		theme: 'Thema wijzigen'
	},
	theme: {
		light: 'Licht',
		dark: 'Donker',
		system: 'Systeem'
	},
	language: {
		contribute: 'Draag bij aan een betere vertaalkwaliteit',
		title: 'Kies je taal',
		description:
			'De talen zijn gesorteerd op het aantal deelnemers met een nationaliteit waarin de taal een officiële taal is. Zoek op taal- of landnaam.',
		search: 'Talen zoeken',
		searchPlaceholder: 'Taal of land…',
		noResults: 'Geen taal komt overeen met je zoekopdracht',
		resultCount: (n) => `${n} ${n === 1 ? 'taal' : 'talen'} beschikbaar`,
		attendees: (n) => `${n} deelnemer${n === 1 ? '' : 's'}`
	},
	map: {
		loading: 'Laden...',
		venueName: 'Locatie FOSS4G 2026',
		venueAddress: 'Internationaal Congrescentrum Hiroshima',
		register: 'Doe mee aan FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Lagen',
		close: 'Lagenpaneel sluiten',
		show: 'Lagenbeheer tonen',
		residence: 'Waar deelnemers vandaan komen',
		nationality: 'Welke nationaliteit deelnemers hebben',
		attendees: (n) => `${n} deelnemer${n === 1 ? '' : 's'}`,
		places: (n, layer) => `uit ${n} ${layer === 'residence' ? 'locaties' : 'nationaliteiten'}`,
		asOf: (date) => `Per ${date}`,
		about: 'Over de deelnemersgegevens',
		aboutText:
			'Deze gegevens zijn gebaseerd op de antwoorden van geregistreerde deelnemers op optionele vragen over hun stad en land en hun nationaliteit.'
	},
	chart: {
		show: 'Grafiek met deelnemersstatistieken tonen',
		title: 'Deelnemersstatistieken',
		preparingData: 'Grafiekgegevens voorbereiden...',
		preparing: 'Grafiek voorbereiden...',
		dataType: 'Gegevenstype:',
		area: 'Gebied:',
		filter: 'Filter:',
		residence: 'Woonplaats',
		nationality: 'Nationaliteit',
		all: 'Alles',
		currentExtent: 'Huidige weergave',
		excludeJapan: 'Japanse deelnemers uitsluiten',
		tabChart: 'Grafiek',
		tabTable: 'Tabel',
		noData: 'Geen gegevens beschikbaar in dit bereik',
		topN: (n, kind) => `Top ${n} ${kind}`,
		xAxis: (kind) => `X-as: ${kind}`,
		byCountry: (n) => `Per land (top ${n})`,
		byRegion: 'Per regio',
		share: 'Aandeel deelnemers',
		attendeesLabel: 'Deelnemers',
		attendeesCount: (n) => `${n} deelnemers`,
		selectedAttendees: (n) => `Deelnemers: ${n}`,
		others: 'Overige'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Gesorteerd op ${key} (${direction === 'desc' ? 'aflopend' : 'oplopend'}): ${rows} rijen`,
		sortKeyName: 'naam',
		sortKeyCount: 'aantal deelnemers',
		sortKeyCountry: 'land',
		sortKeyRegion: 'regio',
		headResidence: 'Woonplaats',
		headNationality: 'Nationaliteit',
		headAttendees: 'Deelnemers',
		headCountry: 'Land',
		headRegion: 'Regio',
		total: 'Totaal'
	},
	region: {
		eastAsiaPacific: 'Oost-Azië en de Stille Oceaan',
		europeCentralAsia: 'Europa en Centraal-Azië',
		latinAmericaCaribbean: 'Latijns-Amerika en de Caraïben',
		middleEastNorthAfrica: 'Midden-Oosten en Noord-Afrika',
		northAmerica: 'Noord-Amerika',
		southAsia: 'Zuid-Azië',
		subSaharanAfrica: 'Afrika ten zuiden van de Sahara'
	}
};

export default nl;
