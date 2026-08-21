import type { Messages } from './en';

const ta: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - பங்கேற்பாளர் புள்ளிவிவரம்',
		description:
			'FOSS4G Hiroshima 2026 மாநாட்டுப் பங்கேற்பாளர்களின் இருப்பிடங்களையும் குடியுரிமைகளையும் காட்டும் ஊடாடும் வரைபடம்.'
	},
	header: {
		siteName: 'பங்கேற்பாளர் புள்ளிவிவரம்',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'GitHub களஞ்சியம்',
		language: 'மொழியை மாற்று',
		theme: 'தோற்றத்தை மாற்று'
	},
	theme: {
		light: 'ஒளி',
		dark: 'இருள்',
		system: 'கணினி'
	},
	language: {
		contribute: 'மொழிபெயர்ப்பின் தரத்தை மேம்படுத்த பங்களியுங்கள்',
		title: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
		description:
			'அந்த மொழி ஆட்சிமொழியாக உள்ள நாட்டுக் குடியுரிமை கொண்ட பங்கேற்பாளர்களின் எண்ணிக்கை அடிப்படையில் மொழிகள் வரிசைப்படுத்தப்பட்டுள்ளன. மொழி அல்லது நாட்டுப் பெயரால் தேடலாம்.',
		search: 'மொழிகளைத் தேடு',
		searchPlaceholder: 'மொழி அல்லது நாடு…',
		noResults: 'உங்கள் தேடலுக்கு எந்த மொழியும் பொருந்தவில்லை',
		resultCount: (n) => `${n} மொழிகள் உள்ளன`,
		attendees: (n) => `${n} பங்கேற்பாளர்கள்`
	},
	map: {
		loading: 'ஏற்றுகிறது...',
		venueName: 'FOSS4G 2026 நிகழ்விடம்',
		venueAddress: 'ஹிரோஷிமா சர்வதேச மாநாட்டு மையம்',
		register: 'FOSS4G Hiroshima 2026 இல் இணையுங்கள்'
	},
	layers: {
		title: 'அடுக்குகள்',
		close: 'அடுக்குப் பலகத்தை மூடு',
		show: 'அடுக்குக் கட்டுப்பாட்டைக் காட்டு',
		residence: 'பங்கேற்பாளர்கள் எங்கிருந்து வருகிறார்கள்',
		nationality: 'பங்கேற்பாளர்களின் குடியுரிமை',
		attendees: (n) => `${n} பங்கேற்பாளர்கள்`,
		places: (n, layer) =>
			`${n} ${layer === 'residence' ? 'இடங்களிலிருந்து' : 'குடியுரிமைகளிலிருந்து'}`,
		asOf: (date) => `${date} நிலவரப்படி`,
		about: 'பங்கேற்பாளர் தரவு பற்றி',
		aboutText:
			'பதிவு செய்த பங்கேற்பாளர்கள் தங்கள் நகரம், நாடு மற்றும் குடியுரிமை குறித்த விருப்பக் கேள்விகளுக்கு அளித்த பதில்களை இத்தரவு அடிப்படையாகக் கொண்டது.'
	},
	chart: {
		show: 'பங்கேற்பாளர் புள்ளிவிவர வரைபடத்தைக் காட்டு',
		title: 'பங்கேற்பாளர் புள்ளிவிவரம்',
		preparing: 'வரைபடத்தைத் தயாரிக்கிறது...',
		area: 'பகுதி',
		residence: 'இருப்பிடம்',
		nationality: 'குடியுரிமை',
		all: 'அனைத்தும்',
		currentExtent: 'தற்போதைய பரப்பு',
		excludeJapan: 'ஜப்பானியப் பங்கேற்பாளர்களை நீக்கு',
		tabChart: 'வரைபடம்',
		tabTable: 'அட்டவணை',
		noData: 'இந்த வரம்பில் தரவு எதுவும் இல்லை',
		topN: (n, kind) => `முதல் ${n} ${kind}`,
		xAxis: (kind) => `X அச்சு: ${kind}`,
		byCountry: (n) => `நாடு வாரியாக (முதல் ${n})`,
		byRegion: 'பிராந்தியம் வாரியாக',
		share: 'பங்கேற்பாளர் பங்கு',
		attendeesLabel: 'பங்கேற்பாளர்கள்',
		attendeesCount: (n) => `${n} பங்கேற்பாளர்கள்`,
		selectedAttendees: (n) => `பங்கேற்பாளர்கள்: ${n}`,
		others: 'மற்றவை',
		editions: {
			tab: 'மாநாடுகள்',
			title: 'மாநாடு வாரியான பங்கேற்பு',
			splitDesc: 'பதிவுகளின் விகிதம்',
			inPersonOnly: 'நேரில்',
			includeOnline: 'ஆன்லைனையும் சேர்',
			hostCountry: 'நடத்தும் நாடு',
			international: 'வெளிநாடு',
			cancelled: 'ரத்து',
			shareLabel: 'விகிதம்',
			unknown: 'விவரம் இல்லை',
			noBreakdown: 'சில மாநாடுகளுக்கு விரிவான தரவு இல்லை.',
			partialSplit: 'விவரம் மொத்தத்தின் ஒரு பகுதியை மட்டுமே உள்ளடக்கியது',
			source: 'ஆதாரம்: FOSS4G ஆண்டு புள்ளிவிவரங்கள்',
			table: {
				edition: 'மாநாடு',
				registrations: 'பதிவு',
				inPerson: 'நேரில்',
				online: 'ஆன்லைன்',
				hostShare: 'நடத்தும் நாட்டின் விகிதம்',
				status: 'நிலை'
			}
		}
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`${key} ${direction === 'desc' ? 'இறங்கு' : 'ஏறு'} வரிசையில்: ${rows} வரிசைகள்`,
		sortKeyName: 'பெயர்',
		sortKeyCount: 'பங்கேற்பாளர் எண்ணிக்கை',
		sortKeyCountry: 'நாடு',
		sortKeyRegion: 'பிராந்தியம்',
		headResidence: 'இருப்பிடம்',
		headNationality: 'குடியுரிமை',
		headAttendees: 'பங்கேற்பாளர்கள்',
		headCountry: 'நாடு',
		headRegion: 'பிராந்தியம்',
		total: 'மொத்தம்'
	},
	region: {
		eastAsiaPacific: 'கிழக்காசியா மற்றும் பசிபிக்',
		europeCentralAsia: 'ஐரோப்பா மற்றும் மத்திய ஆசியா',
		latinAmericaCaribbean: 'லத்தீன் அமெரிக்கா மற்றும் கரீபியன்',
		middleEastNorthAfrica: 'மத்திய கிழக்கு மற்றும் வட ஆப்பிரிக்கா',
		northAmerica: 'வட அமெரிக்கா',
		southAsia: 'தெற்காசியா',
		subSaharanAfrica: 'சஹாராவுக்கு அப்பாலுள்ள ஆப்பிரிக்கா'
	}
};

export default ta;
