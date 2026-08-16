import type { Messages } from './en';
import { plural } from '../plural';

/**
 * Arabic has six plural forms. Written in logical order — the browser's bidi
 * algorithm lays the interpolated numbers out visually once `<html dir="rtl">`
 * is set.
 */
const musharik = (n: number) =>
	plural('ar', n, {
		zero: 'مشارك',
		one: 'مشارك واحد',
		two: 'مشاركان',
		few: 'مشاركين',
		many: 'مشاركًا',
		other: 'مشارك'
	});
const lugha = (n: number) =>
	plural('ar', n, {
		zero: 'لغة',
		one: 'لغة واحدة',
		two: 'لغتان',
		few: 'لغات',
		many: 'لغة',
		other: 'لغة'
	});
const saf = (n: number) =>
	plural('ar', n, {
		zero: 'صف',
		one: 'صف واحد',
		two: 'صفان',
		few: 'صفوف',
		many: 'صفًا',
		other: 'صف'
	});

const ar: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - إحصاءات المشاركين',
		description:
			'تصور تفاعلي على الخريطة لأماكن إقامة المشاركين في مؤتمر FOSS4G Hiroshima 2026 وجنسياتهم.'
	},
	header: {
		siteName: 'إحصاءات المشاركين',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'مستودع GitHub',
		language: 'تغيير اللغة',
		theme: 'تغيير المظهر'
	},
	theme: {
		light: 'فاتح',
		dark: 'داكن',
		system: 'النظام'
	},
	language: {
		contribute: 'ساهم في تحسين جودة الترجمة',
		title: 'اختر لغتك',
		description:
			'اللغات مرتبة حسب عدد المشاركين الذين يحملون جنسية تكون فيها اللغة رسمية. ابحث باسم اللغة أو اسم البلد.',
		search: 'البحث عن اللغات',
		searchPlaceholder: 'اللغة أو البلد…',
		noResults: 'لا توجد لغة تطابق بحثك',
		resultCount: (n) => `${n} ${lugha(n)} متاحة`,
		attendees: (n) => `${n} ${musharik(n)}`
	},
	map: {
		loading: 'جارٍ التحميل...',
		venueName: 'مقر FOSS4G 2026',
		venueAddress: 'مركز هيروشيما الدولي للمؤتمرات',
		register: 'انضم إلى FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'الطبقات',
		close: 'إغلاق لوحة الطبقات',
		show: 'إظهار عناصر التحكم في الطبقات',
		residence: 'من أين يأتي المشاركون',
		nationality: 'ما جنسية المشاركين',
		attendees: (n) => `${n} ${musharik(n)}`,
		places: (n, layer) => `من ${n} ${layer === 'residence' ? 'موقعًا' : 'جنسية'}`,
		asOf: (date) => `حتى ${date}`,
		about: 'حول بيانات المشاركين',
		aboutText:
			'تستند هذه البيانات إلى إجابات المشاركين المسجلين على أسئلة اختيارية حول مدينتهم وبلدهم وجنسيتهم.'
	},
	chart: {
		show: 'إظهار الرسم البياني لإحصاءات المشاركين',
		title: 'إحصاءات المشاركين',
		preparingData: 'جارٍ تجهيز بيانات الرسم البياني...',
		preparing: 'جارٍ تجهيز الرسم البياني...',
		dataType: 'نوع البيانات:',
		area: 'النطاق:',
		filter: 'التصفية:',
		residence: 'مكان الإقامة',
		nationality: 'الجنسية',
		all: 'الكل',
		currentExtent: 'النطاق الحالي',
		excludeJapan: 'استبعاد المشاركين اليابانيين',
		tabChart: 'رسم بياني',
		tabTable: 'جدول',
		noData: 'لا توجد بيانات في هذا النطاق',
		topN: (n, kind) => `أعلى ${n} من ${kind}`,
		xAxis: (kind) => `المحور السيني: ${kind}`,
		byCountry: (n) => `حسب البلد (أعلى ${n})`,
		byRegion: 'حسب المنطقة',
		share: 'نسبة المشاركين',
		attendeesLabel: 'المشاركون',
		attendeesCount: (n) => `${n} مشارك`,
		selectedAttendees: (n) => `المشاركون: ${n}`,
		others: 'أخرى'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`مرتّب حسب ${key} (${direction === 'desc' ? 'تنازليًا' : 'تصاعديًا'}): ${rows} ${saf(rows)}`,
		sortKeyName: 'الاسم',
		sortKeyCount: 'عدد المشاركين',
		sortKeyCountry: 'البلد',
		sortKeyRegion: 'المنطقة',
		headResidence: 'مكان الإقامة',
		headNationality: 'الجنسية',
		headAttendees: 'المشاركون',
		headCountry: 'البلد',
		headRegion: 'المنطقة',
		total: 'الإجمالي'
	},
	region: {
		eastAsiaPacific: 'شرق آسيا والمحيط الهادئ',
		europeCentralAsia: 'أوروبا وآسيا الوسطى',
		latinAmericaCaribbean: 'أمريكا اللاتينية والبحر الكاريبي',
		middleEastNorthAfrica: 'الشرق الأوسط وشمال أفريقيا',
		northAmerica: 'أمريكا الشمالية',
		southAsia: 'جنوب آسيا',
		subSaharanAfrica: 'أفريقيا جنوب الصحراء الكبرى'
	}
};

export default ar;
