<script lang="ts">
	import { base } from '$app/paths';
	import { getContext } from 'svelte';
	import type { Map as MaplibreMap, GeoJSONSource } from 'maplibre-gl';
	import { MAPSTORE_CONTEXT_KEY, type MapStore } from '$lib/stores';

	const mapStore: MapStore = getContext(MAPSTORE_CONTEXT_KEY);

	type LayerType = 'residence' | 'nationality';
	let activeLayer: LayerType = $state('residence');
	let layersReady = $state(false);
	let stats = $state({
		residenceAttendees: 0,
		residenceLocations: 0,
		nationalityAttendees: 0,
		nationalityCount: 0
	});

	const COLORS = {
		residence: ['#51bbd6', '#f1f075', '#f28cb1'],
		nationality: ['#6b9eff', '#a8e06c', '#ff8c6b']
	};

	async function setupLayers(map: MaplibreMap) {
		for (const type of ['residence', 'nationality'] as LayerType[]) {
			const res = await fetch(`${base}/${type}.geojson`);
			const data = await res.json();
			const colors = COLORS[type];

			// Count total attendees and locations from features
			const totalAttendees = data.features.reduce(
				(sum: number, f: { properties: { count: number } }) => sum + f.properties.count,
				0
			);
			if (type === 'residence') {
				stats.residenceAttendees = totalAttendees;
				stats.residenceLocations = data.features.length;
			} else {
				stats.nationalityAttendees = totalAttendees;
				stats.nationalityCount = data.features.length;
			}

			map.addSource(type, {
				type: 'geojson',
				data,
				cluster: true,
				clusterMaxZoom: 14,
				clusterRadius: 50,
				clusterProperties: {
					sum: ['+', ['get', 'count']]
				}
			});

			map.addLayer({
				id: `${type}-clusters`,
				type: 'circle',
				source: type,
				filter: ['has', 'point_count'],
				paint: {
					'circle-color': ['step', ['get', 'sum'], colors[0], 10, colors[1], 50, colors[2]],
					'circle-radius': ['step', ['get', 'sum'], 15, 10, 22, 50, 30],
					'circle-stroke-width': 2,
					'circle-stroke-color': '#fff'
				}
			});

			map.addLayer({
				id: `${type}-cluster-count`,
				type: 'symbol',
				source: type,
				filter: ['has', 'point_count'],
				layout: {
					'text-field': ['get', 'sum'],
					'text-size': 12
				}
			});

			map.addLayer({
				id: `${type}-unclustered`,
				type: 'circle',
				source: type,
				filter: ['!', ['has', 'point_count']],
				paint: {
					'circle-color': colors[0],
					'circle-radius': ['interpolate', ['linear'], ['get', 'count'], 1, 8, 10, 14, 50, 22],
					'circle-stroke-width': 1,
					'circle-stroke-color': '#fff'
				}
			});

			map.addLayer({
				id: `${type}-unclustered-count`,
				type: 'symbol',
				source: type,
				filter: ['!', ['has', 'point_count']],
				layout: {
					'text-field': ['get', 'count'],
					'text-size': 11,
					'text-allow-overlap': true
				}
			});

			if (type === 'nationality') {
				map.addLayer({
					id: `${type}-label`,
					type: 'symbol',
					source: type,
					filter: ['!', ['has', 'point_count']],
					layout: {
						'text-field': ['get', 'name'],
						'text-size': 11,
						'text-offset': [0, 1.5],
						'text-anchor': 'top'
					},
					paint: {
						'text-color': '#333',
						'text-halo-color': '#fff',
						'text-halo-width': 1
					}
				});
			}

			map.on('click', `${type}-clusters`, async (e) => {
				const features = map.queryRenderedFeatures(e.point, {
					layers: [`${type}-clusters`]
				});
				if (!features.length) return;
				const clusterId = features[0].properties!.cluster_id;
				const source = map.getSource(type) as GeoJSONSource;
				const zoom = await source.getClusterExpansionZoom(clusterId);
				map.easeTo({
					center: (features[0].geometry as unknown as { coordinates: [number, number] })
						.coordinates,
					zoom
				});
			});

			map.on('mouseenter', `${type}-clusters`, () => {
				map.getCanvas().style.cursor = 'pointer';
			});
			map.on('mouseleave', `${type}-clusters`, () => {
				map.getCanvas().style.cursor = '';
			});
		}

		layersReady = true;
		updateVisibility(map);
	}

	function updateVisibility(map: MaplibreMap) {
		for (const type of ['residence', 'nationality'] as LayerType[]) {
			const visible = type === activeLayer ? 'visible' : 'none';
			map.setLayoutProperty(`${type}-clusters`, 'visibility', visible);
			map.setLayoutProperty(`${type}-cluster-count`, 'visibility', visible);
			map.setLayoutProperty(`${type}-unclustered`, 'visibility', visible);
			map.setLayoutProperty(`${type}-unclustered-count`, 'visibility', visible);
			if (type === 'nationality') {
				map.setLayoutProperty(`${type}-label`, 'visibility', visible);
			}
		}
	}

	let currentMap: MaplibreMap | undefined = $state();

	mapStore.subscribe((map) => {
		currentMap = map;
		if (!map) return;
		if (!map.getSource('residence')) {
			setupLayers(map);
		}
	});

	$effect(() => {
		if (!currentMap || !layersReady) return;
		updateVisibility(currentMap);
	});

	function handleToggle(type: LayerType) {
		activeLayer = type;
	}
</script>

<div class="absolute top-3 left-3 z-10 rounded-lg bg-white p-3 shadow-md">
	<p class="mb-2 text-sm font-semibold text-gray-700">Layer</p>
	<label class="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
		<input
			type="radio"
			name="layer"
			value="residence"
			checked={activeLayer === 'residence'}
			onchange={() => handleToggle('residence')}
		/>
		Where attendees come from
	</label>
	<label class="mt-1 flex cursor-pointer items-center gap-2 text-sm text-gray-600">
		<input
			type="radio"
			name="layer"
			value="nationality"
			checked={activeLayer === 'nationality'}
			onchange={() => handleToggle('nationality')}
		/>
		What Nationality attendees have
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
				<span class="font-semibold text-gray-700">{stats.nationalityAttendees}</span> attendees from
				<span class="font-semibold text-gray-700">{stats.nationalityCount}</span> nationalities
			</p>
		{/if}
	{/if}
</div>
