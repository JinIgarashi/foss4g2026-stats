import type { Messages } from './en';

const fi: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Osallistujatilastot',
		description:
			'Interaktiivinen karttavisualisointi FOSS4G Hiroshima 2026 -konferenssin osallistujien asuinpaikoista ja kansalaisuuksista.'
	},
	header: {
		siteName: 'Osallistujatilastot',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'GitHub-repositorio',
		language: 'Vaihda kieltä',
		theme: 'Vaihda teemaa'
	},
	theme: {
		light: 'Vaalea',
		dark: 'Tumma',
		system: 'Järjestelmä'
	},
	language: {
		contribute: 'Auta parantamaan käännöksen laatua',
		title: 'Valitse kieli',
		description:
			'Kielet on järjestetty sen mukaan, kuinka monella osallistujalla on kansalaisuus, jossa kieli on virallinen. Hae kielen tai maan nimellä.',
		search: 'Hae kieliä',
		searchPlaceholder: 'Kieli tai maa…',
		noResults: 'Yksikään kieli ei vastaa hakuasi',
		resultCount: (n) => `${n} kieltä saatavilla`,
		attendees: (n) => `${n} osallistujaa`
	},
	map: {
		loading: 'Ladataan...',
		venueName: 'FOSS4G 2026 -tapahtumapaikka',
		venueAddress: 'Hiroshiman kansainvälinen konferenssikeskus',
		register: 'Osallistu FOSS4G Hiroshima 2026 -tapahtumaan'
	},
	layers: {
		title: 'Tasot',
		close: 'Sulje tasopaneeli',
		show: 'Näytä tasojen hallinta',
		residence: 'Mistä osallistujat tulevat',
		nationality: 'Mikä kansalaisuus osallistujilla on',
		attendees: (n) => `${n} osallistujaa`,
		places: (n, layer) => `${n} ${layer === 'residence' ? 'paikasta' : 'kansalaisuudesta'}`,
		asOf: (date) => `Tilanne ${date}`,
		about: 'Tietoa osallistujadatasta',
		aboutText:
			'Tiedot perustuvat rekisteröityneiden osallistujien vastauksiin vapaaehtoisiin kysymyksiin heidän kaupungistaan ja maastaan sekä kansalaisuudestaan.'
	},
	chart: {
		show: 'Näytä osallistujatilastojen kaavio',
		title: 'Osallistujatilastot',
		preparingData: 'Valmistellaan kaavion tietoja...',
		preparing: 'Valmistellaan kaaviota...',
		dataType: 'Tietotyyppi:',
		area: 'Alue:',
		filter: 'Suodatin:',
		residence: 'Asuinpaikka',
		nationality: 'Kansalaisuus',
		all: 'Kaikki',
		currentExtent: 'Nykyinen näkymä',
		excludeJapan: 'Jätä japanilaiset osallistujat pois',
		tabChart: 'Kaavio',
		tabTable: 'Taulukko',
		noData: 'Tällä alueella ei ole tietoja',
		topN: (n, kind) => `${kind}: ${n} suurinta`,
		xAxis: (kind) => `X-akseli: ${kind}`,
		byCountry: (n) => `Maittain (${n} suurinta)`,
		byRegion: 'Alueittain',
		share: 'Osallistujien osuus',
		attendeesLabel: 'Osallistujat',
		attendeesCount: (n) => `${n} osallistujaa`,
		selectedAttendees: (n) => `Osallistujia: ${n}`,
		others: 'Muut'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Järjestetty: ${key} (${direction === 'desc' ? 'laskeva' : 'nouseva'}): ${rows} riviä`,
		sortKeyName: 'nimi',
		sortKeyCount: 'osallistujamäärä',
		sortKeyCountry: 'maa',
		sortKeyRegion: 'alue',
		headResidence: 'Asuinpaikka',
		headNationality: 'Kansalaisuus',
		headAttendees: 'Osallistujat',
		headCountry: 'Maa',
		headRegion: 'Alue',
		total: 'Yhteensä'
	},
	region: {
		eastAsiaPacific: 'Itä-Aasia ja Tyynenmeren alue',
		europeCentralAsia: 'Eurooppa ja Keski-Aasia',
		latinAmericaCaribbean: 'Latinalainen Amerikka ja Karibia',
		middleEastNorthAfrica: 'Lähi-itä ja Pohjois-Afrikka',
		northAmerica: 'Pohjois-Amerikka',
		southAsia: 'Etelä-Aasia',
		subSaharanAfrica: 'Saharan eteläpuolinen Afrikka'
	}
};

export default fi;
