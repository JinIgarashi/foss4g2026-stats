import type { Messages } from './en';

const ms: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Statistik Peserta',
		description:
			'Visualisasi peta interaktif bagi lokasi dan kewarganegaraan peserta persidangan FOSS4G Hiroshima 2026.'
	},
	header: {
		siteName: 'Statistik Peserta',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'Repositori GitHub',
		language: 'Tukar bahasa',
		theme: 'Tukar tema'
	},
	theme: {
		light: 'Cerah',
		dark: 'Gelap',
		system: 'Sistem'
	},
	language: {
		contribute: 'Sumbang untuk menambah baik kualiti terjemahan',
		title: 'Pilih bahasa anda',
		description:
			'Bahasa disusun mengikut bilangan peserta yang berkewarganegaraan negara yang menjadikan bahasa itu bahasa rasmi. Cari mengikut nama bahasa atau negara.',
		search: 'Cari bahasa',
		searchPlaceholder: 'Bahasa atau negara…',
		noResults: 'Tiada bahasa sepadan dengan carian anda',
		resultCount: (n) => `${n} bahasa tersedia`,
		attendees: (n) => `${n} peserta`
	},
	map: {
		loading: 'Memuatkan...',
		venueName: 'Tempat FOSS4G 2026',
		venueAddress: 'Pusat Persidangan Antarabangsa Hiroshima',
		register: 'Sertai FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Lapisan',
		close: 'Tutup panel lapisan',
		show: 'Tunjukkan kawalan lapisan',
		residence: 'Dari mana peserta datang',
		nationality: 'Kewarganegaraan peserta',
		attendees: (n) => `${n} peserta`,
		places: (n, layer) => `dari ${n} ${layer === 'residence' ? 'lokasi' : 'kewarganegaraan'}`,
		asOf: (date) => `Sehingga ${date}`,
		about: 'Tentang data peserta',
		aboutText:
			'Data ini berdasarkan jawapan peserta berdaftar kepada soalan pilihan tentang Bandar dan Negara serta Kewarganegaraan mereka.'
	},
	chart: {
		show: 'Tunjukkan carta statistik peserta',
		title: 'Statistik peserta',
		preparing: 'Menyediakan carta...',
		area: 'Kawasan',
		residence: 'Tempat tinggal',
		nationality: 'Kewarganegaraan',
		all: 'Semua',
		currentExtent: 'Paparan semasa',
		excludeJapan: 'Kecualikan peserta Jepun',
		tabChart: 'Carta',
		tabTable: 'Jadual',
		noData: 'Tiada data dalam julat ini',
		topN: (n, kind) => `${n} ${kind} teratas`,
		xAxis: (kind) => `Paksi X: ${kind}`,
		byCountry: (n) => `Mengikut negara (${n} teratas)`,
		byRegion: 'Mengikut rantau',
		share: 'Bahagian peserta',
		attendeesLabel: 'Peserta',
		attendeesCount: (n) => `${n} peserta`,
		selectedAttendees: (n) => `Peserta: ${n}`,
		others: 'Lain-lain',
		editions: {
			tab: 'Edisi',
			title: 'Kehadiran mengikut edisi',
			splitDesc: 'Nisbah pendaftaran',
			inPersonOnly: 'Bersemuka',
			includeOnline: 'Sertakan dalam talian',
			hostCountry: 'Negara tuan rumah',
			international: 'Antarabangsa',
			cancelled: 'Dibatalkan',
			shareLabel: 'Bahagian',
			unknown: 'Tidak diperinci',
			noBreakdown: 'Sesetengah edisi tiada data terperinci.',
			partialSplit: 'Pecahan hanya meliputi sebahagian daripada jumlah',
			source: 'Sumber: statistik tahunan FOSS4G',
			table: {
				edition: 'Edisi',
				registrations: 'Berdaftar',
				inPerson: 'Bersemuka',
				online: 'Dalam talian',
				hostShare: 'Bahagian tuan rumah',
				status: 'Status'
			}
		}
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Disusun mengikut ${key} (${direction === 'desc' ? 'menurun' : 'menaik'}): ${rows} baris`,
		sortKeyName: 'nama',
		sortKeyCount: 'bilangan peserta',
		sortKeyCountry: 'negara',
		sortKeyRegion: 'rantau',
		headResidence: 'Tempat tinggal',
		headNationality: 'Kewarganegaraan',
		headAttendees: 'Peserta',
		headCountry: 'Negara',
		headRegion: 'Rantau',
		total: 'Jumlah'
	},
	region: {
		eastAsiaPacific: 'Asia Timur dan Pasifik',
		europeCentralAsia: 'Eropah dan Asia Tengah',
		latinAmericaCaribbean: 'Amerika Latin dan Caribbean',
		middleEastNorthAfrica: 'Timur Tengah dan Afrika Utara',
		northAmerica: 'Amerika Utara',
		southAsia: 'Asia Selatan',
		subSaharanAfrica: 'Afrika Sub-Sahara'
	}
};

export default ms;
