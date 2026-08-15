import type { Messages } from './en';

const es: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Estadísticas de asistentes',
		description:
			'Visualización cartográfica interactiva de la residencia y la nacionalidad de los asistentes a la conferencia FOSS4G Hiroshima 2026.'
	},
	header: {
		siteName: 'Estadísticas de asistentes',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'Repositorio de GitHub',
		language: 'Cambiar idioma',
		theme: 'Cambiar tema'
	},
	theme: {
		light: 'Claro',
		dark: 'Oscuro',
		system: 'Sistema'
	},
	map: {
		loading: 'Cargando…',
		venueName: 'Sede del FOSS4G 2026',
		venueAddress: 'Centro Internacional de Conferencias de Hiroshima',
		register: 'Únete a FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Capas',
		close: 'Cerrar el panel de capas',
		show: 'Mostrar el control de capas',
		residence: 'De dónde vienen los asistentes',
		nationality: 'Qué nacionalidad tienen los asistentes',
		attendees: (n) => `${n} asistentes`,
		places: (n, layer) => `de ${n} ${layer === 'residence' ? 'localidades' : 'nacionalidades'}`,
		asOf: (date) => `Datos del ${date}`,
		about: 'Sobre los datos de asistentes',
		aboutText:
			'Estos datos se basan en las respuestas de las personas inscritas a preguntas opcionales sobre su ciudad, país y nacionalidad.'
	},
	chart: {
		show: 'Mostrar el gráfico de estadísticas',
		title: 'Estadísticas de asistentes',
		preparingData: 'Preparando los datos del gráfico…',
		preparing: 'Preparando el gráfico…',
		dataType: 'Tipo de datos:',
		area: 'Área:',
		filter: 'Filtro:',
		residence: 'Residencia',
		nationality: 'Nacionalidad',
		all: 'Todo',
		currentExtent: 'Extensión actual',
		excludeJapan: 'Excluir a los asistentes japoneses',
		tabChart: 'Gráfico',
		tabTable: 'Tabla',
		noData: 'No hay datos disponibles en este rango',
		topN: (n, kind) => `Top ${n} — ${kind}`,
		xAxis: (kind) => `Eje X: ${kind}`,
		byCountry: (n) => `Por país (Top ${n})`,
		byRegion: 'Por región',
		share: 'Proporción de asistentes',
		attendeesLabel: 'Asistentes',
		attendeesCount: (n) => `${n} asistentes`,
		selectedAttendees: (n) => `Asistentes: ${n}`,
		others: 'Otros'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Ordenado por ${key} (${direction === 'desc' ? 'descendente' : 'ascendente'}): ${rows} filas`,
		sortKeyName: 'nombre',
		sortKeyCount: 'número de asistentes',
		sortKeyCountry: 'país',
		sortKeyRegion: 'región',
		headResidence: 'Residencia',
		headNationality: 'Nacionalidad',
		headAttendees: 'Asistentes',
		headCountry: 'País',
		headRegion: 'Región',
		total: 'Total'
	}
};

export default es;
