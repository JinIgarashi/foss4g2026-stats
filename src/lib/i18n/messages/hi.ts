import type { Messages } from './en';

const hi: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - प्रतिभागी सांख्यिकी',
		description:
			'FOSS4G Hiroshima 2026 सम्मेलन के प्रतिभागियों के निवास स्थान और राष्ट्रीयता का इंटरैक्टिव मानचित्र।'
	},
	header: {
		siteName: 'प्रतिभागी सांख्यिकी',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'GitHub रिपॉज़िटरी',
		language: 'भाषा बदलें',
		theme: 'थीम बदलें'
	},
	theme: {
		light: 'लाइट',
		dark: 'डार्क',
		system: 'सिस्टम'
	},
	language: {
		contribute: 'अनुवाद की गुणवत्ता सुधारने में योगदान दें',
		title: 'अपनी भाषा चुनें',
		description:
			'भाषाएँ उन प्रतिभागियों की संख्या के अनुसार क्रमबद्ध हैं जिनकी राष्ट्रीयता में वह भाषा राजभाषा है। भाषा या देश के नाम से खोजें।',
		search: 'भाषाएँ खोजें',
		searchPlaceholder: 'भाषा या देश…',
		noResults: 'आपकी खोज से कोई भाषा मेल नहीं खाती',
		resultCount: (n) => `${n} भाषाएँ उपलब्ध`,
		attendees: (n) => `${n} प्रतिभागी`
	},
	map: {
		loading: 'लोड हो रहा है...',
		venueName: 'FOSS4G 2026 स्थल',
		venueAddress: 'अंतर्राष्ट्रीय सम्मेलन केंद्र हिरोशिमा',
		register: 'FOSS4G Hiroshima 2026 में शामिल हों'
	},
	layers: {
		title: 'लेयर',
		close: 'लेयर पैनल बंद करें',
		show: 'लेयर नियंत्रण दिखाएँ',
		residence: 'प्रतिभागी कहाँ से आते हैं',
		nationality: 'प्रतिभागियों की राष्ट्रीयता',
		attendees: (n) => `${n} प्रतिभागी`,
		places: (n, layer) => `${n} ${layer === 'residence' ? 'स्थानों' : 'राष्ट्रीयताओं'} से`,
		asOf: (date) => `${date} तक`,
		about: 'प्रतिभागी डेटा के बारे में',
		aboutText:
			'यह डेटा पंजीकृत प्रतिभागियों द्वारा उनके शहर व देश और राष्ट्रीयता संबंधी वैकल्पिक प्रश्नों के उत्तरों पर आधारित है।'
	},
	chart: {
		show: 'प्रतिभागी सांख्यिकी चार्ट दिखाएँ',
		title: 'प्रतिभागी सांख्यिकी',
		preparing: 'चार्ट तैयार किया जा रहा है...',
		area: 'क्षेत्र',
		residence: 'निवास',
		nationality: 'राष्ट्रीयता',
		all: 'सभी',
		currentExtent: 'वर्तमान दृश्य क्षेत्र',
		excludeJapan: 'जापानी प्रतिभागियों को छोड़ें',
		tabChart: 'चार्ट',
		tabTable: 'तालिका',
		noData: 'इस दायरे में कोई डेटा उपलब्ध नहीं है',
		topN: (n, kind) => `शीर्ष ${n} ${kind}`,
		xAxis: (kind) => `X-अक्ष: ${kind}`,
		byCountry: (n) => `देश के अनुसार (शीर्ष ${n})`,
		byRegion: 'क्षेत्र के अनुसार',
		share: 'प्रतिभागी हिस्सेदारी',
		attendeesLabel: 'प्रतिभागी',
		attendeesCount: (n) => `${n} प्रतिभागी`,
		selectedAttendees: (n) => `प्रतिभागी: ${n}`,
		others: 'अन्य',
		editions: {
			tab: 'सम्मेलन',
			title: 'प्रति सम्मेलन उपस्थिति',
			splitDesc: 'पंजीकरण का अनुपात',
			inPersonOnly: 'प्रत्यक्ष',
			includeOnline: 'ऑनलाइन शामिल करें',
			hostCountry: 'मेज़बान देश',
			international: 'अंतरराष्ट्रीय',
			cancelled: 'रद्द',
			shareLabel: 'हिस्सा',
			unknown: 'विवरण नहीं',
			noBreakdown: 'कुछ सम्मेलनों का विस्तृत डेटा उपलब्ध नहीं है।',
			partialSplit: 'विवरण कुल का केवल एक भाग ही दर्शाता है',
			source: 'स्रोत: FOSS4G वार्षिक आँकड़े',
			table: {
				edition: 'सम्मेलन',
				registrations: 'पंजीकृत',
				inPerson: 'प्रत्यक्ष',
				online: 'ऑनलाइन',
				hostShare: 'मेज़बान देश का हिस्सा',
				status: 'स्थिति'
			}
		}
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`${key} के अनुसार ${direction === 'desc' ? 'अवरोही' : 'आरोही'} क्रम में: ${rows} पंक्तियाँ`,
		sortKeyName: 'नाम',
		sortKeyCount: 'प्रतिभागी संख्या',
		sortKeyCountry: 'देश',
		sortKeyRegion: 'क्षेत्र',
		headResidence: 'निवास',
		headNationality: 'राष्ट्रीयता',
		headAttendees: 'प्रतिभागी',
		headCountry: 'देश',
		headRegion: 'क्षेत्र',
		total: 'कुल'
	},
	region: {
		eastAsiaPacific: 'पूर्वी एशिया और प्रशांत',
		europeCentralAsia: 'यूरोप और मध्य एशिया',
		latinAmericaCaribbean: 'लैटिन अमेरिका और कैरिबियन',
		middleEastNorthAfrica: 'मध्य पूर्व और उत्तरी अफ़्रीका',
		northAmerica: 'उत्तरी अमेरिका',
		southAsia: 'दक्षिण एशिया',
		subSaharanAfrica: 'उप-सहारा अफ़्रीका'
	}
};

export default hi;
