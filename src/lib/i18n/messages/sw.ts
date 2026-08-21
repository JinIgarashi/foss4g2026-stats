import type { Messages } from './en';

const sw: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Takwimu za Washiriki',
		description:
			'Taswira ya ramani shirikishi ya maeneo na uraia wa washiriki wa kongamano la FOSS4G Hiroshima 2026.'
	},
	header: {
		siteName: 'Takwimu za Washiriki',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'Hifadhi ya GitHub',
		language: 'Badilisha lugha',
		theme: 'Badilisha mandhari'
	},
	theme: {
		light: 'Nuru',
		dark: 'Giza',
		system: 'Mfumo'
	},
	language: {
		contribute: 'Changia kuboresha ubora wa tafsiri',
		title: 'Chagua lugha yako',
		description:
			'Lugha zimepangwa kulingana na idadi ya washiriki wenye uraia wa nchi ambazo lugha hiyo ni rasmi. Tafuta kwa jina la lugha au nchi.',
		search: 'Tafuta lugha',
		searchPlaceholder: 'Lugha au nchi…',
		noResults: 'Hakuna lugha inayolingana na utafutaji wako',
		resultCount: (n) => `Lugha ${n} zinapatikana`,
		attendees: (n) => `Washiriki ${n}`
	},
	map: {
		loading: 'Inapakia...',
		venueName: 'Ukumbi wa FOSS4G 2026',
		venueAddress: 'Kituo cha Kimataifa cha Mikutano cha Hiroshima',
		register: 'Jiunge na FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Tabaka',
		close: 'Funga kidirisha cha tabaka',
		show: 'Onyesha kidhibiti cha tabaka',
		residence: 'Washiriki wanatoka wapi',
		nationality: 'Uraia wa washiriki',
		attendees: (n) => `Washiriki ${n}`,
		places: (n, layer) => `kutoka ${layer === 'residence' ? 'maeneo' : 'uraia'} ${n}`,
		asOf: (date) => `Hadi ${date}`,
		about: 'Kuhusu data ya washiriki',
		aboutText:
			'Data hii inatokana na majibu ya washiriki waliojiandikisha kwa maswali ya hiari kuhusu Jiji na Nchi yao pamoja na Uraia wao.'
	},
	chart: {
		show: 'Onyesha chati ya takwimu za washiriki',
		title: 'Takwimu za washiriki',
		preparing: 'Inaandaa chati...',
		area: 'Eneo',
		residence: 'Makazi',
		nationality: 'Uraia',
		all: 'Zote',
		currentExtent: 'Eneo la sasa',
		excludeJapan: 'Ondoa washiriki wa Kijapani',
		tabChart: 'Chati',
		tabTable: 'Jedwali',
		noData: 'Hakuna data inayopatikana katika eneo hili',
		topN: (n, kind) => `${kind} ${n} bora`,
		xAxis: (kind) => `Mhimili wa X: ${kind}`,
		byCountry: (n) => `Kwa nchi (${n} bora)`,
		byRegion: 'Kwa kanda',
		share: 'Sehemu ya washiriki',
		attendeesLabel: 'Washiriki',
		attendeesCount: (n) => `Washiriki ${n}`,
		selectedAttendees: (n) => `Washiriki: ${n}`,
		others: 'Nyingine',
		editions: {
			tab: 'Mikutano iliyopita',
			title: 'Washiriki kwa kila mkutano',
			splitDesc: 'Sehemu ya usajili',
			inPersonOnly: 'Ana kwa ana',
			includeOnline: 'Jumuisha mtandaoni',
			hostCountry: 'Nchi mwenyeji',
			international: 'Kimataifa',
			cancelled: 'Umeghairiwa',
			shareLabel: 'Sehemu',
			unknown: 'Haijachanganuliwa',
			noBreakdown: 'Baadhi ya mikutano haina data ya kina.',
			partialSplit: 'Mchanganuo unahusu sehemu tu ya jumla',
			source: 'Chanzo: takwimu za mwaka za FOSS4G',
			table: {
				edition: 'Mkutano',
				registrations: 'Waliojiandikisha',
				inPerson: 'Ana kwa ana',
				online: 'Mtandaoni',
				hostShare: 'Sehemu ya nchi mwenyeji',
				status: 'Hali'
			}
		}
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Imepangwa kwa ${key} (${direction === 'desc' ? 'kushuka' : 'kupanda'}): safu ${rows}`,
		sortKeyName: 'jina',
		sortKeyCount: 'idadi ya washiriki',
		sortKeyCountry: 'nchi',
		sortKeyRegion: 'kanda',
		headResidence: 'Makazi',
		headNationality: 'Uraia',
		headAttendees: 'Washiriki',
		headCountry: 'Nchi',
		headRegion: 'Kanda',
		total: 'Jumla'
	},
	region: {
		eastAsiaPacific: 'Asia ya Mashariki na Pasifiki',
		europeCentralAsia: 'Ulaya na Asia ya Kati',
		latinAmericaCaribbean: 'Amerika ya Kusini na Karibiani',
		middleEastNorthAfrica: 'Mashariki ya Kati na Afrika Kaskazini',
		northAmerica: 'Amerika Kaskazini',
		southAsia: 'Asia ya Kusini',
		subSaharanAfrica: 'Afrika Kusini mwa Jangwa la Sahara'
	}
};

export default sw;
