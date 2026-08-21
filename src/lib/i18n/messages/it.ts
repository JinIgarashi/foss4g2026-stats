import type { Messages } from './en';

const it: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Statistiche dei partecipanti',
		description:
			'Visualizzazione cartografica interattiva della residenza e della nazionalità dei partecipanti alla conferenza FOSS4G Hiroshima 2026.'
	},
	header: {
		siteName: 'Statistiche dei partecipanti',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'Repository GitHub',
		language: 'Cambia lingua',
		theme: 'Cambia tema'
	},
	theme: {
		light: 'Chiaro',
		dark: 'Scuro',
		system: 'Sistema'
	},
	language: {
		contribute: 'Contribuisci a migliorare la qualità della traduzione',
		title: 'Scegli la lingua',
		description:
			'Le lingue sono ordinate in base al numero di partecipanti la cui nazionalità ha quella lingua come ufficiale. Cerca per lingua o per paese.',
		search: 'Cerca lingue',
		searchPlaceholder: 'Lingua o paese…',
		noResults: 'Nessuna lingua corrisponde alla ricerca',
		resultCount: (n) => `${n} lingu${n === 1 ? 'a disponibile' : 'e disponibili'}`,
		attendees: (n) => `${n} partecipant${n === 1 ? 'e' : 'i'}`
	},
	map: {
		loading: 'Caricamento…',
		venueName: 'Sede del FOSS4G 2026',
		venueAddress: 'Centro Congressi Internazionale di Hiroshima',
		register: 'Partecipa a FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Livelli',
		close: 'Chiudi il pannello dei livelli',
		show: 'Mostra il controllo dei livelli',
		residence: 'Da dove vengono i partecipanti',
		nationality: 'Che nazionalità hanno i partecipanti',
		attendees: (n) => `${n} partecipanti`,
		places: (n, layer) => `da ${n} ${layer === 'residence' ? 'località' : 'nazionalità'}`,
		asOf: (date) => `Dati al ${date}`,
		about: 'Informazioni sui dati dei partecipanti',
		aboutText:
			'Questi dati si basano sulle risposte fornite dalle persone iscritte a domande facoltative sulla loro città, sul loro Paese e sulla loro nazionalità.'
	},
	chart: {
		show: 'Mostra il grafico delle statistiche',
		title: 'Statistiche dei partecipanti',
		preparing: 'Preparazione del grafico…',
		area: 'Area',
		residence: 'Residenza',
		nationality: 'Nazionalità',
		all: 'Tutti',
		currentExtent: 'Area visualizzata',
		excludeJapan: 'Escludi i partecipanti giapponesi',
		tabChart: 'Grafico',
		tabTable: 'Tabella',
		noData: 'Nessun dato disponibile in questo intervallo',
		topN: (n, kind) => `Top ${n} — ${kind}`,
		xAxis: (kind) => `Asse X: ${kind}`,
		byCountry: (n) => `Per Paese (Top ${n})`,
		byRegion: 'Per regione',
		share: 'Quota di partecipanti',
		attendeesLabel: 'Partecipanti',
		attendeesCount: (n) => `${n} partecipanti`,
		selectedAttendees: (n) => `Partecipanti: ${n}`,
		others: 'Altri',
		editions: {
			tab: 'Edizioni',
			title: 'Partecipazione per edizione',
			splitDesc: 'Quota di iscrizioni',
			inPersonOnly: 'In presenza',
			includeOnline: 'Includi online',
			hostCountry: 'Paese ospitante',
			international: 'Internazionale',
			cancelled: 'Annullata',
			shareLabel: 'Quota',
			unknown: 'Non suddiviso',
			noBreakdown: 'Alcune edizioni non hanno dati dettagliati.',
			partialSplit: 'La suddivisione copre solo una parte del totale',
			source: 'Fonte: dati annuali FOSS4G',
			table: {
				edition: 'Edizione',
				registrations: 'Iscritti',
				inPerson: 'In presenza',
				online: 'Online',
				hostShare: 'Quota del paese ospitante',
				status: 'Stato'
			}
		}
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Ordinato per ${key} (${direction === 'desc' ? 'decrescente' : 'crescente'}): ${rows} righe`,
		sortKeyName: 'nome',
		sortKeyCount: 'numero di partecipanti',
		sortKeyCountry: 'Paese',
		sortKeyRegion: 'regione',
		headResidence: 'Residenza',
		headNationality: 'Nazionalità',
		headAttendees: 'Partecipanti',
		headCountry: 'Paese',
		headRegion: 'Regione',
		total: 'Totale'
	},
	region: {
		eastAsiaPacific: 'Asia orientale e Pacifico',
		europeCentralAsia: 'Europa e Asia centrale',
		latinAmericaCaribbean: 'America Latina e Caraibi',
		middleEastNorthAfrica: 'Medio Oriente e Nord Africa',
		northAmerica: 'America del Nord',
		southAsia: 'Asia meridionale',
		subSaharanAfrica: 'Africa subsahariana'
	}
};

export default it;
