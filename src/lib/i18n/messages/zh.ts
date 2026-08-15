import type { Messages } from './en';

const zh: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - 参会者统计',
		description: '以交互式地图展示 FOSS4G Hiroshima 2026 大会参会者的居住地与国籍分布。'
	},
	header: {
		siteName: '参会者统计',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'GitHub 仓库',
		language: '切换语言',
		theme: '切换主题'
	},
	theme: {
		light: '浅色',
		dark: '深色',
		system: '跟随系统'
	},
	map: {
		loading: '加载中…',
		venueName: 'FOSS4G 2026 会场',
		venueAddress: '广岛国际会议中心',
		register: '参加 FOSS4G Hiroshima 2026'
	},
	layers: {
		title: '图层',
		close: '关闭图层面板',
		show: '显示图层控件',
		residence: '参会者来自哪里',
		nationality: '参会者的国籍',
		attendees: (n) => `${n} 位参会者`,
		places: (n, layer) => `来自 ${n} 个${layer === 'residence' ? '地区' : '国籍'}`,
		asOf: (date) => `截至 ${date}`,
		about: '关于参会者数据',
		aboutText: '这些数据来自已注册参会者对城市与国家、国籍等选填问题的回答。'
	},
	chart: {
		show: '显示参会者统计图表',
		title: '参会者统计',
		preparingData: '正在准备图表数据…',
		preparing: '正在准备图表…',
		dataType: '数据类型：',
		area: '范围：',
		filter: '筛选：',
		residence: '居住地',
		nationality: '国籍',
		all: '全部',
		currentExtent: '当前视野范围',
		excludeJapan: '排除日本参会者',
		tabChart: '图表',
		tabTable: '表格',
		noData: '此范围内暂无数据',
		topN: (n, kind) => `${kind}前 ${n} 名`,
		xAxis: (kind) => `X 轴：${kind}`,
		byCountry: (n) => `按国家（前 ${n} 名）`,
		byRegion: '按区域',
		share: '参会者占比',
		attendeesLabel: '参会者',
		attendeesCount: (n) => `${n} 人`,
		selectedAttendees: (n) => `参会者：${n}`,
		others: '其他'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`按${key}${direction === 'desc' ? '降序' : '升序'}排序：${rows} 行`,
		sortKeyName: '名称',
		sortKeyCount: '参会人数',
		sortKeyCountry: '国家',
		sortKeyRegion: '区域',
		headResidence: '居住地',
		headNationality: '国籍',
		headAttendees: '参会人数',
		headCountry: '国家',
		headRegion: '区域',
		total: '合计'
	}
};

export default zh;
