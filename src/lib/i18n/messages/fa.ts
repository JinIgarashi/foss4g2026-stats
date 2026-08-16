import type { Messages } from './en';

/**
 * Persian has a single plural form for counted nouns, so numbers are
 * interpolated directly. Written in logical order — the bidi algorithm handles
 * the visual order under `<html dir="rtl">`.
 */
const fa: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - آمار شرکت‌کنندگان',
		description:
			'نمایش تعاملی روی نقشه از محل زندگی و ملیت شرکت‌کنندگان کنفرانس FOSS4G Hiroshima 2026.'
	},
	header: {
		siteName: 'آمار شرکت‌کنندگان',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'مخزن GitHub',
		language: 'تغییر زبان',
		theme: 'تغییر پوسته'
	},
	theme: {
		light: 'روشن',
		dark: 'تیره',
		system: 'سیستم'
	},
	language: {
		contribute: 'در بهبود کیفیت ترجمه مشارکت کنید',
		title: 'زبان خود را انتخاب کنید',
		description:
			'زبان‌ها بر اساس تعداد شرکت‌کنندگانی که ملیتی دارند که آن زبان در آن رسمی است مرتب شده‌اند. با نام زبان یا کشور جست‌وجو کنید.',
		search: 'جست‌وجوی زبان‌ها',
		searchPlaceholder: 'زبان یا کشور…',
		noResults: 'هیچ زبانی با جست‌وجوی شما مطابقت ندارد',
		resultCount: (n) => `${n} زبان در دسترس است`,
		attendees: (n) => `${n} شرکت‌کننده`
	},
	map: {
		loading: 'در حال بارگذاری...',
		venueName: 'محل برگزاری FOSS4G 2026',
		venueAddress: 'مرکز همایش‌های بین‌المللی هیروشیما',
		register: 'به FOSS4G Hiroshima 2026 بپیوندید'
	},
	layers: {
		title: 'لایه‌ها',
		close: 'بستن پنل لایه‌ها',
		show: 'نمایش کنترل لایه‌ها',
		residence: 'شرکت‌کنندگان از کجا می‌آیند',
		nationality: 'شرکت‌کنندگان چه ملیتی دارند',
		attendees: (n) => `${n} شرکت‌کننده`,
		places: (n, layer) => `از ${n} ${layer === 'residence' ? 'مکان' : 'ملیت'}`,
		asOf: (date) => `تا تاریخ ${date}`,
		about: 'درباره داده‌های شرکت‌کنندگان',
		aboutText:
			'این داده‌ها بر پایه پاسخ شرکت‌کنندگان ثبت‌نام‌شده به پرسش‌های اختیاری درباره شهر و کشور و ملیتشان است.'
	},
	chart: {
		show: 'نمایش نمودار آمار شرکت‌کنندگان',
		title: 'آمار شرکت‌کنندگان',
		preparingData: 'در حال آماده‌سازی داده‌های نمودار...',
		preparing: 'در حال آماده‌سازی نمودار...',
		dataType: 'نوع داده:',
		area: 'محدوده:',
		filter: 'فیلتر:',
		residence: 'محل زندگی',
		nationality: 'ملیت',
		all: 'همه',
		currentExtent: 'محدوده کنونی',
		excludeJapan: 'حذف شرکت‌کنندگان ژاپنی',
		tabChart: 'نمودار',
		tabTable: 'جدول',
		noData: 'در این محدوده داده‌ای وجود ندارد',
		topN: (n, kind) => `${n} ${kind} برتر`,
		xAxis: (kind) => `محور X: ${kind}`,
		byCountry: (n) => `بر پایه کشور (${n} برتر)`,
		byRegion: 'بر پایه منطقه',
		share: 'سهم شرکت‌کنندگان',
		attendeesLabel: 'شرکت‌کنندگان',
		attendeesCount: (n) => `${n} شرکت‌کننده`,
		selectedAttendees: (n) => `شرکت‌کنندگان: ${n}`,
		others: 'سایر'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`مرتب‌شده بر پایه ${key} (${direction === 'desc' ? 'نزولی' : 'صعودی'}): ${rows} سطر`,
		sortKeyName: 'نام',
		sortKeyCount: 'تعداد شرکت‌کنندگان',
		sortKeyCountry: 'کشور',
		sortKeyRegion: 'منطقه',
		headResidence: 'محل زندگی',
		headNationality: 'ملیت',
		headAttendees: 'شرکت‌کنندگان',
		headCountry: 'کشور',
		headRegion: 'منطقه',
		total: 'مجموع'
	},
	region: {
		eastAsiaPacific: 'آسیای شرقی و اقیانوسیه',
		europeCentralAsia: 'اروپا و آسیای مرکزی',
		latinAmericaCaribbean: 'آمریکای لاتین و کارائیب',
		middleEastNorthAfrica: 'خاورمیانه و شمال آفریقا',
		northAmerica: 'آمریکای شمالی',
		southAsia: 'جنوب آسیا',
		subSaharanAfrica: 'آفریقای زیرصحرا'
	}
};

export default fa;
