import type { Messages } from './en';
import { plural } from '../plural';

/** Polish has four plural forms, so counted nouns go through `plural()`. */
const uczestnik = (n: number) =>
	plural('pl', n, { one: 'uczestnik', few: 'uczestników', many: 'uczestników' });
const jezyk = (n: number) => plural('pl', n, { one: 'język', few: 'języki', many: 'języków' });
const wiersz = (n: number) => plural('pl', n, { one: 'wiersz', few: 'wiersze', many: 'wierszy' });

const pl: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Statystyki uczestników',
		description:
			'Interaktywna wizualizacja mapowa miejsc zamieszkania i narodowości uczestników konferencji FOSS4G Hiroshima 2026.'
	},
	header: {
		siteName: 'Statystyki uczestników',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'Repozytorium GitHub',
		language: 'Zmień język',
		theme: 'Zmień motyw'
	},
	theme: {
		light: 'Jasny',
		dark: 'Ciemny',
		system: 'Systemowy'
	},
	language: {
		contribute: 'Pomóż poprawić jakość tłumaczenia',
		title: 'Wybierz język',
		description:
			'Języki są uporządkowane według liczby uczestników posiadających narodowość, w której dany język jest urzędowy. Szukaj według nazwy języka lub kraju.',
		search: 'Szukaj języków',
		searchPlaceholder: 'Język lub kraj…',
		noResults: 'Żaden język nie pasuje do wyszukiwania',
		resultCount: (n) => `Dostępne ${n} ${jezyk(n)}`,
		attendees: (n) => `${n} ${uczestnik(n)}`
	},
	map: {
		loading: 'Wczytywanie...',
		venueName: 'Miejsce FOSS4G 2026',
		venueAddress: 'Międzynarodowe Centrum Konferencyjne w Hiroszimie',
		register: 'Dołącz do FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Warstwy',
		close: 'Zamknij panel warstw',
		show: 'Pokaż panel warstw',
		residence: 'Skąd pochodzą uczestnicy',
		nationality: 'Jaką narodowość mają uczestnicy',
		attendees: (n) => `${n} ${uczestnik(n)}`,
		places: (n, layer) =>
			`z ${n} ${
				layer === 'residence'
					? plural('pl', n, { one: 'lokalizacji', few: 'lokalizacji', many: 'lokalizacji' })
					: plural('pl', n, { one: 'narodowości', few: 'narodowości', many: 'narodowości' })
			}`,
		asOf: (date) => `Stan na ${date}`,
		about: 'O danych uczestników',
		aboutText:
			'Dane pochodzą z odpowiedzi zarejestrowanych uczestników na nieobowiązkowe pytania o miasto i kraj zamieszkania oraz narodowość.'
	},
	chart: {
		show: 'Pokaż wykres statystyk uczestników',
		title: 'Statystyki uczestników',
		preparing: 'Przygotowywanie wykresu...',
		area: 'Obszar',
		residence: 'Miejsce zamieszkania',
		nationality: 'Narodowość',
		all: 'Wszystko',
		currentExtent: 'Bieżący widok',
		excludeJapan: 'Wyklucz uczestników z Japonii',
		tabChart: 'Wykres',
		tabTable: 'Tabela',
		noData: 'Brak danych w tym zakresie',
		topN: (n, kind) => `${kind}: top ${n}`,
		xAxis: (kind) => `Oś X: ${kind}`,
		byCountry: (n) => `Według kraju (top ${n})`,
		byRegion: 'Według regionu',
		share: 'Udział uczestników',
		attendeesLabel: 'Uczestnicy',
		attendeesCount: (n) => `${n} uczestników`,
		selectedAttendees: (n) => `Uczestnicy: ${n}`,
		others: 'Pozostałe',
		editions: {
			tab: 'Edycje',
			title: 'Uczestnictwo według edycji',
			splitDesc: 'Udział rejestracji',
			inPersonOnly: 'Na miejscu',
			includeOnline: 'Uwzględnij online',
			hostCountry: 'Kraj gospodarza',
			international: 'Zagranica',
			cancelled: 'Odwołana',
			shareLabel: 'Udział',
			unknown: 'Bez podziału',
			noBreakdown: 'Niektóre edycje nie mają danych szczegółowych.',
			partialSplit: 'Podział obejmuje tylko część łącznej liczby',
			source: 'Źródło: dane roczne FOSS4G',
			table: {
				edition: 'Edycja',
				registrations: 'Zarejestrowani',
				inPerson: 'Na miejscu',
				online: 'Online',
				hostShare: 'Udział kraju goszczącego',
				status: 'Status'
			}
		}
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Posortowano według: ${key} (${direction === 'desc' ? 'malejąco' : 'rosnąco'}): ${rows} ${wiersz(rows)}`,
		sortKeyName: 'nazwa',
		sortKeyCount: 'liczba uczestników',
		sortKeyCountry: 'kraj',
		sortKeyRegion: 'region',
		headResidence: 'Miejsce zamieszkania',
		headNationality: 'Narodowość',
		headAttendees: 'Uczestnicy',
		headCountry: 'Kraj',
		headRegion: 'Region',
		total: 'Razem'
	},
	region: {
		eastAsiaPacific: 'Azja Wschodnia i Pacyfik',
		europeCentralAsia: 'Europa i Azja Środkowa',
		latinAmericaCaribbean: 'Ameryka Łacińska i Karaiby',
		middleEastNorthAfrica: 'Bliski Wschód i Afryka Północna',
		northAmerica: 'Ameryka Północna',
		southAsia: 'Azja Południowa',
		subSaharanAfrica: 'Afryka Subsaharyjska'
	}
};

export default pl;
