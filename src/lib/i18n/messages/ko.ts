import type { Messages } from './en';

const ko: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - 참가자 통계',
		description:
			'FOSS4G Hiroshima 2026 참가자의 거주지와 국적을 인터랙티브 지도로 시각화한 사이트입니다.'
	},
	header: {
		siteName: '참가자 통계',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'GitHub 저장소',
		language: '언어 변경',
		theme: '테마 변경'
	},
	theme: {
		light: '라이트',
		dark: '다크',
		system: '시스템'
	},
	language: {
		contribute: '번역 품질 개선에 기여하기',
		title: '언어 선택',
		description:
			'해당 언어를 공용어로 하는 국적의 참가자 수가 많은 순으로 정렬되어 있습니다. 언어명 또는 국가명으로 검색할 수 있습니다.',
		search: '언어 검색',
		searchPlaceholder: '언어 또는 국가…',
		noResults: '검색 조건에 맞는 언어가 없습니다',
		resultCount: (n) => `${n}개 언어 사용 가능`,
		attendees: (n) => `참가자 ${n}명`
	},
	map: {
		loading: '불러오는 중...',
		venueName: 'FOSS4G 2026 행사장',
		venueAddress: '히로시마 국제회의장',
		register: 'FOSS4G Hiroshima 2026 참가하기'
	},
	layers: {
		title: '레이어',
		close: '레이어 패널 닫기',
		show: '레이어 컨트롤 표시',
		residence: '참가자의 거주지',
		nationality: '참가자의 국적',
		attendees: (n) => `참가자 ${n}명`,
		places: (n, layer) => `${n}개 ${layer === 'residence' ? '지역' : '국적'}에서`,
		asOf: (date) => `${date} 기준`,
		about: '참가자 데이터 안내',
		aboutText:
			'이 데이터는 등록된 참가자가 선택 항목인 거주 도시·국가 및 국적 질문에 응답한 내용을 기반으로 합니다.'
	},
	chart: {
		show: '참가자 통계 차트 표시',
		title: '참가자 통계',
		preparingData: '차트 데이터를 준비하는 중...',
		preparing: '차트를 준비하는 중...',
		dataType: '데이터 종류:',
		area: '범위:',
		filter: '필터:',
		residence: '거주지',
		nationality: '국적',
		all: '전체',
		currentExtent: '현재 표시 범위',
		excludeJapan: '일본 참가자 제외',
		tabChart: '차트',
		tabTable: '표',
		noData: '이 범위에 표시할 데이터가 없습니다',
		topN: (n, kind) => `${kind} 상위 ${n}개`,
		xAxis: (kind) => `X축: ${kind}`,
		byCountry: (n) => `국가별 (상위 ${n}개)`,
		byRegion: '지역별',
		share: '참가자 비율',
		attendeesLabel: '참가자 수',
		attendeesCount: (n) => `${n}명`,
		selectedAttendees: (n) => `참가자 수: ${n}`,
		others: '기타'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`${key} ${direction === 'desc' ? '내림차순' : '오름차순'} 정렬: ${rows}행`,
		sortKeyName: '이름',
		sortKeyCount: '참가자 수',
		sortKeyCountry: '국가',
		sortKeyRegion: '지역',
		headResidence: '거주지',
		headNationality: '국적',
		headAttendees: '참가자 수',
		headCountry: '국가',
		headRegion: '지역',
		total: '합계'
	}
};

export default ko;
