import type { Messages } from './en';
import { plural } from '../plural';

/**
 * Icelandic keeps the singular for every number ending in 1 except 11
 * (21 þátttakandi, 111 þátttakendur), so the counts go through `plural()`
 * rather than a `n === 1` ternary.
 */
const thatttakandi = (n: number) => plural('is', n, { one: 'þátttakandi', other: 'þátttakendur' });
/** Dative, governed by `frá`. */
const stad = (n: number) => plural('is', n, { one: 'stað', other: 'stöðum' });
const thjoderni = (n: number) => plural('is', n, { one: 'þjóðerni', other: 'þjóðernum' });
const rod = (n: number) => plural('is', n, { one: 'röð', other: 'raðir' });

const is: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Tölfræði þátttakenda',
		description:
			'Gagnvirk kortasjá sem sýnir búsetu og þjóðerni þátttakenda á ráðstefnunni FOSS4G Hiroshima 2026.'
	},
	header: {
		siteName: 'Tölfræði þátttakenda',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'GitHub-geymsla',
		language: 'Skipta um tungumál',
		theme: 'Skipta um þema'
	},
	theme: {
		light: 'Ljóst',
		dark: 'Dökkt',
		system: 'Kerfisstilling'
	},
	language: {
		contribute: 'Hjálpaðu til við að bæta gæði þýðingarinnar',
		title: 'Veldu tungumál',
		description:
			'Tungumálunum er raðað eftir því hversu margir þátttakendur hafa þjóðerni þar sem tungumálið er opinbert. Leitaðu eftir heiti tungumáls eða lands.',
		search: 'Leita að tungumáli',
		searchPlaceholder: 'Tungumál eða land…',
		noResults: 'Ekkert tungumál passar við leitina',
		resultCount: (n) => `${n} tungumál í boði`,
		attendees: (n) => `${n} ${thatttakandi(n)}`
	},
	map: {
		loading: 'Hleð...',
		venueName: 'Ráðstefnustaður FOSS4G 2026',
		venueAddress: 'Alþjóðlega ráðstefnumiðstöðin í Hiroshima',
		register: 'Taktu þátt í FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Lög',
		close: 'Loka lagaspjaldinu',
		show: 'Sýna lagastýringu',
		residence: 'Hvaðan þátttakendur koma',
		nationality: 'Hvaða þjóðerni þátttakendur hafa',
		attendees: (n) => `${n} ${thatttakandi(n)}`,
		places: (n, layer) => `frá ${n} ${layer === 'residence' ? stad(n) : thjoderni(n)}`,
		asOf: (date) => `Miðað við ${date}`,
		about: 'Um gögn þátttakenda',
		aboutText:
			'Þessi gögn byggja á svörum skráðra þátttakenda við valfrjálsum spurningum um borg, land og þjóðerni.'
	},
	chart: {
		show: 'Sýna tölfræðirit þátttakenda',
		title: 'Tölfræði þátttakenda',
		preparing: 'Undirbý ritið...',
		area: 'Svæði',
		residence: 'Búseta',
		nationality: 'Þjóðerni',
		all: 'Allt',
		currentExtent: 'Núverandi sýn',
		excludeJapan: 'Sleppa japönskum þátttakendum',
		tabChart: 'Rit',
		tabTable: 'Tafla',
		noData: 'Engin gögn á þessu bili',
		topN: (n, kind) => `Efstu ${n} – ${kind}`,
		xAxis: (kind) => `X-ás: ${kind}`,
		byCountry: (n) => `Eftir landi (efstu ${n})`,
		byRegion: 'Eftir svæði',
		share: 'Hlutfall þátttakenda',
		attendeesLabel: 'Þátttakendur',
		attendeesCount: (n) => `${n} þátttakendur`,
		selectedAttendees: (n) => `Þátttakendur: ${n}`,
		others: 'Annað',
		editions: {
			tab: 'Ráðstefnur',
			title: 'Þátttaka eftir ráðstefnu',
			splitDesc: 'Hlutfall skráninga',
			inPersonOnly: 'Á staðnum',
			includeOnline: 'Telja netþátttöku með',
			hostCountry: 'Gestgjafaland',
			international: 'Útlönd',
			cancelled: 'Aflýst',
			shareLabel: 'Hlutfall',
			unknown: 'Ósundurliðað',
			noBreakdown: 'Sumar ráðstefnur hafa engin sundurliðuð gögn.',
			partialSplit: 'Sundurliðunin nær aðeins yfir hluta heildarinnar',
			source: 'Heimild: árlegar FOSS4G-tölur',
			table: {
				edition: 'Ráðstefna',
				registrations: 'Skráðir',
				inPerson: 'Á staðnum',
				online: 'Á neti',
				hostShare: 'Hlutfall gestgjafalands',
				status: 'Staða'
			}
		}
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Raðað eftir ${key} (${direction === 'desc' ? 'lækkandi' : 'hækkandi'}): ${rows} ${rod(rows)}`,
		sortKeyName: 'nafni',
		sortKeyCount: 'fjölda þátttakenda',
		sortKeyCountry: 'landi',
		sortKeyRegion: 'svæði',
		headResidence: 'Búseta',
		headNationality: 'Þjóðerni',
		headAttendees: 'Þátttakendur',
		headCountry: 'Land',
		headRegion: 'Svæði',
		total: 'Samtals'
	},
	region: {
		eastAsiaPacific: 'Austur-Asía og Kyrrahaf',
		europeCentralAsia: 'Evrópa og Mið-Asía',
		latinAmericaCaribbean: 'Rómanska Ameríka og Karíbahaf',
		middleEastNorthAfrica: 'Mið-Austurlönd og Norður-Afríka',
		northAmerica: 'Norður-Ameríka',
		southAsia: 'Suður-Asía',
		subSaharanAfrica: 'Afríka sunnan Sahara'
	}
};

export default is;
