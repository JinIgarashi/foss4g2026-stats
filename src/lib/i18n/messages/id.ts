import type { Messages } from './en';

const id: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Statistik Peserta',
		description:
			'Visualisasi peta interaktif lokasi dan kewarganegaraan peserta konferensi FOSS4G Hiroshima 2026.'
	},
	header: {
		siteName: 'Statistik Peserta',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'Repositori GitHub',
		language: 'Ubah bahasa',
		theme: 'Ubah tema'
	},
	theme: {
		light: 'Terang',
		dark: 'Gelap',
		system: 'Sistem'
	},
	language: {
		contribute: 'Bantu tingkatkan kualitas terjemahan',
		title: 'Pilih bahasa Anda',
		description:
			'Bahasa diurutkan berdasarkan jumlah peserta yang berkewarganegaraan negara tempat bahasa tersebut menjadi bahasa resmi. Cari berdasarkan nama bahasa atau negara.',
		search: 'Cari bahasa',
		searchPlaceholder: 'Bahasa atau negara…',
		noResults: 'Tidak ada bahasa yang cocok dengan pencarian Anda',
		resultCount: (n) => `${n} bahasa tersedia`,
		attendees: (n) => `${n} peserta`
	},
	map: {
		loading: 'Memuat...',
		venueName: 'Lokasi FOSS4G 2026',
		venueAddress: 'Pusat Konferensi Internasional Hiroshima',
		register: 'Ikuti FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Lapisan',
		close: 'Tutup panel lapisan',
		show: 'Tampilkan kontrol lapisan',
		residence: 'Asal tempat tinggal peserta',
		nationality: 'Kewarganegaraan peserta',
		attendees: (n) => `${n} peserta`,
		places: (n, layer) => `dari ${n} ${layer === 'residence' ? 'lokasi' : 'kewarganegaraan'}`,
		asOf: (date) => `Per ${date}`,
		about: 'Tentang data peserta',
		aboutText:
			'Data ini didasarkan pada jawaban peserta terdaftar atas pertanyaan opsional mengenai Kota dan Negara serta Kewarganegaraan mereka.'
	},
	chart: {
		show: 'Tampilkan grafik statistik peserta',
		title: 'Statistik peserta',
		preparing: 'Menyiapkan grafik...',
		area: 'Area',
		residence: 'Tempat tinggal',
		nationality: 'Kewarganegaraan',
		all: 'Semua',
		currentExtent: 'Tampilan saat ini',
		excludeJapan: 'Kecualikan peserta Jepang',
		tabChart: 'Grafik',
		tabTable: 'Tabel',
		noData: 'Tidak ada data dalam rentang ini',
		topN: (n, kind) => `${n} ${kind} teratas`,
		xAxis: (kind) => `Sumbu X: ${kind}`,
		byCountry: (n) => `Menurut negara (${n} teratas)`,
		byRegion: 'Menurut kawasan',
		share: 'Proporsi peserta',
		attendeesLabel: 'Peserta',
		attendeesCount: (n) => `${n} peserta`,
		selectedAttendees: (n) => `Peserta: ${n}`,
		others: 'Lainnya',
		editions: {
			tab: 'Edisi',
			title: 'Kehadiran per edisi',
			splitDesc: 'Proporsi pendaftaran',
			inPersonOnly: 'Tatap muka',
			includeOnline: 'Sertakan daring',
			hostCountry: 'Negara tuan rumah',
			international: 'Internasional',
			cancelled: 'Dibatalkan',
			shareLabel: 'Proporsi',
			unknown: 'Tidak dirinci',
			noBreakdown: 'Beberapa edisi tidak memiliki data rinci.',
			partialSplit: 'Rincian hanya mencakup sebagian dari total',
			source: 'Sumber: statistik tahunan FOSS4G',
			table: {
				edition: 'Edisi',
				registrations: 'Terdaftar',
				inPerson: 'Tatap muka',
				online: 'Daring',
				hostShare: 'Proporsi tuan rumah',
				status: 'Status'
			}
		}
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Diurutkan menurut ${key} (${direction === 'desc' ? 'menurun' : 'menaik'}): ${rows} baris`,
		sortKeyName: 'nama',
		sortKeyCount: 'jumlah peserta',
		sortKeyCountry: 'negara',
		sortKeyRegion: 'kawasan',
		headResidence: 'Tempat tinggal',
		headNationality: 'Kewarganegaraan',
		headAttendees: 'Peserta',
		headCountry: 'Negara',
		headRegion: 'Kawasan',
		total: 'Total'
	},
	region: {
		eastAsiaPacific: 'Asia Timur dan Pasifik',
		europeCentralAsia: 'Eropa dan Asia Tengah',
		latinAmericaCaribbean: 'Amerika Latin dan Karibia',
		middleEastNorthAfrica: 'Timur Tengah dan Afrika Utara',
		northAmerica: 'Amerika Utara',
		southAsia: 'Asia Selatan',
		subSaharanAfrica: 'Afrika Sub-Sahara'
	}
};

export default id;
