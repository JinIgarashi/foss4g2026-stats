import type { Messages } from './en';
import { plural } from '../plural';

/** Ukrainian has four plural forms, so counted nouns go through `plural()`. */
const uchasnyk = (n: number) =>
	plural('uk', n, { one: 'учасник', few: 'учасники', many: 'учасників' });
const mova = (n: number) => plural('uk', n, { one: 'мова', few: 'мови', many: 'мов' });
const ryadok = (n: number) => plural('uk', n, { one: 'рядок', few: 'рядки', many: 'рядків' });

const uk: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Статистика учасників',
		description:
			'Інтерактивна карта місць проживання та громадянства учасників конференції FOSS4G Hiroshima 2026.'
	},
	header: {
		siteName: 'Статистика учасників',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'Репозиторій GitHub',
		language: 'Змінити мову',
		theme: 'Змінити тему'
	},
	theme: {
		light: 'Світла',
		dark: 'Темна',
		system: 'Системна'
	},
	language: {
		contribute: 'Допоможіть покращити якість перекладу',
		title: 'Оберіть мову',
		description:
			'Мови впорядковано за кількістю учасників, які мають громадянство країни, де ця мова є офіційною. Шукайте за назвою мови або країни.',
		search: 'Пошук мов',
		searchPlaceholder: 'Мова або країна…',
		noResults: 'Жодна мова не відповідає пошуку',
		resultCount: (n) => `Доступно ${n} ${mova(n)}`,
		attendees: (n) => `${n} ${uchasnyk(n)}`
	},
	map: {
		loading: 'Завантаження...',
		venueName: 'Майданчик FOSS4G 2026',
		venueAddress: 'Міжнародний конференц-центр Хіросіми',
		register: 'Долучайтеся до FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Шари',
		close: 'Закрити панель шарів',
		show: 'Показати керування шарами',
		residence: 'Звідки приїздять учасники',
		nationality: 'Яке громадянство мають учасники',
		attendees: (n) => `${n} ${uchasnyk(n)}`,
		places: (n, layer) =>
			`з ${n} ${
				layer === 'residence'
					? plural('uk', n, { one: 'місця', few: 'місць', many: 'місць' })
					: plural('uk', n, { one: 'громадянства', few: 'громадянств', many: 'громадянств' })
			}`,
		asOf: (date) => `Станом на ${date}`,
		about: 'Про дані учасників',
		aboutText:
			'Дані ґрунтуються на відповідях зареєстрованих учасників на необов’язкові запитання про місто та країну проживання й громадянство.'
	},
	chart: {
		show: 'Показати діаграму статистики учасників',
		title: 'Статистика учасників',
		preparing: 'Підготовка діаграми...',
		area: 'Область',
		residence: 'Місце проживання',
		nationality: 'Громадянство',
		all: 'Усі',
		currentExtent: 'Поточна область',
		excludeJapan: 'Виключити учасників з Японії',
		tabChart: 'Діаграма',
		tabTable: 'Таблиця',
		noData: 'У цьому діапазоні немає даних',
		topN: (n, kind) => `${kind}: топ-${n}`,
		xAxis: (kind) => `Вісь X: ${kind}`,
		byCountry: (n) => `За країнами (топ-${n})`,
		byRegion: 'За регіонами',
		share: 'Частка учасників',
		attendeesLabel: 'Учасники',
		attendeesCount: (n) => `${n} учасників`,
		selectedAttendees: (n) => `Учасники: ${n}`,
		others: 'Інші',
		editions: {
			tab: 'Конференції',
			title: 'Учасники за роками',
			splitDesc: 'Частка реєстрацій',
			inPersonOnly: 'Очно',
			includeOnline: 'Враховувати онлайн',
			hostCountry: 'Країна проведення',
			international: 'Закордон',
			cancelled: 'Скасовано',
			shareLabel: 'Частка',
			unknown: 'Без розподілу',
			noBreakdown: 'Для деяких конференцій немає докладних даних.',
			partialSplit: 'Розподіл охоплює лише частину загальної кількості',
			source: 'Джерело: річна статистика FOSS4G',
			table: {
				edition: 'Конференція',
				registrations: 'Зареєстровано',
				inPerson: 'Очно',
				online: 'Онлайн',
				hostShare: 'Частка країни-господаря',
				status: 'Статус'
			}
		}
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Сортування за: ${key} (${direction === 'desc' ? 'за спаданням' : 'за зростанням'}): ${rows} ${ryadok(rows)}`,
		sortKeyName: 'назва',
		sortKeyCount: 'кількість учасників',
		sortKeyCountry: 'країна',
		sortKeyRegion: 'регіон',
		headResidence: 'Місце проживання',
		headNationality: 'Громадянство',
		headAttendees: 'Учасники',
		headCountry: 'Країна',
		headRegion: 'Регіон',
		total: 'Разом'
	},
	region: {
		eastAsiaPacific: 'Східна Азія та Тихоокеанський регіон',
		europeCentralAsia: 'Європа та Центральна Азія',
		latinAmericaCaribbean: 'Латинська Америка та Карибський басейн',
		middleEastNorthAfrica: 'Близький Схід та Північна Африка',
		northAmerica: 'Північна Америка',
		southAsia: 'Південна Азія',
		subSaharanAfrica: 'Африка на південь від Сахари'
	}
};

export default uk;
