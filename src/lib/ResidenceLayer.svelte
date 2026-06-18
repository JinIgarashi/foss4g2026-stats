<script lang="ts">
	import { onMount } from 'svelte';
	import type * as maplibregl from 'maplibre-gl';
	import { GeoJSONSource, CircleLayer, SymbolLayer, getMapContext } from 'svelte-maplibre-gl';

	type LayerType = 'residence' | 'nationality';
	type LocationProperties = {
		count: number;
		name?: string;
	};
	type GeoJSONData = GeoJSON.FeatureCollection<GeoJSON.Point, LocationProperties>;

	let {
		data,
		activeLayer,
		colors
	}: {
		data: GeoJSONData;
		activeLayer: LayerType;
		colors: string[];
	} = $props();

	onMount(() => {
		const mapCtx = getMapContext();
		const map = mapCtx.map;
		if (!map) {
			return;
		}

		const handleClusterClick = async (e: maplibregl.MapMouseEvent) => {
			const features = e.target.queryRenderedFeatures(e.point, { layers: ['residence-clusters'] });
			if (!features.length) return;
			const clusterId = features[0].properties?.cluster_id;
			const source = e.target.getSource('residence') as maplibregl.GeoJSONSource;
			const zoom = await source.getClusterExpansionZoom(clusterId);
			const geom = features[0].geometry as { type: 'Point'; coordinates: [number, number] };
			e.target.easeTo({ center: geom.coordinates, zoom });
		};

		const handleMouseEnter = (e: maplibregl.MapLayerMouseEvent) => {
			e.target.getCanvas().style.cursor = 'pointer';
		};

		const handleMouseLeave = (e: maplibregl.MapLayerMouseEvent) => {
			e.target.getCanvas().style.cursor = '';
		};

		map.on('click', 'residence-clusters', handleClusterClick);
		map.on('mouseenter', 'residence-clusters', handleMouseEnter);
		map.on('mouseleave', 'residence-clusters', handleMouseLeave);

		return () => {
			map.off('click', 'residence-clusters', handleClusterClick);
			map.off('mouseenter', 'residence-clusters', handleMouseEnter);
			map.off('mouseleave', 'residence-clusters', handleMouseLeave);
		};
	});
</script>

<GeoJSONSource
	id="residence"
	{data}
	cluster={true}
	clusterMaxZoom={14}
	clusterRadius={50}
	clusterProperties={{ sum: ['+', ['get', 'count']] }}
>
	<CircleLayer
		id="residence-clusters"
		filter={['has', 'point_count']}
		layout={{ visibility: activeLayer === 'residence' ? 'visible' : 'none' }}
		paint={{
			'circle-color': ['step', ['get', 'sum'], colors[0], 10, colors[1], 50, colors[2]],
			'circle-radius': ['step', ['get', 'sum'], 15, 10, 22, 50, 30],
			'circle-stroke-width': 2,
			'circle-stroke-color': '#fff'
		}}
	/>
	<SymbolLayer
		filter={['has', 'point_count']}
		layout={{
			visibility: activeLayer === 'residence' ? 'visible' : 'none',
			'text-field': ['get', 'sum'],
			'text-size': 12,
			'text-font': ['Noto Sans Regular']
		}}
	/>
	<CircleLayer
		filter={['!', ['has', 'point_count']]}
		layout={{ visibility: activeLayer === 'residence' ? 'visible' : 'none' }}
		paint={{
			'circle-color': colors[0],
			'circle-radius': ['interpolate', ['linear'], ['get', 'count'], 1, 8, 10, 14, 50, 22],
			'circle-stroke-width': 1,
			'circle-stroke-color': '#fff'
		}}
	/>
	<SymbolLayer
		filter={['!', ['has', 'point_count']]}
		layout={{
			visibility: activeLayer === 'residence' ? 'visible' : 'none',
			'text-field': ['get', 'count'],
			'text-size': 11,
			'text-font': ['Noto Sans Regular'],
			'text-allow-overlap': true
		}}
	/>
</GeoJSONSource>
