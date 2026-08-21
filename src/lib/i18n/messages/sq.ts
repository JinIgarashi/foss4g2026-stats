import type { Messages } from './en';

const sq: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Statistika të pjesëmarrësve',
		description:
			'Vizualizim interaktiv në hartë i vendbanimeve dhe shtetësive të pjesëmarrësve të konferencës FOSS4G Hiroshima 2026.'
	},
	header: {
		siteName: 'Statistika të pjesëmarrësve',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'Depoja në GitHub',
		language: 'Ndrysho gjuhën',
		theme: 'Ndrysho temën'
	},
	theme: {
		light: 'E çelët',
		dark: 'E errët',
		system: 'Sistemi'
	},
	language: {
		contribute: 'Kontribuoni për të përmirësuar cilësinë e përkthimit',
		title: 'Zgjidhni gjuhën tuaj',
		description:
			'Gjuhët janë renditur sipas numrit të pjesëmarrësve që kanë një shtetësi ku ajo gjuhë është zyrtare. Kërkoni sipas emrit të gjuhës ose të shtetit.',
		search: 'Kërko gjuhë',
		searchPlaceholder: 'Gjuhë ose shtet…',
		noResults: 'Asnjë gjuhë nuk përputhet me kërkimin tuaj',
		resultCount: (n) => `${n} gjuhë në dispozicion`,
		attendees: (n) => `${n} pjesëmarrës`
	},
	map: {
		loading: 'Po ngarkohet...',
		venueName: 'Vendi i FOSS4G 2026',
		venueAddress: 'Qendra Ndërkombëtare e Konferencave në Hiroshima',
		register: 'Bashkohuni me FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Shtresat',
		close: 'Mbyll panelin e shtresave',
		show: 'Shfaq kontrollin e shtresave',
		residence: 'Nga vijnë pjesëmarrësit',
		nationality: 'Çfarë shtetësie kanë pjesëmarrësit',
		attendees: (n) => `${n} pjesëmarrës`,
		places: (n, layer) => `nga ${n} ${layer === 'residence' ? 'vendndodhje' : 'shtetësi'}`,
		asOf: (date) => `Deri më ${date}`,
		about: 'Rreth të dhënave të pjesëmarrësve',
		aboutText:
			'Këto të dhëna bazohen në përgjigjet e pjesëmarrësve të regjistruar ndaj pyetjeve fakultative për qytetin dhe shtetin e tyre si dhe shtetësinë.'
	},
	chart: {
		show: 'Shfaq grafikun e statistikave të pjesëmarrësve',
		title: 'Statistika të pjesëmarrësve',
		preparing: 'Po përgatitet grafiku...',
		area: 'Zona',
		residence: 'Vendbanimi',
		nationality: 'Shtetësia',
		all: 'Të gjitha',
		currentExtent: 'Pamja aktuale',
		excludeJapan: 'Përjashto pjesëmarrësit japonezë',
		tabChart: 'Grafik',
		tabTable: 'Tabelë',
		noData: 'Nuk ka të dhëna në këtë interval',
		topN: (n, kind) => `${n} ${kind} kryesore`,
		xAxis: (kind) => `Boshti X: ${kind}`,
		byCountry: (n) => `Sipas shtetit (${n} kryesore)`,
		byRegion: 'Sipas rajonit',
		share: 'Pjesa e pjesëmarrësve',
		attendeesLabel: 'Pjesëmarrës',
		attendeesCount: (n) => `${n} pjesëmarrës`,
		selectedAttendees: (n) => `Pjesëmarrës: ${n}`,
		others: 'Të tjera',
		editions: {
			tab: 'Edicionet',
			title: 'Pjesëmarrja sipas edicionit',
			splitDesc: 'Përqindja e regjistrimeve',
			inPersonOnly: 'Në prani',
			includeOnline: 'Përfshi online',
			hostCountry: 'Vendi pritës',
			international: 'Ndërkombëtar',
			cancelled: 'E anuluar',
			shareLabel: 'Pjesa',
			unknown: 'Pa ndarje',
			noBreakdown: 'Disa edicione nuk kanë të dhëna të detajuara.',
			partialSplit: 'Ndarja mbulon vetëm një pjesë të totalit',
			source: 'Burimi: të dhënat vjetore të FOSS4G',
			table: {
				edition: 'Edicioni',
				registrations: 'Të regjistruar',
				inPerson: 'Në prani',
				online: 'Online',
				hostShare: 'Pjesa e vendit pritës',
				status: 'Statusi'
			}
		}
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Renditur sipas ${key} (${direction === 'desc' ? 'zbritës' : 'rritës'}): ${rows} rreshta`,
		sortKeyName: 'emri',
		sortKeyCount: 'numri i pjesëmarrësve',
		sortKeyCountry: 'shteti',
		sortKeyRegion: 'rajoni',
		headResidence: 'Vendbanimi',
		headNationality: 'Shtetësia',
		headAttendees: 'Pjesëmarrës',
		headCountry: 'Shteti',
		headRegion: 'Rajoni',
		total: 'Totali'
	},
	region: {
		eastAsiaPacific: 'Azia Lindore dhe Paqësori',
		europeCentralAsia: 'Evropa dhe Azia Qendrore',
		latinAmericaCaribbean: 'Amerika Latine dhe Karaibet',
		middleEastNorthAfrica: 'Lindja e Mesme dhe Afrika e Veriut',
		northAmerica: 'Amerika e Veriut',
		southAsia: 'Azia Jugore',
		subSaharanAfrica: 'Afrika Nën-Sahariane'
	}
};

export default sq;
