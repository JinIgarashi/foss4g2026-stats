import type { Messages } from './en';

const vi: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - Thống kê người tham dự',
		description:
			'Bản đồ tương tác trực quan hóa nơi cư trú và quốc tịch của người tham dự hội nghị FOSS4G Hiroshima 2026.'
	},
	header: {
		siteName: 'Thống kê người tham dự',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'Kho GitHub',
		language: 'Đổi ngôn ngữ',
		theme: 'Đổi giao diện'
	},
	theme: {
		light: 'Sáng',
		dark: 'Tối',
		system: 'Hệ thống'
	},
	language: {
		contribute: 'Đóng góp cải thiện chất lượng bản dịch',
		title: 'Chọn ngôn ngữ của bạn',
		description:
			'Các ngôn ngữ được sắp xếp theo số người tham dự mang quốc tịch có ngôn ngữ đó là ngôn ngữ chính thức. Tìm theo tên ngôn ngữ hoặc quốc gia.',
		search: 'Tìm ngôn ngữ',
		searchPlaceholder: 'Ngôn ngữ hoặc quốc gia…',
		noResults: 'Không có ngôn ngữ nào khớp với tìm kiếm của bạn',
		resultCount: (n) => `Có ${n} ngôn ngữ`,
		attendees: (n) => `${n} người tham dự`
	},
	map: {
		loading: 'Đang tải...',
		venueName: 'Địa điểm FOSS4G 2026',
		venueAddress: 'Trung tâm Hội nghị Quốc tế Hiroshima',
		register: 'Tham gia FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'Lớp',
		close: 'Đóng bảng lớp',
		show: 'Hiện điều khiển lớp',
		residence: 'Người tham dự đến từ đâu',
		nationality: 'Người tham dự mang quốc tịch nào',
		attendees: (n) => `${n} người tham dự`,
		places: (n, layer) => `từ ${n} ${layer === 'residence' ? 'địa điểm' : 'quốc tịch'}`,
		asOf: (date) => `Tính đến ${date}`,
		about: 'Về dữ liệu người tham dự',
		aboutText:
			'Dữ liệu này dựa trên câu trả lời của người tham dự đã đăng ký cho các câu hỏi tùy chọn về thành phố, quốc gia và quốc tịch của họ.'
	},
	chart: {
		show: 'Hiện biểu đồ thống kê người tham dự',
		title: 'Thống kê người tham dự',
		preparingData: 'Đang chuẩn bị dữ liệu biểu đồ...',
		preparing: 'Đang chuẩn bị biểu đồ...',
		dataType: 'Loại dữ liệu:',
		area: 'Khu vực:',
		filter: 'Bộ lọc:',
		residence: 'Nơi cư trú',
		nationality: 'Quốc tịch',
		all: 'Tất cả',
		currentExtent: 'Phạm vi hiện tại',
		excludeJapan: 'Loại trừ người tham dự Nhật Bản',
		tabChart: 'Biểu đồ',
		tabTable: 'Bảng',
		noData: 'Không có dữ liệu trong phạm vi này',
		topN: (n, kind) => `${n} ${kind} hàng đầu`,
		xAxis: (kind) => `Trục X: ${kind}`,
		byCountry: (n) => `Theo quốc gia (${n} hàng đầu)`,
		byRegion: 'Theo vùng',
		share: 'Tỷ lệ người tham dự',
		attendeesLabel: 'Người tham dự',
		attendeesCount: (n) => `${n} người`,
		selectedAttendees: (n) => `Người tham dự: ${n}`,
		others: 'Khác'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`Sắp xếp theo ${key} (${direction === 'desc' ? 'giảm dần' : 'tăng dần'}): ${rows} hàng`,
		sortKeyName: 'tên',
		sortKeyCount: 'số người tham dự',
		sortKeyCountry: 'quốc gia',
		sortKeyRegion: 'vùng',
		headResidence: 'Nơi cư trú',
		headNationality: 'Quốc tịch',
		headAttendees: 'Người tham dự',
		headCountry: 'Quốc gia',
		headRegion: 'Vùng',
		total: 'Tổng'
	},
	region: {
		eastAsiaPacific: 'Đông Á và Thái Bình Dương',
		europeCentralAsia: 'Châu Âu và Trung Á',
		latinAmericaCaribbean: 'Mỹ Latinh và Caribe',
		middleEastNorthAfrica: 'Trung Đông và Bắc Phi',
		northAmerica: 'Bắc Mỹ',
		southAsia: 'Nam Á',
		subSaharanAfrica: 'Châu Phi cận Sahara'
	}
};

export default vi;
