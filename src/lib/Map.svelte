<script lang="ts">
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { PUBLIC_PROTOMAP_KEY } from '$env/static/public';
	import { getContext, onDestroy } from 'svelte';
	import {
		Map as MaplibreMap,
		ScaleControl,
		NavigationControl,
		GlobeControl,
		GeolocateControl,
		Marker,
		Popup,
		AttributionControl
	} from 'maplibre-gl';
	import { MAPSTORE_CONTEXT_KEY, type MapStore } from '$lib/stores';

	const mapStore: MapStore = getContext(MAPSTORE_CONTEXT_KEY);

	let mapContainer: HTMLDivElement;
	let mapInstance: MaplibreMap | undefined;

	$effect(() => {
		if (!mapContainer || mapInstance) return;

		mapInstance = new MaplibreMap({
			container: mapContainer,
			style: `https://api.protomaps.com/styles/v5/light/en.json?key=${PUBLIC_PROTOMAP_KEY}`,
			center: [132.45118, 34.39205],
			zoom: 3,
			hash: true,
			attributionControl: false
		});

		mapInstance.addControl(
			new AttributionControl({
				customAttribution:
					'© <a href="https://2026.foss4g.org" target="_blank">FOSS4G Hiroshima 2026</a>',
				compact: true
			}),
			'bottom-right'
		);
		mapInstance.addControl(new ScaleControl(), 'bottom-left');
		mapInstance.addControl(new NavigationControl(), 'bottom-right');
		mapInstance.addControl(new GlobeControl(), 'bottom-right');
		mapInstance.addControl(
			new GeolocateControl({
				positionOptions: { enableHighAccuracy: true },
				trackUserLocation: true
			}),
			'bottom-right'
		);

		const venuePopup = new Popup({ offset: 25 }).setHTML(
			'<strong>FOSS4G 2026 Venue</strong><br>International Conference Center Hiroshima'
		);
		new Marker({ color: '#e53e3e' })
			.setLngLat([132.45118, 34.39205])
			.setPopup(venuePopup)
			.addTo(mapInstance);

		mapInstance.on('load', () => {
			mapInstance!.setProjection({ type: 'globe' });
			mapStore.set(mapInstance);
		});
	});

	onDestroy(() => {
		mapInstance?.remove();
		mapInstance = undefined;
	});
</script>

<div bind:this={mapContainer} class="h-full w-full"></div>
