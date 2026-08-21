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
		contribute: 'Pomozte zlepšit kvalitu překladu',
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
		preparing: 'Příprava grafu...',
		area: 'Oblast',
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
		others: 'Ostatní',
		editions: {
			tab: 'Ročníky',
			title: 'Účast podle ročníku',
			splitDesc: 'Podíl registrací',
			inPersonOnly: 'Prezenčně',
			includeOnline: 'Započítat online',
			hostCountry: 'Hostitelská země',
			international: 'Zahraničí',
			cancelled: 'Zrušeno',
			shareLabel: 'Podíl',
			unknown: 'Nerozděleno',
			noBreakdown: 'U některých ročníků chybí podrobná data.',
			partialSplit: 'Rozpad pokrývá jen část celku',
			source: 'Zdroj: roční statistiky FOSS4G',
			table: {
				edition: 'Ročník',
				registrations: 'Registrovaní',
				inPerson: 'Prezenčně',
				online: 'Online',
				hostShare: 'Podíl hostitele',
				status: 'Stav'
			}
		}
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
	},
	region: {
		eastAsiaPacific: 'Východní Asie a Tichomoří',
		europeCentralAsia: 'Evropa a Střední Asie',
		latinAmericaCaribbean: 'Latinská Amerika a Karibik',
		middleEastNorthAfrica: 'Blízký východ a severní Afrika',
		northAmerica: 'Severní Amerika',
		southAsia: 'Jižní Asie',
		subSaharanAfrica: 'Subsaharská Afrika'
	}
};

export default cs;
