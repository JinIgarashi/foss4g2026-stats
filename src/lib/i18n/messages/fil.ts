import type { Messages } from './en';

const fil: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Estadistika ng mga Dumalo',
		description:
			'Interaktibong mapa ng mga tinitirhan at nasyonalidad ng mga dadalo sa kumperensyang FOSS4G Hiroshima 2026.'
	},
	header: {
		siteName: 'Estadistika ng mga Dumalo',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'GitHub na Repositoryo',
		language: 'Palitan ang wika',
		theme: 'Palitan ang tema'
	},
	theme: {
		light: 'Maliwanag',
		dark: 'Madilim',
		system: 'Sistema'
	},
	map: {
		loading: 'Naglo-load…',
		venueName: 'Lugar ng FOSS4G 2026',
		venueAddress: 'International Conference Center Hiroshima',
		register: 'Sumali sa FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Mga Layer',
		close: 'Isara ang panel ng mga layer',
		show: 'Ipakita ang kontrol ng mga layer',
		residence: 'Saan nanggaling ang mga dumalo',
		nationality: 'Anong nasyonalidad ng mga dumalo',
		attendees: (n) => `${n} dumalo`,
		places: (n, layer) => `mula sa ${n} ${layer === 'residence' ? 'lugar' : 'nasyonalidad'}`,
		asOf: (date) => `Sa ${date}`,
		about: 'Tungkol sa datos ng mga dumalo',
		aboutText:
			'Ang datos na ito ay batay sa mga sagot ng nakarehistrong dumalo sa mga opsyonal na tanong tungkol sa kanilang Lungsod at Bansa at Nasyonalidad.'
	},
	chart: {
		show: 'Ipakita ang tsart ng estadistika',
		title: 'Estadistika ng mga dumalo',
		preparingData: 'Inihahanda ang datos ng tsart…',
		preparing: 'Inihahanda ang tsart…',
		dataType: 'Uri ng datos:',
		area: 'Lawak:',
		filter: 'Salain:',
		residence: 'Tinitirhan',
		nationality: 'Nasyonalidad',
		all: 'Lahat',
		currentExtent: 'Kasalukuyang lawak',
		excludeJapan: 'Huwag isama ang mga Hapon',
		tabChart: 'Tsart',
		tabTable: 'Talahanayan',
		noData: 'Walang datos sa saklaw na ito',
		topN: (n, kind) => `Nangungunang ${n} ${kind}`,
		xAxis: (kind) => `X-axis: ${kind}`,
		byCountry: (n) => `Ayon sa bansa (Nangungunang ${n})`,
		byRegion: 'Ayon sa rehiyon',
		share: 'Bahagi ng mga dumalo',
		attendeesLabel: 'Mga dumalo',
		attendeesCount: (n) => `${n} dumalo`,
		selectedAttendees: (n) => `Mga dumalo: ${n}`,
		others: 'Iba pa'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Inayos ayon sa ${key} (${direction === 'desc' ? 'pababa' : 'pataas'}): ${rows} hanay`,
		sortKeyName: 'pangalan',
		sortKeyCount: 'bilang ng dumalo',
		sortKeyCountry: 'bansa',
		sortKeyRegion: 'rehiyon',
		headResidence: 'Tinitirhan',
		headNationality: 'Nasyonalidad',
		headAttendees: 'Mga dumalo',
		headCountry: 'Bansa',
		headRegion: 'Rehiyon',
		total: 'Kabuuan'
	}
};

export default fil;
