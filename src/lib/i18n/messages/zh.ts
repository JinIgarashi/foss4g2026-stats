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
	language: {
		contribute: '参与改进翻译质量',
		title: '选择语言',
		description: '语言按以该语言为官方语言的国籍参加者人数从多到少排列。可按语言或国家名称搜索。',
		search: '搜索语言',
		searchPlaceholder: '语言或国家…',
		noResults: '没有符合搜索条件的语言',
		resultCount: (n) => `共 ${n} 种语言`,
		attendees: (n) => `${n} 位参加者`
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
		preparing: '正在准备图表…',
		area: '范围',
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
		others: '其他',
		editions: {
			tab: '历届大会',
			title: '各届参会人数与构成',
			splitDesc: '注册人数占比',
			inPersonOnly: '仅线下',
			includeOnline: '包含线上',
			hostCountry: '主办国',
			international: '海外',
			cancelled: '已取消',
			shareLabel: '比例',
			unknown: '无细分',
			noBreakdown: '部分届次没有明细数据。',
			partialSplit: '细分仅涵盖总数的一部分',
			source: '来源：FOSS4G 历年统计数据',
			table: {
				edition: '大会',
				registrations: '报名人数',
				inPerson: '线下',
				online: '线上',
				hostShare: '主办国比例',
				status: '状态'
			}
		}
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
	},
	region: {
		eastAsiaPacific: '东亚与太平洋地区',
		europeCentralAsia: '欧洲与中亚',
		latinAmericaCaribbean: '拉丁美洲与加勒比地区',
		middleEastNorthAfrica: '中东与北非',
		northAmerica: '北美洲',
		southAsia: '南亚',
		subSaharanAfrica: '撒哈拉以南非洲'
	}
};

export default zh;
