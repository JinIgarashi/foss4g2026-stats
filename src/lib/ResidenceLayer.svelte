<script lang="ts">
	import { GeoJSONSource, CircleLayer, SymbolLayer } from 'svelte-maplibre-gl';

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
