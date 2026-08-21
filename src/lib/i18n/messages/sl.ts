import type { Messages } from './en';
import { plural } from '../plural';

/** Slovene has four plural forms including a dual, so counted nouns go through `plural()`. */
const udelezenec = (n: number) =>
	plural('sl', n, {
		one: 'udeleženec',
		two: 'udeleženca',
		few: 'udeleženci',
		other: 'udeležencev'
	});
const jezik = (n: number) =>
	plural('sl', n, { one: 'jezik', two: 'jezika', few: 'jeziki', other: 'jezikov' });
const vrstica = (n: number) =>
	plural('sl', n, { one: 'vrstica', two: 'vrstici', few: 'vrstice', other: 'vrstic' });

const sl: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Statistika udeležencev',
		description:
			'Interaktivna zemljevidna vizualizacija krajev bivanja in državljanstev udeležencev konference FOSS4G Hiroshima 2026.'
	},
	header: {
		siteName: 'Statistika udeležencev',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'Repozitorij GitHub',
		language: 'Spremeni jezik',
		theme: 'Spremeni temo'
	},
	theme: {
		light: 'Svetla',
		dark: 'Temna',
		system: 'Sistemska'
	},
	language: {
		contribute: 'Prispevajte k izboljšanju kakovosti prevoda',
		title: 'Izberite jezik',
		description:
			'Jeziki so razvrščeni po številu udeležencev z državljanstvom, v katerem je ta jezik uraden. Iščite po imenu jezika ali države.',
		search: 'Iskanje jezikov',
		searchPlaceholder: 'Jezik ali država…',
		noResults: 'Nobenega jezika ni, ki bi ustrezal iskanju',
		resultCount: (n) => `Na voljo ${n} ${jezik(n)}`,
		attendees: (n) => `${n} ${udelezenec(n)}`
	},
	map: {
		loading: 'Nalaganje...',
		venueName: 'Prizorišče FOSS4G 2026',
		venueAddress: 'Mednarodni konferenčni center Hirošima',
		register: 'Pridružite se FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Sloji',
		close: 'Zapri ploščo slojev',
		show: 'Prikaži upravljanje slojev',
		residence: 'Od kod prihajajo udeleženci',
		nationality: 'Kakšno državljanstvo imajo udeleženci',
		attendees: (n) => `${n} ${udelezenec(n)}`,
		places: (n, layer) => `iz ${n} ${layer === 'residence' ? 'krajev' : 'državljanstev'}`,
		asOf: (date) => `Stanje na ${date}`,
		about: 'O podatkih o udeležencih',
		aboutText:
			'Podatki temeljijo na odgovorih prijavljenih udeležencev na neobvezna vprašanja o njihovem mestu in državi ter državljanstvu.'
	},
	chart: {
		show: 'Prikaži graf statistike udeležencev',
		title: 'Statistika udeležencev',
		preparing: 'Pripravljanje grafa...',
		area: 'Območje',
		residence: 'Kraj bivanja',
		nationality: 'Državljanstvo',
		all: 'Vse',
		currentExtent: 'Trenutni izsek',
		excludeJapan: 'Izključi japonske udeležence',
		tabChart: 'Graf',
		tabTable: 'Tabela',
		noData: 'V tem obsegu ni podatkov',
		topN: (n, kind) => `${kind}: najboljših ${n}`,
		xAxis: (kind) => `Os X: ${kind}`,
		byCountry: (n) => `Po državi (najboljših ${n})`,
		byRegion: 'Po regiji',
		share: 'Delež udeležencev',
		attendeesLabel: 'Udeleženci',
		attendeesCount: (n) => `${n} udeležencev`,
		selectedAttendees: (n) => `Udeleženci: ${n}`,
		others: 'Drugo',
		editions: {
			tab: 'Izdaje',
			title: 'Udeležba po izdajah',
			splitDesc: 'Delež prijav',
			inPersonOnly: 'V živo',
			includeOnline: 'Vključi splet',
			hostCountry: 'Država gostiteljica',
			international: 'Tujina',
			cancelled: 'Odpovedano',
			shareLabel: 'Delež',
			unknown: 'Ni razčlenjeno',
			noBreakdown: 'Za nekatere izdaje ni podrobnih podatkov.',
			partialSplit: 'Razčlenitev zajema le del celote',
			source: 'Vir: letni podatki FOSS4G',
			table: {
				edition: 'Izdaja',
				registrations: 'Prijavljeni',
				inPerson: 'V živo',
				online: 'Splet',
				hostShare: 'Delež države gostiteljice',
				status: 'Stanje'
			}
		}
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Razvrščeno po: ${key} (${direction === 'desc' ? 'padajoče' : 'naraščajoče'}): ${rows} ${vrstica(rows)}`,
		sortKeyName: 'ime',
		sortKeyCount: 'število udeležencev',
		sortKeyCountry: 'država',
		sortKeyRegion: 'regija',
		headResidence: 'Kraj bivanja',
		headNationality: 'Državljanstvo',
		headAttendees: 'Udeleženci',
		headCountry: 'Država',
		headRegion: 'Regija',
		total: 'Skupaj'
	},
	region: {
		eastAsiaPacific: 'Vzhodna Azija in Pacifik',
		europeCentralAsia: 'Evropa in Srednja Azija',
		latinAmericaCaribbean: 'Latinska Amerika in Karibi',
		middleEastNorthAfrica: 'Bližnji vzhod in Severna Afrika',
		northAmerica: 'Severna Amerika',
		southAsia: 'Južna Azija',
		subSaharanAfrica: 'Podsaharska Afrika'
	}
};

export default sl;
