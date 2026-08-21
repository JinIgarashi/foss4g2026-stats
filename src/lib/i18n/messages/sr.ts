import type { Messages } from './en';
import { plural } from '../plural';

/** Serbian has three plural forms, so counted nouns go through `plural()`. */
const ucesnik = (n: number) =>
	plural('sr', n, { one: 'учесник', few: 'учесника', other: 'учесника' });
const jezik = (n: number) => plural('sr', n, { one: 'језик', few: 'језика', other: 'језика' });
const red = (n: number) => plural('sr', n, { one: 'ред', few: 'реда', other: 'редова' });

const sr: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Статистика учесника',
		description:
			'Интерактивна картографска визуализација места становања и држављанстава учесника конференције FOSS4G Hiroshima 2026.'
	},
	header: {
		siteName: 'Статистика учесника',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'GitHub репозиторијум',
		language: 'Промени језик',
		theme: 'Промени тему'
	},
	theme: {
		light: 'Светла',
		dark: 'Тамна',
		system: 'Системска'
	},
	language: {
		contribute: 'Допринесите побољшању квалитета превода',
		title: 'Изаберите језик',
		description:
			'Језици су поређани према броју учесника са држављанством у ком је тај језик службени. Претражујте по називу језика или државе.',
		search: 'Претражи језике',
		searchPlaceholder: 'Језик или држава…',
		noResults: 'Ниједан језик не одговара претрази',
		resultCount: (n) => `Доступно ${n} ${jezik(n)}`,
		attendees: (n) => `${n} ${ucesnik(n)}`
	},
	map: {
		loading: 'Учитавање...',
		venueName: 'Место одржавања FOSS4G 2026',
		venueAddress: 'Међународни конгресни центар Хирошима',
		register: 'Придружите се FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Слојеви',
		close: 'Затвори панел слојева',
		show: 'Прикажи контролу слојева',
		residence: 'Одакле учесници долазе',
		nationality: 'Које држављанство учесници имају',
		attendees: (n) => `${n} ${ucesnik(n)}`,
		places: (n, layer) => `из ${n} ${layer === 'residence' ? 'места' : 'држављанстава'}`,
		asOf: (date) => `Стање на дан ${date}`,
		about: 'О подацима о учесницима',
		aboutText:
			'Подаци се заснивају на одговорима пријављених учесника на необавезна питања о њиховом граду и држави, као и о држављанству.'
	},
	chart: {
		show: 'Прикажи графикон статистике учесника',
		title: 'Статистика учесника',
		preparing: 'Припрема графикона...',
		area: 'Област',
		residence: 'Место становања',
		nationality: 'Држављанство',
		all: 'Све',
		currentExtent: 'Тренутни приказ',
		excludeJapan: 'Изузми учеснике из Јапана',
		tabChart: 'Графикон',
		tabTable: 'Табела',
		noData: 'У овом опсегу нема података',
		topN: (n, kind) => `${kind}: најбољих ${n}`,
		xAxis: (kind) => `X оса: ${kind}`,
		byCountry: (n) => `По држави (најбољих ${n})`,
		byRegion: 'По региону',
		share: 'Удео учесника',
		attendeesLabel: 'Учесници',
		attendeesCount: (n) => `${n} учесника`,
		selectedAttendees: (n) => `Учесници: ${n}`,
		others: 'Остало',
		editions: {
			tab: 'Издања',
			title: 'Учешће по издању',
			splitDesc: 'Удео пријава',
			inPersonOnly: 'Уживо',
			includeOnline: 'Укључи онлајн',
			hostCountry: 'Земља домаћин',
			international: 'Иностранство',
			cancelled: 'Отказано',
			shareLabel: 'Удео',
			unknown: 'Без расподеле',
			noBreakdown: 'За нека издања нема детаљних података.',
			partialSplit: 'Расподела обухвата само део укупног броја',
			source: 'Извор: годишњи подаци FOSS4G-а',
			table: {
				edition: 'Издање',
				registrations: 'Регистровани',
				inPerson: 'Уживо',
				online: 'Онлајн',
				hostShare: 'Удео земље домаћина',
				status: 'Статус'
			}
		}
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Сортирано по: ${key} (${direction === 'desc' ? 'опадајуће' : 'растуће'}): ${rows} ${red(rows)}`,
		sortKeyName: 'назив',
		sortKeyCount: 'број учесника',
		sortKeyCountry: 'држава',
		sortKeyRegion: 'регион',
		headResidence: 'Место становања',
		headNationality: 'Држављанство',
		headAttendees: 'Учесници',
		headCountry: 'Држава',
		headRegion: 'Регион',
		total: 'Укупно'
	},
	region: {
		eastAsiaPacific: 'Источна Азија и Пацифик',
		europeCentralAsia: 'Европа и Централна Азија',
		latinAmericaCaribbean: 'Латинска Америка и Кариби',
		middleEastNorthAfrica: 'Блиски исток и Северна Африка',
		northAmerica: 'Северна Америка',
		southAsia: 'Јужна Азија',
		subSaharanAfrica: 'Подсахарска Африка'
	}
};

export default sr;
