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
		language: 'Cambia lingua'
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
		preparingData: 'Preparazione dei dati del grafico…',
		preparing: 'Preparazione del grafico…',
		dataType: 'Tipo di dati:',
		area: 'Area:',
		filter: 'Filtro:',
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
		others: 'Altri'
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
	}
};

export default it;
