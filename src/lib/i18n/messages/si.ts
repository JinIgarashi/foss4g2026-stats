import type { Messages } from './en';

const si: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - සහභාගිවන්නන්ගේ සංඛ්‍යාලේඛන',
		description:
			'FOSS4G Hiroshima 2026 සමුළුවේ සහභාගිවන්නන්ගේ පදිංචි ස්ථාන සහ ජාතිකත්වය අන්තර්ක්‍රියාකාරී සිතියමකින් දැක්වීම.'
	},
	header: {
		siteName: 'සහභාගිවන්නන්ගේ සංඛ්‍යාලේඛන',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'GitHub ගබඩාව',
		language: 'භාෂාව වෙනස් කරන්න',
		theme: 'තේමාව වෙනස් කරන්න'
	},
	theme: {
		light: 'දීප්ත',
		dark: 'අඳුරු',
		system: 'පද්ධතිය'
	},
	language: {
		title: 'ඔබේ භාෂාව තෝරන්න',
		description:
			'එම භාෂාව රාජ්‍ය භාෂාවක් වන ජාතිකත්වයක් දරන සහභාගිවන්නන් සංඛ්‍යාව අනුව භාෂා පෙළගස්වා ඇත. භාෂාවේ හෝ රටේ නමින් සොයන්න.',
		search: 'භාෂා සොයන්න',
		searchPlaceholder: 'භාෂාව හෝ රට…',
		noResults: 'ඔබේ සෙවීමට ගැළපෙන භාෂාවක් නැත',
		resultCount: (n) => `භාෂා ${n}ක් තිබේ`,
		attendees: (n) => `සහභාගිවන්නන් ${n}`
	},
	map: {
		loading: 'පූරණය වෙමින්...',
		venueName: 'FOSS4G 2026 ස්ථානය',
		venueAddress: 'හිරෝෂිමා ජාත්‍යන්තර සම්මන්ත්‍රණ මධ්‍යස්ථානය',
		register: 'FOSS4G Hiroshima 2026 හා එක්වන්න'
	},
	layers: {
		title: 'ස්තර',
		close: 'ස්තර පුවරුව වසන්න',
		show: 'ස්තර පාලනය පෙන්වන්න',
		residence: 'සහභාගිවන්නන් පැමිණෙන්නේ කොහෙන්ද',
		nationality: 'සහභාගිවන්නන්ට ඇත්තේ කුමන ජාතිකත්වයද',
		attendees: (n) => `සහභාගිවන්නන් ${n}`,
		places: (n, layer) => `${layer === 'residence' ? 'ස්ථාන' : 'ජාතිකත්ව'} ${n}ක් වෙතින්`,
		asOf: (date) => `${date} වන විට`,
		about: 'සහභාගිවන්නන්ගේ දත්ත ගැන',
		aboutText:
			'මෙම දත්ත පදනම් වී ඇත්තේ ලියාපදිංචි සහභාගිවන්නන් තම නගරය සහ රට මෙන්ම ජාතිකත්වය පිළිබඳ විකල්ප ප්‍රශ්නවලට දුන් පිළිතුරු මතය.'
	},
	chart: {
		show: 'සහභාගිවන්නන්ගේ සංඛ්‍යාලේඛන ප්‍රස්තාරය පෙන්වන්න',
		title: 'සහභාගිවන්නන්ගේ සංඛ්‍යාලේඛන',
		preparingData: 'ප්‍රස්තාර දත්ත සූදානම් කරමින්...',
		preparing: 'ප්‍රස්තාරය සූදානම් කරමින්...',
		dataType: 'දත්ත වර්ගය:',
		area: 'ප්‍රදේශය:',
		filter: 'පෙරහන:',
		residence: 'පදිංචිය',
		nationality: 'ජාතිකත්වය',
		all: 'සියල්ල',
		currentExtent: 'වත්මන් පරාසය',
		excludeJapan: 'ජපන් සහභාගිවන්නන් ඉවත් කරන්න',
		tabChart: 'ප්‍රස්තාරය',
		tabTable: 'වගුව',
		noData: 'මෙම පරාසයේ දත්ත නොමැත',
		topN: (n, kind) => `ඉහළම ${kind} ${n}`,
		xAxis: (kind) => `X අක්ෂය: ${kind}`,
		byCountry: (n) => `රට අනුව (ඉහළම ${n})`,
		byRegion: 'කලාපය අනුව',
		share: 'සහභාගිවන්නන්ගේ කොටස',
		attendeesLabel: 'සහභාගිවන්නෝ',
		attendeesCount: (n) => `සහභාගිවන්නන් ${n}`,
		selectedAttendees: (n) => `සහභාගිවන්නෝ: ${n}`,
		others: 'වෙනත්'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`${key} අනුව (${direction === 'desc' ? 'අවරෝහණ' : 'ආරෝහණ'}) පෙළගස්වා ඇත: පේළි ${rows}`,
		sortKeyName: 'නම',
		sortKeyCount: 'සහභාගිවන්නන් සංඛ්‍යාව',
		sortKeyCountry: 'රට',
		sortKeyRegion: 'කලාපය',
		headResidence: 'පදිංචිය',
		headNationality: 'ජාතිකත්වය',
		headAttendees: 'සහභාගිවන්නෝ',
		headCountry: 'රට',
		headRegion: 'කලාපය',
		total: 'එකතුව'
	}
};

export default si;
