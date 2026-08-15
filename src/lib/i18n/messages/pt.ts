import type { Messages } from './en';

const pt: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Estatísticas de participantes',
		description:
			'Mapa interativo com a localização e a nacionalidade dos participantes da conferência FOSS4G Hiroshima 2026.'
	},
	header: {
		siteName: 'Estatísticas de participantes',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'Repositório no GitHub',
		language: 'Alterar idioma',
		theme: 'Alterar tema'
	},
	theme: {
		light: 'Claro',
		dark: 'Escuro',
		system: 'Sistema'
	},
	map: {
		loading: 'Carregando...',
		venueName: 'Local do FOSS4G 2026',
		venueAddress: 'Centro Internacional de Convenções de Hiroshima',
		register: 'Participe do FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Camadas',
		close: 'Fechar painel de camadas',
		show: 'Mostrar controle de camadas',
		residence: 'De onde vêm os participantes',
		nationality: 'Qual a nacionalidade dos participantes',
		attendees: (n) => `${n} participantes`,
		places: (n, layer) => `de ${n} ${layer === 'residence' ? 'localidades' : 'nacionalidades'}`,
		asOf: (date) => `Dados de ${date}`,
		about: 'Sobre os dados dos participantes',
		aboutText:
			'Estes dados baseiam-se nas respostas dos participantes inscritos a perguntas opcionais sobre cidade, país e nacionalidade.'
	},
	chart: {
		show: 'Mostrar gráfico de estatísticas',
		title: 'Estatísticas de participantes',
		preparingData: 'Preparando os dados do gráfico...',
		preparing: 'Preparando o gráfico...',
		dataType: 'Tipo de dado:',
		area: 'Área:',
		filter: 'Filtro:',
		residence: 'Residência',
		nationality: 'Nacionalidade',
		all: 'Tudo',
		currentExtent: 'Área visível',
		excludeJapan: 'Excluir participantes japoneses',
		tabChart: 'Gráfico',
		tabTable: 'Tabela',
		noData: 'Nenhum dado disponível nesta área',
		topN: (n, kind) => `Top ${n} — ${kind}`,
		xAxis: (kind) => `Eixo X: ${kind}`,
		byCountry: (n) => `Por país (Top ${n})`,
		byRegion: 'Por região',
		share: 'Participação',
		attendeesLabel: 'Participantes',
		attendeesCount: (n) => `${n} participantes`,
		selectedAttendees: (n) => `Participantes: ${n}`,
		others: 'Outros'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Ordenado por ${key} (${direction === 'desc' ? 'decrescente' : 'crescente'}): ${rows} linhas`,
		sortKeyName: 'nome',
		sortKeyCount: 'número de participantes',
		sortKeyCountry: 'país',
		sortKeyRegion: 'região',
		headResidence: 'Residência',
		headNationality: 'Nacionalidade',
		headAttendees: 'Participantes',
		headCountry: 'País',
		headRegion: 'Região',
		total: 'Total'
	}
};

export default pt;
