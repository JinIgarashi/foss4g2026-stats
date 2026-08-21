import type { Messages } from './en';

/**
 * Written in logical order — the bidi algorithm handles the visual order under
 * `<html dir="rtl">`.
 */
const ur: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - شرکاء کے اعدادوشمار',
		description:
			'FOSS4G Hiroshima 2026 کانفرنس کے شرکاء کی رہائش اور قومیت کی انٹرایکٹو نقشہ جاتی پیشکش۔'
	},
	header: {
		siteName: 'شرکاء کے اعدادوشمار',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'GitHub ریپازٹری',
		language: 'زبان تبدیل کریں',
		theme: 'تھیم تبدیل کریں'
	},
	theme: {
		light: 'روشن',
		dark: 'گہرا',
		system: 'سسٹم'
	},
	language: {
		contribute: 'ترجمے کے معیار کو بہتر بنانے میں تعاون کریں',
		title: 'اپنی زبان منتخب کریں',
		description:
			'زبانیں اس ترتیب سے ہیں کہ کتنے شرکاء کی قومیت ایسے ملک کی ہے جہاں یہ زبان سرکاری ہے۔ زبان یا ملک کے نام سے تلاش کریں۔',
		search: 'زبانیں تلاش کریں',
		searchPlaceholder: 'زبان یا ملک…',
		noResults: 'آپ کی تلاش سے کوئی زبان مطابقت نہیں رکھتی',
		resultCount: (n) => `${n} زبانیں دستیاب ہیں`,
		attendees: (n) => `${n} شرکاء`
	},
	map: {
		loading: 'لوڈ ہو رہا ہے...',
		venueName: 'FOSS4G 2026 کا مقام',
		venueAddress: 'ہیروشیما بین الاقوامی کانفرنس سینٹر',
		register: 'FOSS4G Hiroshima 2026 میں شامل ہوں'
	},
	layers: {
		title: 'پرتیں',
		close: 'پرتوں کا پینل بند کریں',
		show: 'پرتوں کا کنٹرول دکھائیں',
		residence: 'شرکاء کہاں سے آتے ہیں',
		nationality: 'شرکاء کی قومیت کیا ہے',
		attendees: (n) => `${n} شرکاء`,
		places: (n, layer) => `${n} ${layer === 'residence' ? 'مقامات' : 'قومیتوں'} سے`,
		asOf: (date) => `${date} تک`,
		about: 'شرکاء کے ڈیٹا کے بارے میں',
		aboutText:
			'یہ ڈیٹا رجسٹرڈ شرکاء کے ان اختیاری سوالات کے جوابات پر مبنی ہے جو ان کے شہر، ملک اور قومیت سے متعلق تھے۔'
	},
	chart: {
		show: 'شرکاء کے اعدادوشمار کا چارٹ دکھائیں',
		title: 'شرکاء کے اعدادوشمار',
		preparing: 'چارٹ تیار کیا جا رہا ہے...',
		area: 'علاقہ',
		residence: 'رہائش',
		nationality: 'قومیت',
		all: 'سب',
		currentExtent: 'موجودہ حدود',
		excludeJapan: 'جاپانی شرکاء کو خارج کریں',
		tabChart: 'چارٹ',
		tabTable: 'ٹیبل',
		noData: 'اس حد میں کوئی ڈیٹا دستیاب نہیں',
		topN: (n, kind) => `سرفہرست ${n} ${kind}`,
		xAxis: (kind) => `X محور: ${kind}`,
		byCountry: (n) => `ملک کے لحاظ سے (سرفہرست ${n})`,
		byRegion: 'خطے کے لحاظ سے',
		share: 'شرکاء کا تناسب',
		attendeesLabel: 'شرکاء',
		attendeesCount: (n) => `${n} شرکاء`,
		selectedAttendees: (n) => `شرکاء: ${n}`,
		others: 'دیگر',
		editions: {
			tab: 'سابقہ اجلاس',
			title: 'فی اجلاس شرکت',
			splitDesc: 'رجسٹریشن کا تناسب',
			inPersonOnly: 'بالمشافہ',
			includeOnline: 'آن لائن شامل کریں',
			hostCountry: 'میزبان ملک',
			international: 'بین الاقوامی',
			cancelled: 'منسوخ',
			shareLabel: 'حصہ',
			unknown: 'تفصیل نہیں',
			noBreakdown: 'کچھ اجلاس کی تفصیلی معلومات دستیاب نہیں۔',
			partialSplit: 'تفصیل کل کا صرف ایک حصہ ظاہر کرتی ہے',
			source: 'ماخذ: FOSS4G سالانہ اعداد و شمار',
			table: {
				edition: 'اجلاس',
				registrations: 'رجسٹرڈ',
				inPerson: 'بالمشافہ',
				online: 'آن لائن',
				hostShare: 'میزبان ملک کا حصہ',
				status: 'حیثیت'
			}
		}
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`${key} کے لحاظ سے ترتیب (${direction === 'desc' ? 'نزولی' : 'صعودی'}): ${rows} قطاریں`,
		sortKeyName: 'نام',
		sortKeyCount: 'شرکاء کی تعداد',
		sortKeyCountry: 'ملک',
		sortKeyRegion: 'خطہ',
		headResidence: 'رہائش',
		headNationality: 'قومیت',
		headAttendees: 'شرکاء',
		headCountry: 'ملک',
		headRegion: 'خطہ',
		total: 'کل'
	},
	region: {
		eastAsiaPacific: 'مشرقی ایشیا اور بحرالکاہل',
		europeCentralAsia: 'یورپ اور وسطی ایشیا',
		latinAmericaCaribbean: 'لاطینی امریکہ اور کیریبین',
		middleEastNorthAfrica: 'مشرق وسطیٰ اور شمالی افریقہ',
		northAmerica: 'شمالی امریکہ',
		southAsia: 'جنوبی ایشیا',
		subSaharanAfrica: 'سب صحارا افریقہ'
	}
};

export default ur;
