import type { Messages } from './en';
import { plural } from '../plural';

/** Croatian has three plural forms, so counted nouns go through `plural()`. */
const sudionik = (n: number) =>
	plural('hr', n, { one: 'sudionik', few: 'sudionika', other: 'sudionika' });
const jezik = (n: number) => plural('hr', n, { one: 'jezik', few: 'jezika', other: 'jezika' });
const redak = (n: number) => plural('hr', n, { one: 'redak', few: 'retka', other: 'redaka' });

const hr: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Statistika sudionika',
		description:
			'Interaktivna kartografska vizualizacija mjesta stanovanja i državljanstava sudionika konferencije FOSS4G Hiroshima 2026.'
	},
	header: {
		siteName: 'Statistika sudionika',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'GitHub repozitorij',
		language: 'Promijeni jezik',
		theme: 'Promijeni temu'
	},
	theme: {
		light: 'Svijetla',
		dark: 'Tamna',
		system: 'Sustav'
	},
	language: {
		contribute: 'Doprinesite poboljšanju kvalitete prijevoda',
		title: 'Odaberite jezik',
		description:
			'Jezici su poredani prema broju sudionika s državljanstvom u kojem je taj jezik službeni. Pretražujte po nazivu jezika ili države.',
		search: 'Pretraži jezike',
		searchPlaceholder: 'Jezik ili država…',
		noResults: 'Nijedan jezik ne odgovara pretrazi',
		resultCount: (n) => `Dostupno ${n} ${jezik(n)}`,
		attendees: (n) => `${n} ${sudionik(n)}`
	},
	map: {
		loading: 'Učitavanje...',
		venueName: 'Mjesto održavanja FOSS4G 2026',
		venueAddress: 'Međunarodni konferencijski centar Hiroshima',
		register: 'Pridružite se FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Slojevi',
		close: 'Zatvori ploču slojeva',
		show: 'Prikaži upravljanje slojevima',
		residence: 'Odakle sudionici dolaze',
		nationality: 'Koje državljanstvo sudionici imaju',
		attendees: (n) => `${n} ${sudionik(n)}`,
		places: (n, layer) => `iz ${n} ${layer === 'residence' ? 'mjesta' : 'državljanstava'}`,
		asOf: (date) => `Stanje na ${date}`,
		about: 'O podacima o sudionicima',
		aboutText:
			'Podaci se temelje na odgovorima prijavljenih sudionika na neobavezna pitanja o njihovom gradu i državi te državljanstvu.'
	},
	chart: {
		show: 'Prikaži grafikon statistike sudionika',
		title: 'Statistika sudionika',
		preparingData: 'Priprema podataka grafikona...',
		preparing: 'Priprema grafikona...',
		dataType: 'Vrsta podataka:',
		area: 'Područje:',
		filter: 'Filtar:',
		residence: 'Mjesto stanovanja',
		nationality: 'Državljanstvo',
		all: 'Sve',
		currentExtent: 'Trenutni prikaz',
		excludeJapan: 'Isključi japanske sudionike',
		tabChart: 'Grafikon',
		tabTable: 'Tablica',
		noData: 'U ovom rasponu nema podataka',
		topN: (n, kind) => `${kind}: najboljih ${n}`,
		xAxis: (kind) => `Os X: ${kind}`,
		byCountry: (n) => `Po državi (najboljih ${n})`,
		byRegion: 'Po regiji',
		share: 'Udio sudionika',
		attendeesLabel: 'Sudionici',
		attendeesCount: (n) => `${n} sudionika`,
		selectedAttendees: (n) => `Sudionici: ${n}`,
		others: 'Ostalo'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Poredano po: ${key} (${direction === 'desc' ? 'silazno' : 'uzlazno'}): ${rows} ${redak(rows)}`,
		sortKeyName: 'naziv',
		sortKeyCount: 'broj sudionika',
		sortKeyCountry: 'država',
		sortKeyRegion: 'regija',
		headResidence: 'Mjesto stanovanja',
		headNationality: 'Državljanstvo',
		headAttendees: 'Sudionici',
		headCountry: 'Država',
		headRegion: 'Regija',
		total: 'Ukupno'
	},
	region: {
		eastAsiaPacific: 'Istočna Azija i Pacifik',
		europeCentralAsia: 'Europa i središnja Azija',
		latinAmericaCaribbean: 'Latinska Amerika i Karibi',
		middleEastNorthAfrica: 'Bliski istok i sjeverna Afrika',
		northAmerica: 'Sjeverna Amerika',
		southAsia: 'Južna Azija',
		subSaharanAfrica: 'Podsaharska Afrika'
	}
};

export default hr;
