<script lang="ts">
	import type { PageData } from './$types';
	import { PUBLIC_PROTOMAP_KEY } from '$env/static/public';
	import { onMount } from 'svelte';
	import { MaplibreTerradrawControl } from '@watergis/maplibre-gl-terradraw';
	import '@watergis/maplibre-gl-terradraw/dist/maplibre-gl-terradraw.css';
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
	import { Spinner } from '$lib/components/ui/spinner/index.js';
	import LayerControl from '$lib/LayerControl.svelte';
	import ResidenceLayer from '$lib/ResidenceLayer.svelte';
	import NationalityLayer from '$lib/NationalityLayer.svelte';
	import Space from '$lib/Space.svelte';
	import SpaceAtmosphere from '$lib/SpaceAtmosphere.svelte';
	import logoSvg from '$lib/assets/logo.svg';
	import Button from '@/components/ui/button/button.svelte';
	import ChartControl from '@/ChartControl.svelte';
	import MapExportControl from '$lib/MapExportControl.svelte';
	import Languages from '@lucide/svelte/icons/languages';
	import {
		currentLocale,
		currentLocaleDefinition,
		currentMessages,
		messagesEditUrl
	} from '$lib/i18n';

	let {
		data
	}: {
		data: PageData;
	} = $props();

	type LayerType = 'residence' | 'nationality';

	let t = $derived(currentMessages());
	let localeDef = $derived(currentLocaleDefinition());
	let editUrl = $derived(messagesEditUrl(currentLocale()));

	// Held back until mounted so the server and first client render agree.
	let mounted = $state(false);
	let exportLocal = $derived(localeDef.exportLocal);
	let drawControl = $state<MaplibreTerradrawControl | null>(null);
	let isMapLoaded = $state(false);
	let activeLayer: LayerType = $state('residence');

	const COLORS = {
		residence: ['#51bbd6', '#f1f075', '#f28cb1'],
		nationality: ['#6b9eff', '#a8e06c', '#ff8c6b']
	};

	let stats = $derived({
		residenceAttendees: data.residenceStats.attendees,
		residenceLocations: data.residenceStats.locations,
		nationalityAttendees: data.nationalityStats.attendees,
		nationalityCount: data.nationalityStats.locations,
		createdAt: data.residenceStats.createdAt
	});

	onMount(() => {
		mounted = true;

		drawControl = new MaplibreTerradrawControl({
			modes: [
				'render',
				'marker',
				'linestring',
				'polygon',
				'freehand-linestring',
				'text',
				'select',
				'delete-selection',
				'delete',
				'undo',
				'redo'
			],
			open: true,
			showDeleteConfirmation: true
		});
	});
</script>

{#if !isMapLoaded}
	<div class="flex h-full w-full items-center justify-center bg-background">
		<div class="flex flex-col items-center gap-4">
			<Spinner />
			<p class="text-sm text-muted-foreground">{t.map.loading}</p>
		</div>
	</div>
{/if}

<Space class={!isMapLoaded ? 'hidden' : ''}>
	<MapLibre
		class="space-map h-full w-full"
		style={`https://api.protomaps.com/styles/v5/light/${localeDef.protomaps}.json?key=${PUBLIC_PROTOMAP_KEY}`}
		center={[132.45118, 34.39205]}
		zoom={3}
		maxZoom={10}
		attributionControl={false}
		onload={() => (isMapLoaded = true)}
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
		<!-- Keyed so a language change tears the old control down and builds a new one. -->
		{#if mounted}
			{#key exportLocal}
				<MapExportControl local={exportLocal} />
			{/key}
		{/if}

		<Marker lnglat={[132.45118, 34.39205]} color="#e53e3e">
			<Popup offset={25}>
				<strong>{t.map.venueName}</strong><br />{t.map.venueAddress}
			</Popup>
		</Marker>

		<ResidenceLayer {activeLayer} data={data.residenceData} colors={COLORS.residence} />
		<NationalityLayer {activeLayer} data={data.nationalityData} colors={COLORS.nationality} />
		<LayerControl bind:activeLayer layersReady={true} {stats} />

		<ChartControl
			bind:activeLayer
			residenceData={data.residenceData}
			nationalityData={data.nationalityData}
		/>

		<CustomControl position="bottom-left" group={false}>
			<Button
				href="https://2026.foss4g.org/en/register/registration/"
				target="_blank"
				rel="noopener noreferrer"
				class="flex! items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
			>
				<img src={logoSvg} alt="" class="h-5 w-5 brightness-0 invert" />
				{t.map.register}
			</Button>
		</CustomControl>

		<!-- Opens GitHub's editor for this locale's message file. Declared *after*
		     the register button because MapLibre prepends into its bottom corners,
		     so the last control declared is the one that ends up on top. -->
		<CustomControl position="bottom-left" group={false}>
			<Button
				variant="outline"
				size="sm"
				href={editUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="map-ctrl-btn flex! items-center gap-2 text-xs shadow-sm backdrop-blur-sm"
			>
				<Languages size={14} />
				{t.language.contribute}
			</Button>
		</CustomControl>

		{#if drawControl}
			<CustomControl position="top-right" control={drawControl} />
		{/if}
	</MapLibre>
</Space>
