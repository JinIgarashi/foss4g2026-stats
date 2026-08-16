import type { Messages } from './en';

const fr: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 – Statistiques des participants',
		description:
			'Visualisation cartographique interactive des lieux de résidence et des nationalités des participants à la conférence FOSS4G Hiroshima 2026.'
	},
	header: {
		siteName: 'Statistiques des participants',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'Dépôt GitHub',
		language: 'Changer de langue',
		theme: 'Changer de thème'
	},
	theme: {
		light: 'Clair',
		dark: 'Sombre',
		system: 'Système'
	},
	language: {
		title: 'Choisissez votre langue',
		description:
			'Les langues sont classées selon le nombre de participants dont la nationalité a cette langue comme langue officielle. Recherchez par langue ou par pays.',
		search: 'Rechercher une langue',
		searchPlaceholder: 'Langue ou pays…',
		noResults: 'Aucune langue ne correspond à votre recherche',
		resultCount: (n) => `${n} langue${n < 2 ? '' : 's'} disponible${n < 2 ? '' : 's'}`,
		attendees: (n) => `${n} participant${n < 2 ? '' : 's'}`
	},
	map: {
		loading: 'Chargement…',
		venueName: 'Lieu du FOSS4G 2026',
		venueAddress: 'Centre international de conférences de Hiroshima',
		register: 'Participer au FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Couches',
		close: 'Fermer le panneau des couches',
		show: 'Afficher le contrôle des couches',
		residence: "D'où viennent les participants",
		nationality: 'Quelle est la nationalité des participants',
		attendees: (n) => `${n} participants`,
		places: (n, layer) => `de ${n} ${layer === 'residence' ? 'localités' : 'nationalités'}`,
		asOf: (date) => `Au ${date}`,
		about: 'À propos des données des participants',
		aboutText:
			'Ces données proviennent des réponses des participants inscrits à des questions facultatives sur leur ville, leur pays et leur nationalité.'
	},
	chart: {
		show: 'Afficher le graphique des statistiques',
		title: 'Statistiques des participants',
		preparingData: 'Préparation des données du graphique…',
		preparing: 'Préparation du graphique…',
		dataType: 'Type de données :',
		area: 'Zone :',
		filter: 'Filtre :',
		residence: 'Résidence',
		nationality: 'Nationalité',
		all: 'Tout',
		currentExtent: 'Emprise actuelle',
		excludeJapan: 'Exclure les participants japonais',
		tabChart: 'Graphique',
		tabTable: 'Tableau',
		noData: 'Aucune donnée disponible dans cette zone',
		topN: (n, kind) => `Top ${n} – ${kind}`,
		xAxis: (kind) => `Axe X : ${kind}`,
		byCountry: (n) => `Par pays (Top ${n})`,
		byRegion: 'Par région',
		share: 'Part des participants',
		attendeesLabel: 'Participants',
		attendeesCount: (n) => `${n} participants`,
		selectedAttendees: (n) => `Participants : ${n}`,
		others: 'Autres'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Trié par ${key} (${direction === 'desc' ? 'décroissant' : 'croissant'}) : ${rows} lignes`,
		sortKeyName: 'nom',
		sortKeyCount: 'nombre de participants',
		sortKeyCountry: 'pays',
		sortKeyRegion: 'région',
		headResidence: 'Résidence',
		headNationality: 'Nationalité',
		headAttendees: 'Participants',
		headCountry: 'Pays',
		headRegion: 'Région',
		total: 'Total'
	}
};

export default fr;
