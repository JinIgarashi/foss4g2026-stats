import type { Messages } from './en';
import { plural } from '../plural';

/** Czech has four plural forms, so counted nouns go through `plural()`. */
const ucastnik = (n: number) =>
	plural('cs', n, { one: 'účastník', few: 'účastníci', many: 'účastníka', other: 'účastníků' });
const jazyk = (n: number) =>
	plural('cs', n, { one: 'jazyk', few: 'jazyky', many: 'jazyka', other: 'jazyků' });
const radek = (n: number) =>
	plural('cs', n, { one: 'řádek', few: 'řádky', many: 'řádku', other: 'řádků' });

const cs: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Statistiky účastníků',
		description:
			'Interaktivní mapová vizualizace bydlišť a národností účastníků konference FOSS4G Hiroshima 2026.'
	},
	header: {
		siteName: 'Statistiky účastníků',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'Repozitář GitHub',
		language: 'Změnit jazyk',
		theme: 'Změnit motiv'
	},
	theme: {
		light: 'Světlý',
		dark: 'Tmavý',
		system: 'Systémový'
	},
	language: {
		title: 'Vyberte jazyk',
		description:
			'Jazyky jsou seřazeny podle počtu účastníků s národností, v níž je daný jazyk úřední. Hledejte podle názvu jazyka nebo země.',
		search: 'Hledat jazyky',
		searchPlaceholder: 'Jazyk nebo země…',
		noResults: 'Hledání neodpovídá žádný jazyk',
		resultCount: (n) => `K dispozici ${n} ${jazyk(n)}`,
		attendees: (n) => `${n} ${ucastnik(n)}`
	},
	map: {
		loading: 'Načítání...',
		venueName: 'Místo konání FOSS4G 2026',
		venueAddress: 'Mezinárodní konferenční centrum Hirošima',
		register: 'Připojte se k FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Vrstvy',
		close: 'Zavřít panel vrstev',
		show: 'Zobrazit ovládání vrstev',
		residence: 'Odkud účastníci pocházejí',
		nationality: 'Jakou národnost účastníci mají',
		attendees: (n) => `${n} ${ucastnik(n)}`,
		places: (n, layer) => `z ${n} ${layer === 'residence' ? 'lokalit' : 'národností'}`,
		asOf: (date) => `Stav k ${date}`,
		about: 'O datech účastníků',
		aboutText:
			'Data vycházejí z odpovědí registrovaných účastníků na nepovinné otázky o jejich městě a zemi a o jejich národnosti.'
	},
	chart: {
		show: 'Zobrazit graf statistik účastníků',
		title: 'Statistiky účastníků',
		preparingData: 'Příprava dat grafu...',
		preparing: 'Příprava grafu...',
		dataType: 'Typ dat:',
		area: 'Oblast:',
		filter: 'Filtr:',
		residence: 'Bydliště',
		nationality: 'Národnost',
		all: 'Vše',
		currentExtent: 'Aktuální výřez',
		excludeJapan: 'Vyloučit japonské účastníky',
		tabChart: 'Graf',
		tabTable: 'Tabulka',
		noData: 'V tomto rozsahu nejsou žádná data',
		topN: (n, kind) => `${kind}: top ${n}`,
		xAxis: (kind) => `Osa X: ${kind}`,
		byCountry: (n) => `Podle země (top ${n})`,
		byRegion: 'Podle regionu',
		share: 'Podíl účastníků',
		attendeesLabel: 'Účastníci',
		attendeesCount: (n) => `${n} účastníků`,
		selectedAttendees: (n) => `Účastníci: ${n}`,
		others: 'Ostatní'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Seřazeno podle: ${key} (${direction === 'desc' ? 'sestupně' : 'vzestupně'}): ${rows} ${radek(rows)}`,
		sortKeyName: 'název',
		sortKeyCount: 'počet účastníků',
		sortKeyCountry: 'země',
		sortKeyRegion: 'region',
		headResidence: 'Bydliště',
		headNationality: 'Národnost',
		headAttendees: 'Účastníci',
		headCountry: 'Země',
		headRegion: 'Region',
		total: 'Celkem'
	}
};

export default cs;
