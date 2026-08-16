import type { Messages } from './en';

const et: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Osalejate statistika',
		description:
			'Interaktiivne kaardivisualisatsioon FOSS4G Hiroshima 2026 konverentsi osalejate elukohtadest ja kodakondsustest.'
	},
	header: {
		siteName: 'Osalejate statistika',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'GitHubi hoidla',
		language: 'Muuda keelt',
		theme: 'Muuda teemat'
	},
	theme: {
		light: 'Hele',
		dark: 'Tume',
		system: 'Süsteemi oma'
	},
	language: {
		contribute: 'Aita parandada tõlke kvaliteeti',
		title: 'Vali keel',
		description:
			'Keeled on järjestatud selle järgi, kui paljudel osalejatel on kodakondsus, kus see keel on ametlik. Otsi keele või riigi nime järgi.',
		search: 'Otsi keeli',
		searchPlaceholder: 'Keel või riik…',
		noResults: 'Ükski keel ei vasta otsingule',
		resultCount: (n) => `Saadaval ${n} keelt`,
		attendees: (n) => `${n} osalejat`
	},
	map: {
		loading: 'Laadimine...',
		venueName: 'FOSS4G 2026 toimumiskoht',
		venueAddress: 'Hiroshima rahvusvaheline konverentsikeskus',
		register: 'Liitu üritusega FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Kihid',
		close: 'Sulge kihtide paneel',
		show: 'Näita kihtide juhtpaneeli',
		residence: 'Kust osalejad tulevad',
		nationality: 'Milline kodakondsus osalejatel on',
		attendees: (n) => `${n} osalejat`,
		places: (n, layer) => `${n} ${layer === 'residence' ? 'asukohast' : 'kodakondsusest'}`,
		asOf: (date) => `Seisuga ${date}`,
		about: 'Osalejate andmetest',
		aboutText:
			'Andmed põhinevad registreeritud osalejate vastustel vabatahtlikele küsimustele nende linna ja riigi ning kodakondsuse kohta.'
	},
	chart: {
		show: 'Näita osalejate statistika diagrammi',
		title: 'Osalejate statistika',
		preparingData: 'Diagrammi andmete ettevalmistamine...',
		preparing: 'Diagrammi ettevalmistamine...',
		dataType: 'Andmetüüp:',
		area: 'Ala:',
		filter: 'Filter:',
		residence: 'Elukoht',
		nationality: 'Kodakondsus',
		all: 'Kõik',
		currentExtent: 'Praegune vaade',
		excludeJapan: 'Jäta Jaapani osalejad välja',
		tabChart: 'Diagramm',
		tabTable: 'Tabel',
		noData: 'Selles vahemikus andmed puuduvad',
		topN: (n, kind) => `${kind}: ${n} suurimat`,
		xAxis: (kind) => `X-telg: ${kind}`,
		byCountry: (n) => `Riigiti (${n} suurimat)`,
		byRegion: 'Piirkonniti',
		share: 'Osalejate osakaal',
		attendeesLabel: 'Osalejad',
		attendeesCount: (n) => `${n} osalejat`,
		selectedAttendees: (n) => `Osalejaid: ${n}`,
		others: 'Muud'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Sorditud: ${key} (${direction === 'desc' ? 'kahanev' : 'kasvav'}): ${rows} rida`,
		sortKeyName: 'nimi',
		sortKeyCount: 'osalejate arv',
		sortKeyCountry: 'riik',
		sortKeyRegion: 'piirkond',
		headResidence: 'Elukoht',
		headNationality: 'Kodakondsus',
		headAttendees: 'Osalejad',
		headCountry: 'Riik',
		headRegion: 'Piirkond',
		total: 'Kokku'
	},
	region: {
		eastAsiaPacific: 'Ida-Aasia ja Vaikse ookeani piirkond',
		europeCentralAsia: 'Euroopa ja Kesk-Aasia',
		latinAmericaCaribbean: 'Ladina-Ameerika ja Kariibi piirkond',
		middleEastNorthAfrica: 'Lähis-Ida ja Põhja-Aafrika',
		northAmerica: 'Põhja-Ameerika',
		southAsia: 'Lõuna-Aasia',
		subSaharanAfrica: 'Sahara-tagune Aafrika'
	}
};

export default et;
