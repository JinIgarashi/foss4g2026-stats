<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import type * as maplibregl from 'maplibre-gl';
	import {
		GeoJSONSource,
		CircleLayer,
		SymbolLayer,
		CustomControl,
		getMapContext
	} from 'svelte-maplibre-gl';
	import MapPinHouse from '@lucide/svelte/icons/map-pin-house';
	import MapPinned from '@lucide/svelte/icons/map-pinned';
	import Layers from '@lucide/svelte/icons/layers';

	type LayerType = 'residence' | 'nationality';
	let activeLayer: LayerType = $state('residence');

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	type GeoJSONData = Record<string, any>;

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
		const residenceJson: GeoJSONData = await residenceRes.json();
		const nationalityJson: GeoJSONData = await nationalityRes.json();

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
	<GeoJSONSource
		id="residence"
		data={residenceData}
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
				'circle-color': [
					'step',
					['get', 'sum'],
					COLORS.residence[0],
					10,
					COLORS.residence[1],
					50,
					COLORS.residence[2]
				],
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
				'circle-color': COLORS.residence[0],
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
{/if}

{#if nationalityData}
	<GeoJSONSource
		id="nationality"
		data={nationalityData}
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
				'circle-color': [
					'step',
					['get', 'sum'],
					COLORS.nationality[0],
					10,
					COLORS.nationality[1],
					50,
					COLORS.nationality[2]
				],
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
				'circle-color': COLORS.nationality[0],
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
{/if}

<CustomControl position="top-left">
	<div class="w-72 p-3">
		<p class="mb-2 text-sm font-semibold text-gray-700"><Layers size={16} class="inline-block mr-2" />Layers</p>
		<label class="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
			<input
				type="radio"
				name="layer"
				value="residence"
				checked={activeLayer === 'residence'}
				onchange={() => (activeLayer = 'residence')}
			/>
			<span>
				<MapPinHouse size={14}  />
			</span>
			Where attendees come from
		</label>
		<label class="mt-1 flex cursor-pointer items-center gap-2 text-sm text-gray-600">
			<input
				type="radio"
				name="layer"
				value="nationality"
				checked={activeLayer === 'nationality'}
				onchange={() => (activeLayer = 'nationality')}
			/>
			<span>
				<MapPinned size={14}  />
			</span>
			What nationality attendees have
		</label>
		{#if layersReady}
			<hr class="mt-2 mb-1 border-gray-200" />
			{#if activeLayer === 'residence'}
				<p class="text-xs text-gray-500">
					<span class="font-semibold text-gray-700">{stats.residenceAttendees}</span> attendees from
					<span class="font-semibold text-gray-700">{stats.residenceLocations}</span> locations
				</p>
			{:else}
				<p class="text-xs text-gray-500">
					<span class="font-semibold text-gray-700">{stats.nationalityAttendees}</span> attendees
					from
					<span class="font-semibold text-gray-700">{stats.nationalityCount}</span> nationalities
				</p>
			{/if}
			{#if stats.createdAt}
				<p class="mt-1 text-xs text-gray-400">As of {stats.createdAt}</p>
			{/if}
			<p class="mt-1 text-xs text-gray-400 leading-snug">
				This data is based on registered attendee's answers to optional questions about their City
				and Country and Nationality.
			</p>
		{/if}
	</div>
</CustomControl>
