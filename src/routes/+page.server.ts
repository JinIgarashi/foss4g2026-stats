import nationalityDataRaw from '$lib/assets/nationality.geojson?raw';
import residenceDataRaw from '$lib/assets/residence.geojson?raw';

type LocationProperties = {
	count: number;
	name?: string;
};

type GeoJSONData = GeoJSON.FeatureCollection<GeoJSON.Point, LocationProperties> & {
	created_at?: string;
};

type LayerStats = {
	attendees: number;
	locations: number;
	createdAt: string;
};

const nationalityData: GeoJSONData = JSON.parse(nationalityDataRaw);
const residenceData: GeoJSONData = JSON.parse(residenceDataRaw);

function calculateStats(data: GeoJSONData): LayerStats {
	const attendees = data.features.reduce(
		(sum: number, f: { properties: { count: number } }) => sum + f.properties.count,
		0
	);
	const locations = data.features.length;

	let createdAt = '';
	if (data.created_at) {
		const d = new Date(data.created_at);
		createdAt = d.toLocaleDateString('en-US', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	return { attendees, locations, createdAt };
}

export async function load() {
	const residenceStats = calculateStats(residenceData);
	const nationalityStats = calculateStats(nationalityData);

	return {
		residenceData,
		residenceStats,
		nationalityData,
		nationalityStats
	};
}
