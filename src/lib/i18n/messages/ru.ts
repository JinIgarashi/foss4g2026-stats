import type { Messages } from './en';
import { plural } from '../plural';

/** Russian has four plural forms, so counted nouns go through `plural()`. */
const uchastnik = (n: number) =>
	plural('ru', n, { one: 'участник', few: 'участника', many: 'участников' });
const yazyk = (n: number) => plural('ru', n, { one: 'язык', few: 'языка', many: 'языков' });
const stroka = (n: number) => plural('ru', n, { one: 'строка', few: 'строки', many: 'строк' });

const ru: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Статистика участников',
		description:
			'Интерактивная карта мест проживания и гражданства участников конференции FOSS4G Hiroshima 2026.'
	},
	header: {
		siteName: 'Статистика участников',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'Репозиторий GitHub',
		language: 'Сменить язык',
		theme: 'Сменить тему'
	},
	theme: {
		light: 'Светлая',
		dark: 'Тёмная',
		system: 'Системная'
	},
	language: {
		contribute: 'Помогите улучшить качество перевода',
		title: 'Выберите язык',
		description:
			'Языки отсортированы по числу участников с гражданством страны, где этот язык является официальным. Ищите по названию языка или страны.',
		search: 'Поиск языков',
		searchPlaceholder: 'Язык или страна…',
		noResults: 'Ни один язык не соответствует запросу',
		resultCount: (n) => `Доступно ${n} ${yazyk(n)}`,
		attendees: (n) => `${n} ${uchastnik(n)}`
	},
	map: {
		loading: 'Загрузка...',
		venueName: 'Площадка FOSS4G 2026',
		venueAddress: 'Международный конференц-центр Хиросимы',
		register: 'Присоединяйтесь к FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Слои',
		close: 'Закрыть панель слоёв',
		show: 'Показать управление слоями',
		residence: 'Откуда приезжают участники',
		nationality: 'Какое гражданство у участников',
		attendees: (n) => `${n} ${uchastnik(n)}`,
		places: (n, layer) =>
			`из ${n} ${
				layer === 'residence'
					? plural('ru', n, { one: 'места', few: 'мест', many: 'мест' })
					: plural('ru', n, { one: 'гражданства', few: 'гражданств', many: 'гражданств' })
			}`,
		asOf: (date) => `По состоянию на ${date}`,
		about: 'О данных об участниках',
		aboutText:
			'Данные основаны на ответах зарегистрированных участников на необязательные вопросы о городе и стране проживания и о гражданстве.'
	},
	chart: {
		show: 'Показать диаграмму статистики участников',
		title: 'Статистика участников',
		preparingData: 'Подготовка данных диаграммы...',
		preparing: 'Подготовка диаграммы...',
		dataType: 'Тип данных:',
		area: 'Область:',
		filter: 'Фильтр:',
		residence: 'Место проживания',
		nationality: 'Гражданство',
		all: 'Все',
		currentExtent: 'Текущая область',
		excludeJapan: 'Исключить участников из Японии',
		tabChart: 'Диаграмма',
		tabTable: 'Таблица',
		noData: 'В этом диапазоне нет данных',
		topN: (n, kind) => `${kind}: топ-${n}`,
		xAxis: (kind) => `Ось X: ${kind}`,
		byCountry: (n) => `По странам (топ-${n})`,
		byRegion: 'По регионам',
		share: 'Доля участников',
		attendeesLabel: 'Участники',
		attendeesCount: (n) => `${n} участников`,
		selectedAttendees: (n) => `Участники: ${n}`,
		others: 'Прочие'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Сортировка по: ${key} (${direction === 'desc' ? 'по убыванию' : 'по возрастанию'}): ${rows} ${stroka(rows)}`,
		sortKeyName: 'название',
		sortKeyCount: 'число участников',
		sortKeyCountry: 'страна',
		sortKeyRegion: 'регион',
		headResidence: 'Место проживания',
		headNationality: 'Гражданство',
		headAttendees: 'Участники',
		headCountry: 'Страна',
		headRegion: 'Регион',
		total: 'Итого'
	}
};

export default ru;
