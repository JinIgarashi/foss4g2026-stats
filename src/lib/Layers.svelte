<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import type * as maplibregl from 'maplibre-gl';
	import { getMapContext } from 'svelte-maplibre-gl';
	import LayerControl from './LayerControl.svelte';
	import ResidenceLayer from './ResidenceLayer.svelte';
	import NationalityLayer from './NationalityLayer.svelte';

	type LayerType = 'residence' | 'nationality';
	let activeLayer: LayerType = $state('residence');

	type LocationProperties = {
		count: number;
		name?: string;
	};

	type GeoJSONData = GeoJSON.FeatureCollection<GeoJSON.Point, LocationProperties> & {
		created_at?: string;
	};

	let residenceData = $state<GeoJSONData | undefined>();
	let nationalityData = $state<GeoJSONData | undefined>();
	let stats = $state({
		residenceAttendees: 0,
		residenceLocations: 0,
		nationalityAttendees: 0,
		nationalityCount: 0,
		createdAt: ''
	});
	let layersReady = $state(false);

	const COLORS = {
		residence: ['#51bbd6', '#f1f075', '#f28cb1'],
		nationality: ['#6b9eff', '#a8e06c', '#ff8c6b']
	};

	// Get map instance from svelte-maplibre-gl context
	const mapCtx = getMapContext();

	onMount(async () => {
		const [residenceRes, nationalityRes] = await Promise.all([
			fetch(`${base}/residence.geojson`),
			fetch(`${base}/nationality.geojson`)
		]);
		const residenceJson = (await residenceRes.json()) as GeoJSONData;
		const nationalityJson = (await nationalityRes.json()) as GeoJSONData;

		stats.residenceAttendees = residenceJson.features.reduce(
			(sum: number, f: { properties: { count: number } }) => sum + f.properties.count,
			0
		);
		stats.residenceLocations = residenceJson.features.length;
		if (residenceJson.created_at) {
			const d = new Date(residenceJson.created_at);
			stats.createdAt = d.toLocaleDateString('en-US', {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			});
		}

		stats.nationalityAttendees = nationalityJson.features.reduce(
			(sum: number, f: { properties: { count: number } }) => sum + f.properties.count,
			0
		);
		stats.nationalityCount = nationalityJson.features.length;

		residenceData = residenceJson;
		nationalityData = nationalityJson;
		layersReady = true;

		// Register click handlers after layers are ready
		const map = mapCtx.map;
		if (!map) {
			return;
		}

		const handleResidenceClusterClick = async (e: maplibregl.MapMouseEvent) => {
			await handleClusterClick(e, 'residence-clusters', 'residence');
		};

		const handleNationalityClusterClick = async (e: maplibregl.MapMouseEvent) => {
			await handleClusterClick(e, 'nationality-clusters', 'nationality');
		};

		const handleClusterMouseEnterReplace = (e: maplibregl.MapLayerMouseEvent) => {
			e.target.getCanvas().style.cursor = 'pointer';
		};

		const handleClusterMouseLeaveReplace = (e: maplibregl.MapLayerMouseEvent) => {
			e.target.getCanvas().style.cursor = '';
		};

		// Register event handlers
		map.on('click', 'residence-clusters', handleResidenceClusterClick);
		map.on('click', 'nationality-clusters', handleNationalityClusterClick);
		map.on('mouseenter', 'residence-clusters', handleClusterMouseEnterReplace);
		map.on('mouseleave', 'residence-clusters', handleClusterMouseLeaveReplace);
		map.on('mouseenter', 'nationality-clusters', handleClusterMouseEnterReplace);
		map.on('mouseleave', 'nationality-clusters', handleClusterMouseLeaveReplace);
	});

	async function handleClusterClick(
		e: maplibregl.MapMouseEvent,
		layerId: string,
		sourceId: string
	) {
		const features = e.target.queryRenderedFeatures(e.point, { layers: [layerId] });
		if (!features.length) return;
		const clusterId = features[0].properties?.cluster_id;
		const source = e.target.getSource(sourceId) as maplibregl.GeoJSONSource;
		const zoom = await source.getClusterExpansionZoom(clusterId);
		const geom = features[0].geometry as { type: 'Point'; coordinates: [number, number] };
		e.target.easeTo({ center: geom.coordinates, zoom });
	}
</script>

{#if residenceData}
	<ResidenceLayer data={residenceData} {activeLayer} colors={COLORS.residence} />
{/if}

{#if nationalityData}
	<NationalityLayer data={nationalityData} {activeLayer} colors={COLORS.nationality} />
{/if}

<LayerControl bind:activeLayer {layersReady} {stats} />
