import type { Messages } from './en';

const tr: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Katılımcı İstatistikleri',
		description:
			'FOSS4G Hiroshima 2026 konferansı katılımcılarının yaşadıkları yerlerin ve uyruklarının etkileşimli harita görselleştirmesi.'
	},
	header: {
		siteName: 'Katılımcı İstatistikleri',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'GitHub deposu',
		language: 'Dili değiştir',
		theme: 'Temayı değiştir'
	},
	theme: {
		light: 'Açık',
		dark: 'Koyu',
		system: 'Sistem'
	},
	language: {
		contribute: 'Çeviri kalitesinin iyileştirilmesine katkıda bulunun',
		title: 'Dilinizi seçin',
		description:
			'Diller, o dilin resmî olduğu bir uyruğa sahip katılımcı sayısına göre sıralanmıştır. Dil veya ülke adına göre arayın.',
		search: 'Dil ara',
		searchPlaceholder: 'Dil veya ülke…',
		noResults: 'Aramanızla eşleşen dil yok',
		resultCount: (n) => `${n} dil mevcut`,
		attendees: (n) => `${n} katılımcı`
	},
	map: {
		loading: 'Yükleniyor...',
		venueName: 'FOSS4G 2026 Etkinlik Alanı',
		venueAddress: 'Hiroşima Uluslararası Konferans Merkezi',
		register: "FOSS4G Hiroshima 2026'ya katılın"
	},
	layers: {
		title: 'Katmanlar',
		close: 'Katman panelini kapat',
		show: 'Katman denetimini göster',
		residence: 'Katılımcılar nereden geliyor',
		nationality: 'Katılımcıların uyruğu',
		attendees: (n) => `${n} katılımcı`,
		places: (n, layer) => `${n} ${layer === 'residence' ? 'konumdan' : 'uyruktan'}`,
		asOf: (date) => `${date} itibarıyla`,
		about: 'Katılımcı verileri hakkında',
		aboutText:
			'Bu veriler, kayıtlı katılımcıların şehir ve ülkeleri ile uyrukları hakkındaki isteğe bağlı sorulara verdikleri yanıtlara dayanmaktadır.'
	},
	chart: {
		show: 'Katılımcı istatistikleri grafiğini göster',
		title: 'Katılımcı istatistikleri',
		preparingData: 'Grafik verileri hazırlanıyor...',
		preparing: 'Grafik hazırlanıyor...',
		dataType: 'Veri türü:',
		area: 'Alan:',
		filter: 'Filtre:',
		residence: 'İkamet',
		nationality: 'Uyruk',
		all: 'Tümü',
		currentExtent: 'Geçerli görünüm',
		excludeJapan: 'Japon katılımcıları hariç tut',
		tabChart: 'Grafik',
		tabTable: 'Tablo',
		noData: 'Bu aralıkta veri yok',
		topN: (n, kind) => `En çok ${n} ${kind}`,
		xAxis: (kind) => `X ekseni: ${kind}`,
		byCountry: (n) => `Ülkeye göre (en çok ${n})`,
		byRegion: 'Bölgeye göre',
		share: 'Katılımcı payı',
		attendeesLabel: 'Katılımcılar',
		attendeesCount: (n) => `${n} katılımcı`,
		selectedAttendees: (n) => `Katılımcı: ${n}`,
		others: 'Diğer'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`${key} ölçütüne göre sıralandı (${direction === 'desc' ? 'azalan' : 'artan'}): ${rows} satır`,
		sortKeyName: 'ad',
		sortKeyCount: 'katılımcı sayısı',
		sortKeyCountry: 'ülke',
		sortKeyRegion: 'bölge',
		headResidence: 'İkamet',
		headNationality: 'Uyruk',
		headAttendees: 'Katılımcılar',
		headCountry: 'Ülke',
		headRegion: 'Bölge',
		total: 'Toplam'
	},
	region: {
		eastAsiaPacific: 'Doğu Asya ve Pasifik',
		europeCentralAsia: 'Avrupa ve Orta Asya',
		latinAmericaCaribbean: 'Latin Amerika ve Karayipler',
		middleEastNorthAfrica: 'Orta Doğu ve Kuzey Afrika',
		northAmerica: 'Kuzey Amerika',
		southAsia: 'Güney Asya',
		subSaharanAfrica: 'Sahra Altı Afrika'
	}
};

export default tr;
