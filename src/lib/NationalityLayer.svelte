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
	id="nationality"
	{data}
	cluster={true}
	clusterMaxZoom={14}
	clusterRadius={50}
	clusterProperties={{ sum: ['+', ['get', 'count']] }}
>
	<CircleLayer
		id="nationality-clusters"
		filter={['has', 'point_count']}
		layout={{ visibility: activeLayer === 'nationality' ? 'visible' : 'none' }}
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
			visibility: activeLayer === 'nationality' ? 'visible' : 'none',
			'text-field': ['get', 'sum'],
			'text-size': 12,
			'text-font': ['Noto Sans Regular']
		}}
	/>
	<CircleLayer
		filter={['!', ['has', 'point_count']]}
		layout={{ visibility: activeLayer === 'nationality' ? 'visible' : 'none' }}
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
			visibility: activeLayer === 'nationality' ? 'visible' : 'none',
			'text-field': ['get', 'count'],
			'text-size': 11,
			'text-font': ['Noto Sans Regular'],
			'text-allow-overlap': true
		}}
	/>
	<SymbolLayer
		filter={['!', ['has', 'point_count']]}
		layout={{
			visibility: activeLayer === 'nationality' ? 'visible' : 'none',
			'text-field': ['get', 'name'],
			'text-size': 12,
			'text-font': ['Noto Sans Bold'],
			'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
			'text-radial-offset': 1.5,
			'text-justify': 'auto'
		}}
		paint={{
			'text-color': '#333',
			'text-halo-color': '#fff',
			'text-halo-width': 1
		}}
	/>
</GeoJSONSource>
