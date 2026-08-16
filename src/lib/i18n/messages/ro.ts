import type { Messages } from './en';
import { plural } from '../plural';

/** Romanian has three plural forms, so counted nouns go through `plural()`. */
const participant = (n: number) =>
	plural('ro', n, { one: 'participant', few: 'participanți', other: 'de participanți' });
const limba = (n: number) => plural('ro', n, { one: 'limbă', few: 'limbi', other: 'de limbi' });
const rand = (n: number) => plural('ro', n, { one: 'rând', few: 'rânduri', other: 'de rânduri' });

const ro: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Statistici despre participanți',
		description:
			'Vizualizare interactivă pe hartă a locurilor de reședință și a cetățeniilor participanților la conferința FOSS4G Hiroshima 2026.'
	},
	header: {
		siteName: 'Statistici despre participanți',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'Depozit GitHub',
		language: 'Schimbă limba',
		theme: 'Schimbă tema'
	},
	theme: {
		light: 'Luminoasă',
		dark: 'Întunecată',
		system: 'Sistem'
	},
	language: {
		contribute: 'Contribuie la îmbunătățirea calității traducerii',
		title: 'Alege limba',
		description:
			'Limbile sunt ordonate după numărul de participanți care au o cetățenie în care limba respectivă este oficială. Caută după numele limbii sau al țării.',
		search: 'Caută limbi',
		searchPlaceholder: 'Limbă sau țară…',
		noResults: 'Nicio limbă nu corespunde căutării',
		resultCount: (n) => `${n} ${limba(n)} disponibile`,
		attendees: (n) => `${n} ${participant(n)}`
	},
	map: {
		loading: 'Se încarcă...',
		venueName: 'Locația FOSS4G 2026',
		venueAddress: 'Centrul Internațional de Conferințe Hiroshima',
		register: 'Alătură-te FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Straturi',
		close: 'Închide panoul de straturi',
		show: 'Afișează controlul straturilor',
		residence: 'De unde vin participanții',
		nationality: 'Ce cetățenie au participanții',
		attendees: (n) => `${n} ${participant(n)}`,
		places: (n, layer) => `din ${n} ${layer === 'residence' ? 'localități' : 'cetățenii'}`,
		asOf: (date) => `La data de ${date}`,
		about: 'Despre datele participanților',
		aboutText:
			'Datele se bazează pe răspunsurile participanților înregistrați la întrebările opționale despre orașul și țara lor și despre cetățenie.'
	},
	chart: {
		show: 'Afișează graficul statisticilor participanților',
		title: 'Statistici despre participanți',
		preparingData: 'Se pregătesc datele graficului...',
		preparing: 'Se pregătește graficul...',
		dataType: 'Tip de date:',
		area: 'Zonă:',
		filter: 'Filtru:',
		residence: 'Reședință',
		nationality: 'Cetățenie',
		all: 'Toate',
		currentExtent: 'Zona afișată',
		excludeJapan: 'Exclude participanții japonezi',
		tabChart: 'Grafic',
		tabTable: 'Tabel',
		noData: 'Nu există date în acest interval',
		topN: (n, kind) => `Top ${n} ${kind}`,
		xAxis: (kind) => `Axa X: ${kind}`,
		byCountry: (n) => `După țară (top ${n})`,
		byRegion: 'După regiune',
		share: 'Proporția participanților',
		attendeesLabel: 'Participanți',
		attendeesCount: (n) => `${n} participanți`,
		selectedAttendees: (n) => `Participanți: ${n}`,
		others: 'Altele'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Sortat după ${key} (${direction === 'desc' ? 'descrescător' : 'crescător'}): ${rows} ${rand(rows)}`,
		sortKeyName: 'nume',
		sortKeyCount: 'număr de participanți',
		sortKeyCountry: 'țară',
		sortKeyRegion: 'regiune',
		headResidence: 'Reședință',
		headNationality: 'Cetățenie',
		headAttendees: 'Participanți',
		headCountry: 'Țară',
		headRegion: 'Regiune',
		total: 'Total'
	}
};

export default ro;
