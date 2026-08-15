import type { Messages } from './en';

const ja: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - 参加者統計',
		description:
			'FOSS4G Hiroshima 2026 の参加者の居住地と国籍をインタラクティブな地図で可視化したサイトです。'
	},
	header: {
		siteName: '参加者統計',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'GitHub リポジトリ',
		language: '言語を変更'
	},
	map: {
		loading: '読み込み中...',
		venueName: 'FOSS4G 2026 会場',
		venueAddress: '広島国際会議場',
		register: 'FOSS4G Hiroshima 2026 に参加する'
	},
	layers: {
		title: 'レイヤー',
		close: 'レイヤーパネルを閉じる',
		show: 'レイヤーコントロールを表示',
		residence: '参加者の居住地',
		nationality: '参加者の国籍',
		attendees: (n) => `${n} 名の参加者`,
		places: (n, layer) => `${n} の${layer === 'residence' ? '地域' : '国籍'}から`,
		asOf: (date) => `${date} 時点`,
		about: '参加者データについて',
		aboutText:
			'このデータは、登録済み参加者が任意回答の設問（居住都市・国、国籍）に回答した内容に基づいています。'
	},
	chart: {
		show: '参加者統計のグラフを表示',
		title: '参加者統計',
		preparingData: 'グラフのデータを準備中...',
		preparing: 'グラフを準備中...',
		dataType: 'データ種別:',
		area: '範囲:',
		filter: 'フィルター:',
		residence: '居住地',
		nationality: '国籍',
		all: 'すべて',
		currentExtent: '現在の表示範囲',
		excludeJapan: '日本の参加者を除外',
		tabChart: 'グラフ',
		tabTable: '表',
		noData: 'この範囲に表示できるデータがありません',
		topN: (n, kind) => `${kind} 上位 ${n} 件`,
		xAxis: (kind) => `X 軸: ${kind}`,
		byCountry: (n) => `国別（上位 ${n} 件）`,
		byRegion: '地域別',
		share: '参加者の割合',
		attendeesLabel: '参加者数',
		attendeesCount: (n) => `${n} 名`,
		selectedAttendees: (n) => `参加者数: ${n}`,
		others: 'その他'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`${key}の${direction === 'desc' ? '降順' : '昇順'}で並べ替え: ${rows} 行`,
		sortKeyName: '名称',
		sortKeyCount: '参加者数',
		sortKeyCountry: '国',
		sortKeyRegion: '地域',
		headResidence: '居住地',
		headNationality: '国籍',
		headAttendees: '参加者数',
		headCountry: '国',
		headRegion: '地域',
		total: '合計'
	}
};

export default ja;
