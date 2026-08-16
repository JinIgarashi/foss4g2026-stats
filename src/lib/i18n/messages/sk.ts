import type { Messages } from './en';
import { plural } from '../plural';

/** Slovak has four plural forms, so counted nouns go through `plural()`. */
const ucastnik = (n: number) =>
	plural('sk', n, { one: 'účastník', few: 'účastníci', many: 'účastníka', other: 'účastníkov' });
const jazyk = (n: number) =>
	plural('sk', n, { one: 'jazyk', few: 'jazyky', many: 'jazyka', other: 'jazykov' });
const riadok = (n: number) =>
	plural('sk', n, { one: 'riadok', few: 'riadky', many: 'riadku', other: 'riadkov' });

const sk: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Štatistiky účastníkov',
		description:
			'Interaktívna mapová vizualizácia bydlísk a národností účastníkov konferencie FOSS4G Hiroshima 2026.'
	},
	header: {
		siteName: 'Štatistiky účastníkov',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'Repozitár GitHub',
		language: 'Zmeniť jazyk',
		theme: 'Zmeniť motív'
	},
	theme: {
		light: 'Svetlý',
		dark: 'Tmavý',
		system: 'Systémový'
	},
	language: {
		title: 'Vyberte si jazyk',
		description:
			'Jazyky sú zoradené podľa počtu účastníkov s národnosťou, v ktorej je daný jazyk úradný. Hľadajte podľa názvu jazyka alebo krajiny.',
		search: 'Hľadať jazyky',
		searchPlaceholder: 'Jazyk alebo krajina…',
		noResults: 'Hľadaniu nezodpovedá žiadny jazyk',
		resultCount: (n) => `K dispozícii ${n} ${jazyk(n)}`,
		attendees: (n) => `${n} ${ucastnik(n)}`
	},
	map: {
		loading: 'Načítava sa...',
		venueName: 'Miesto konania FOSS4G 2026',
		venueAddress: 'Medzinárodné konferenčné centrum Hirošima',
		register: 'Pripojte sa k FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Vrstvy',
		close: 'Zavrieť panel vrstiev',
		show: 'Zobraziť ovládanie vrstiev',
		residence: 'Odkiaľ účastníci pochádzajú',
		nationality: 'Akú národnosť účastníci majú',
		attendees: (n) => `${n} ${ucastnik(n)}`,
		places: (n, layer) => `z ${n} ${layer === 'residence' ? 'lokalít' : 'národností'}`,
		asOf: (date) => `Stav k ${date}`,
		about: 'O údajoch účastníkov',
		aboutText:
			'Údaje vychádzajú z odpovedí registrovaných účastníkov na nepovinné otázky o ich meste a krajine a o ich národnosti.'
	},
	chart: {
		show: 'Zobraziť graf štatistík účastníkov',
		title: 'Štatistiky účastníkov',
		preparingData: 'Pripravujú sa údaje grafu...',
		preparing: 'Pripravuje sa graf...',
		dataType: 'Typ údajov:',
		area: 'Oblasť:',
		filter: 'Filter:',
		residence: 'Bydlisko',
		nationality: 'Národnosť',
		all: 'Všetko',
		currentExtent: 'Aktuálny výrez',
		excludeJapan: 'Vylúčiť japonských účastníkov',
		tabChart: 'Graf',
		tabTable: 'Tabuľka',
		noData: 'V tomto rozsahu nie sú žiadne údaje',
		topN: (n, kind) => `${kind}: top ${n}`,
		xAxis: (kind) => `Os X: ${kind}`,
		byCountry: (n) => `Podľa krajiny (top ${n})`,
		byRegion: 'Podľa regiónu',
		share: 'Podiel účastníkov',
		attendeesLabel: 'Účastníci',
		attendeesCount: (n) => `${n} účastníkov`,
		selectedAttendees: (n) => `Účastníci: ${n}`,
		others: 'Ostatné'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Zoradené podľa: ${key} (${direction === 'desc' ? 'zostupne' : 'vzostupne'}): ${rows} ${riadok(rows)}`,
		sortKeyName: 'názov',
		sortKeyCount: 'počet účastníkov',
		sortKeyCountry: 'krajina',
		sortKeyRegion: 'región',
		headResidence: 'Bydlisko',
		headNationality: 'Národnosť',
		headAttendees: 'Účastníci',
		headCountry: 'Krajina',
		headRegion: 'Región',
		total: 'Spolu'
	}
};

export default sk;
