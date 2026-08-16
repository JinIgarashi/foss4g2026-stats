import type { Messages } from './en';

const ne: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - सहभागी तथ्याङ्क',
		description:
			'FOSS4G Hiroshima 2026 सम्मेलनका सहभागीहरूको बसोबास र राष्ट्रियताको अन्तरक्रियात्मक नक्सा दृश्यीकरण।'
	},
	header: {
		siteName: 'सहभागी तथ्याङ्क',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'GitHub भण्डार',
		language: 'भाषा परिवर्तन गर्नुहोस्',
		theme: 'थिम परिवर्तन गर्नुहोस्'
	},
	theme: {
		light: 'उज्यालो',
		dark: 'अँध्यारो',
		system: 'प्रणाली'
	},
	language: {
		contribute: 'अनुवादको गुणस्तर सुधार्न योगदान गर्नुहोस्',
		title: 'आफ्नो भाषा छान्नुहोस्',
		description:
			'भाषाहरू त्यस भाषा सरकारी रहेको राष्ट्रियता बोक्ने सहभागीहरूको सङ्ख्या अनुसार क्रमबद्ध छन्। भाषा वा देशको नामबाट खोज्नुहोस्।',
		search: 'भाषा खोज्नुहोस्',
		searchPlaceholder: 'भाषा वा देश…',
		noResults: 'तपाईंको खोजीसँग कुनै भाषा मिलेन',
		resultCount: (n) => `${n} भाषाहरू उपलब्ध`,
		attendees: (n) => `${n} सहभागी`
	},
	map: {
		loading: 'लोड हुँदैछ...',
		venueName: 'FOSS4G 2026 स्थल',
		venueAddress: 'हिरोसिमा अन्तर्राष्ट्रिय सम्मेलन केन्द्र',
		register: 'FOSS4G Hiroshima 2026 मा सहभागी हुनुहोस्'
	},
	layers: {
		title: 'तहहरू',
		close: 'तह प्यानल बन्द गर्नुहोस्',
		show: 'तह नियन्त्रण देखाउनुहोस्',
		residence: 'सहभागीहरू कहाँबाट आउँछन्',
		nationality: 'सहभागीहरूको राष्ट्रियता के हो',
		attendees: (n) => `${n} सहभागी`,
		places: (n, layer) => `${n} ${layer === 'residence' ? 'स्थानबाट' : 'राष्ट्रियताबाट'}`,
		asOf: (date) => `${date} सम्म`,
		about: 'सहभागी तथ्याङ्कबारे',
		aboutText:
			'यो तथ्याङ्क दर्ता भएका सहभागीहरूले आफ्नो सहर र देश तथा राष्ट्रियतासम्बन्धी ऐच्छिक प्रश्नहरूमा दिएका जवाफमा आधारित छ।'
	},
	chart: {
		show: 'सहभागी तथ्याङ्कको चार्ट देखाउनुहोस्',
		title: 'सहभागी तथ्याङ्क',
		preparingData: 'चार्टको तथ्याङ्क तयार गर्दै...',
		preparing: 'चार्ट तयार गर्दै...',
		dataType: 'तथ्याङ्क प्रकार:',
		area: 'क्षेत्र:',
		filter: 'फिल्टर:',
		residence: 'बसोबास',
		nationality: 'राष्ट्रियता',
		all: 'सबै',
		currentExtent: 'हालको दायरा',
		excludeJapan: 'जापानी सहभागीहरू हटाउनुहोस्',
		tabChart: 'चार्ट',
		tabTable: 'तालिका',
		noData: 'यस दायरामा कुनै तथ्याङ्क छैन',
		topN: (n, kind) => `शीर्ष ${n} ${kind}`,
		xAxis: (kind) => `X अक्ष: ${kind}`,
		byCountry: (n) => `देश अनुसार (शीर्ष ${n})`,
		byRegion: 'क्षेत्र अनुसार',
		share: 'सहभागी हिस्सा',
		attendeesLabel: 'सहभागीहरू',
		attendeesCount: (n) => `${n} सहभागी`,
		selectedAttendees: (n) => `सहभागी: ${n}`,
		others: 'अन्य'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`${key} अनुसार क्रमबद्ध (${direction === 'desc' ? 'घट्दो' : 'बढ्दो'}): ${rows} पङ्क्ति`,
		sortKeyName: 'नाम',
		sortKeyCount: 'सहभागी सङ्ख्या',
		sortKeyCountry: 'देश',
		sortKeyRegion: 'क्षेत्र',
		headResidence: 'बसोबास',
		headNationality: 'राष्ट्रियता',
		headAttendees: 'सहभागीहरू',
		headCountry: 'देश',
		headRegion: 'क्षेत्र',
		total: 'जम्मा'
	},
	region: {
		eastAsiaPacific: 'पूर्वी एसिया र प्रशान्त',
		europeCentralAsia: 'युरोप र मध्य एसिया',
		latinAmericaCaribbean: 'ल्याटिन अमेरिका र क्यारिबियन',
		middleEastNorthAfrica: 'मध्यपूर्व र उत्तर अफ्रिका',
		northAmerica: 'उत्तर अमेरिका',
		southAsia: 'दक्षिण एसिया',
		subSaharanAfrica: 'उप-सहारा अफ्रिका'
	}
};

export default ne;
