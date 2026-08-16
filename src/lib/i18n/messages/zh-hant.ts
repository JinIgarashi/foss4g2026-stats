import type { Messages } from './en';

const zhHant: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - 與會者統計',
		description: 'FOSS4G Hiroshima 2026 研討會與會者居住地與國籍的互動地圖視覺化。'
	},
	header: {
		siteName: '與會者統計',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'GitHub 儲存庫',
		language: '變更語言',
		theme: '變更佈景主題'
	},
	theme: {
		light: '淺色',
		dark: '深色',
		system: '跟隨系統'
	},
	language: {
		contribute: '參與改進翻譯品質',
		title: '選擇語言',
		description: '語言依以該語言為官方語言的國籍與會者人數由多至少排列。可依語言或國家名稱搜尋。',
		search: '搜尋語言',
		searchPlaceholder: '語言或國家…',
		noResults: '沒有符合搜尋條件的語言',
		resultCount: (n) => `共 ${n} 種語言`,
		attendees: (n) => `${n} 位與會者`
	},
	map: {
		loading: '載入中...',
		venueName: 'FOSS4G 2026 會場',
		venueAddress: '廣島國際會議中心',
		register: '參加 FOSS4G Hiroshima 2026'
	},
	layers: {
		title: '圖層',
		close: '關閉圖層面板',
		show: '顯示圖層控制項',
		residence: '與會者來自何處',
		nationality: '與會者的國籍',
		attendees: (n) => `${n} 位與會者`,
		places: (n, layer) => `來自 ${n} 個${layer === 'residence' ? '地點' : '國籍'}`,
		asOf: (date) => `截至 ${date}`,
		about: '關於與會者資料',
		aboutText: '本資料來自已報名與會者對居住城市與國家、以及國籍等選填問題的回答。'
	},
	chart: {
		show: '顯示與會者統計圖表',
		title: '與會者統計',
		preparingData: '正在準備圖表資料...',
		preparing: '正在準備圖表...',
		dataType: '資料類型：',
		area: '範圍：',
		filter: '篩選：',
		residence: '居住地',
		nationality: '國籍',
		all: '全部',
		currentExtent: '目前檢視範圍',
		excludeJapan: '排除日本與會者',
		tabChart: '圖表',
		tabTable: '表格',
		noData: '此範圍內沒有資料',
		topN: (n, kind) => `${kind}前 ${n} 名`,
		xAxis: (kind) => `X 軸：${kind}`,
		byCountry: (n) => `依國家（前 ${n} 名）`,
		byRegion: '依區域',
		share: '與會者比例',
		attendeesLabel: '與會者',
		attendeesCount: (n) => `${n} 位`,
		selectedAttendees: (n) => `與會者：${n}`,
		others: '其他'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`依${key}${direction === 'desc' ? '遞減' : '遞增'}排序：${rows} 列`,
		sortKeyName: '名稱',
		sortKeyCount: '與會者人數',
		sortKeyCountry: '國家',
		sortKeyRegion: '區域',
		headResidence: '居住地',
		headNationality: '國籍',
		headAttendees: '與會者',
		headCountry: '國家',
		headRegion: '區域',
		total: '總計'
	},
	region: {
		eastAsiaPacific: '東亞與太平洋地區',
		europeCentralAsia: '歐洲與中亞',
		latinAmericaCaribbean: '拉丁美洲與加勒比海地區',
		middleEastNorthAfrica: '中東與北非',
		northAmerica: '北美洲',
		southAsia: '南亞',
		subSaharanAfrica: '撒哈拉以南非洲'
	}
};

export default zhHant;
