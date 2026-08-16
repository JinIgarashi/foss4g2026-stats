import type { Messages } from './en';

const th: Messages = {
	meta: {
		title: 'FOSS4G Hiroshima 2026 - สถิติผู้เข้าร่วม',
		description: 'แผนที่แบบโต้ตอบแสดงถิ่นที่อยู่และสัญชาติของผู้เข้าร่วมงาน FOSS4G Hiroshima 2026'
	},
	header: {
		siteName: 'สถิติผู้เข้าร่วม',
		logoAlt: 'FOSS4G Hiroshima 2026',
		github: 'คลัง GitHub',
		language: 'เปลี่ยนภาษา',
		theme: 'เปลี่ยนธีม'
	},
	theme: {
		light: 'สว่าง',
		dark: 'มืด',
		system: 'ตามระบบ'
	},
	language: {
		contribute: 'ร่วมปรับปรุงคุณภาพการแปล',
		title: 'เลือกภาษา',
		description:
			'เรียงตามจำนวนผู้เข้าร่วมที่ถือสัญชาติซึ่งใช้ภาษานั้นเป็นภาษาราชการ ค้นหาได้ด้วยชื่อภาษาหรือชื่อประเทศ',
		search: 'ค้นหาภาษา',
		searchPlaceholder: 'ภาษาหรือประเทศ…',
		noResults: 'ไม่พบภาษาที่ตรงกับการค้นหา',
		resultCount: (n) => `มี ${n} ภาษา`,
		attendees: (n) => `ผู้เข้าร่วม ${n} คน`
	},
	map: {
		loading: 'กำลังโหลด...',
		venueName: 'สถานที่จัดงาน FOSS4G 2026',
		venueAddress: 'ศูนย์การประชุมนานาชาติฮิโรชิมา',
		register: 'เข้าร่วม FOSS4G Hiroshima 2026'
	},
	layers: {
		title: 'ชั้นข้อมูล',
		close: 'ปิดแผงชั้นข้อมูล',
		show: 'แสดงตัวควบคุมชั้นข้อมูล',
		residence: 'ผู้เข้าร่วมมาจากที่ใด',
		nationality: 'ผู้เข้าร่วมมีสัญชาติใด',
		attendees: (n) => `ผู้เข้าร่วม ${n} คน`,
		places: (n, layer) => `จาก ${n} ${layer === 'residence' ? 'พื้นที่' : 'สัญชาติ'}`,
		asOf: (date) => `ข้อมูล ณ ${date}`,
		about: 'เกี่ยวกับข้อมูลผู้เข้าร่วม',
		aboutText:
			'ข้อมูลนี้อ้างอิงจากคำตอบของผู้ลงทะเบียนต่อคำถามที่ไม่บังคับเกี่ยวกับเมืองและประเทศที่พำนัก และสัญชาติ'
	},
	chart: {
		show: 'แสดงแผนภูมิสถิติผู้เข้าร่วม',
		title: 'สถิติผู้เข้าร่วม',
		preparingData: 'กำลังเตรียมข้อมูลแผนภูมิ...',
		preparing: 'กำลังเตรียมแผนภูมิ...',
		dataType: 'ประเภทข้อมูล:',
		area: 'ขอบเขต:',
		filter: 'ตัวกรอง:',
		residence: 'ถิ่นที่อยู่',
		nationality: 'สัญชาติ',
		all: 'ทั้งหมด',
		currentExtent: 'ขอบเขตที่แสดงอยู่',
		excludeJapan: 'ไม่รวมผู้เข้าร่วมชาวญี่ปุ่น',
		tabChart: 'แผนภูมิ',
		tabTable: 'ตาราง',
		noData: 'ไม่มีข้อมูลในช่วงนี้',
		topN: (n, kind) => `${kind} ${n} อันดับแรก`,
		xAxis: (kind) => `แกน X: ${kind}`,
		byCountry: (n) => `ตามประเทศ (${n} อันดับแรก)`,
		byRegion: 'ตามภูมิภาค',
		share: 'สัดส่วนผู้เข้าร่วม',
		attendeesLabel: 'ผู้เข้าร่วม',
		attendeesCount: (n) => `${n} คน`,
		selectedAttendees: (n) => `ผู้เข้าร่วม: ${n}`,
		others: 'อื่น ๆ'
	},
	table: {
		sortedBy: (key, direction, rows) =>
			`เรียงตาม${key} (${direction === 'desc' ? 'มากไปน้อย' : 'น้อยไปมาก'}): ${rows} แถว`,
		sortKeyName: 'ชื่อ',
		sortKeyCount: 'จำนวนผู้เข้าร่วม',
		sortKeyCountry: 'ประเทศ',
		sortKeyRegion: 'ภูมิภาค',
		headResidence: 'ถิ่นที่อยู่',
		headNationality: 'สัญชาติ',
		headAttendees: 'ผู้เข้าร่วม',
		headCountry: 'ประเทศ',
		headRegion: 'ภูมิภาค',
		total: 'รวม'
	}
};

export default th;
