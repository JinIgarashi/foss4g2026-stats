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
	language: {
		contribute: 'Tumulong sa pagpapabuti ng kalidad ng pagsasalin',
		title: 'Piliin ang iyong wika',
		description:
			'Nakaayos ang mga wika ayon sa dami ng dumalo na may nasyonalidad kung saan opisyal ang wikang iyon. Maghanap ayon sa wika o bansa.',
		search: 'Maghanap ng wika',
		searchPlaceholder: 'Wika o bansa…',
		noResults: 'Walang wikang tumutugma sa iyong paghahanap',
		resultCount: (n) => `${n} wika ang available`,
		attendees: (n) => `${n} dumalo`
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
		preparing: 'Inihahanda ang tsart…',
		area: 'Lawak',
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
		others: 'Iba pa',
		editions: {
			tab: 'Mga Edisyon',
			title: 'Dumalo kada edisyon',
			splitDesc: 'Bahagi ng rehistrasyon',
			inPersonOnly: 'Harapan',
			includeOnline: 'Isama ang online',
			hostCountry: 'Bansang host',
			international: 'Internasyonal',
			cancelled: 'Kanselado',
			shareLabel: 'Bahagi',
			unknown: 'Walang breakdown',
			noBreakdown: 'May mga edisyong walang detalyadong datos.',
			partialSplit: 'Bahagi lang ng kabuuan ang saklaw ng breakdown',
			source: 'Pinagmulan: taunang datos ng FOSS4G',
			table: {
				edition: 'Edisyon',
				registrations: 'Nakarehistro',
				inPerson: 'Harapan',
				online: 'Online',
				hostShare: 'Bahagi ng host',
				status: 'Katayuan'
			}
		}
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
	},
	region: {
		eastAsiaPacific: 'Silangang Asya at Pasipiko',
		europeCentralAsia: 'Europa at Gitnang Asya',
		latinAmericaCaribbean: 'Latin America at Caribbean',
		middleEastNorthAfrica: 'Gitnang Silangan at Hilagang Aprika',
		northAmerica: 'Hilagang Amerika',
		southAsia: 'Timog Asya',
		subSaharanAfrica: 'Aprikang Sub-Sahara'
	}
};

export default fil;
