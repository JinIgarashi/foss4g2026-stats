<script lang="ts">
	import { PUBLIC_PROTOMAP_KEY } from '$env/static/public';
	import { onMount } from 'svelte';
	import {
		MaplibreExportControl,
		Size,
		PageOrientation,
		Format,
		DPI
	} from '@watergis/maplibre-gl-export';
	import '@watergis/maplibre-gl-export/dist/maplibre-gl-export.css';
	import {
		MapLibre,
		NavigationControl,
		GlobeControl,
		GeolocateControl,
		AttributionControl,
		Marker,
		Popup,
		Projection,
		CustomControl,
		Hash
	} from 'svelte-maplibre-gl';
	import Layers from '$lib/Layers.svelte';
	import Space from '$lib/Space.svelte';
	import SpaceAtmosphere from '$lib/SpaceAtmosphere.svelte';
	import logoSvg from '$lib/assets/logo.svg';

	let exportControl = $state<MaplibreExportControl | null>(null);

	onMount(() => {
		exportControl = new MaplibreExportControl({
			PageSize: Size.A4,
			PageOrientation: PageOrientation.Landscape,
			Format: Format.PNG,
			DPI: DPI[96],
			Crosshair: true,
			PrintableArea: true,
			Local: 'en'
		});
	});
</script>

<Space>
	<MapLibre
		class="space-map h-full w-full"
		style={`https://api.protomaps.com/styles/v5/light/en.json?key=${PUBLIC_PROTOMAP_KEY}`}
		center={[132.45118, 34.39205]}
		zoom={3}
		maxZoom={10}
		attributionControl={false}
	>
		<Hash />
		<Projection type="globe" />
		<SpaceAtmosphere />

		<AttributionControl
			position="bottom-right"
			compact
			customAttribution="© <a href='https://2026.foss4g.org' target='_blank'>FOSS4G Hiroshima 2026</a>"
		/>
		<NavigationControl position="bottom-right" />
		<GlobeControl position="bottom-right" />
		<GeolocateControl
			position="bottom-right"
			positionOptions={{ enableHighAccuracy: true }}
			trackUserLocation={true}
		/>
		{#if exportControl}
			<CustomControl position="bottom-right" control={exportControl} />
		{/if}

		<Marker lnglat={[132.45118, 34.39205]} color="#e53e3e">
			<Popup offset={25}>
				<strong>FOSS4G 2026 Venue</strong><br />International Conference Center Hiroshima
			</Popup>
		</Marker>

		<Layers />

		<CustomControl position="bottom-left">
			<a
				href="https://2026.foss4g.org/en/register/registration/"
				target="_blank"
				rel="noopener noreferrer"
				class="flex! items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
			>
				<img src={logoSvg} alt="" class="h-5 w-5 brightness-0 invert" />
				Join FOSS4G Hiroshima 2026
			</a>
		</CustomControl>
	</MapLibre>
</Space>
