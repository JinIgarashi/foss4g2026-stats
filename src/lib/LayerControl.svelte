<script lang="ts">
	import { CustomControl } from 'svelte-maplibre-gl';
	import MapPinHouse from '@lucide/svelte/icons/map-pin-house';
	import MapPinned from '@lucide/svelte/icons/map-pinned';
	import Layers from '@lucide/svelte/icons/layers';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';

	type LayerType = 'residence' | 'nationality';
	type LayerStats = {
		residenceAttendees: number;
		residenceLocations: number;
		nationalityAttendees: number;
		nationalityCount: number;
		createdAt: string;
	};

	let {
		activeLayer = $bindable<LayerType>(),
		layersReady,
		stats
	}: {
		activeLayer: LayerType;
		layersReady: boolean;
		stats: LayerStats;
	} = $props();

	const setLayer = (layer: LayerType) => {
		activeLayer = layer;
	};
</script>

<CustomControl position="top-left" class="w-76" group={false}>
	<Card.Root>
		<Card.Header>
			<Card.Title><Layers size={16} class="inline-block mr-2" />Layers</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="flex items-center justify-between gap-3 text-sm text-gray-600">
				<Label for="layer-residence" class="cursor-pointer">
					<span>
						<MapPinHouse size={14} />
					</span>
					Where attendees come from
				</Label>
				<Switch
					id="layer-residence"
					checked={activeLayer === 'residence'}
					onCheckedChange={(checked: boolean) => {
						if (checked) setLayer('residence');
					}}
				/>
			</div>
			<div class="mt-2 flex items-center justify-between gap-3 text-sm text-gray-600">
				<Label for="layer-nationality" class="cursor-pointer">
					<span>
						<MapPinned size={14} />
					</span>
					What nationality attendees have
				</Label>
				<Switch
					id="layer-nationality"
					checked={activeLayer === 'nationality'}
					onCheckedChange={(checked: boolean) => {
						if (checked) setLayer('nationality');
					}}
				/>
			</div>
		</Card.Content>
		{#if layersReady}
			<Card.Footer class="flex flex-col items-start text-left">
				<p class="text-xs text-gray-500">
					{#if activeLayer === 'residence'}
						<span class="font-semibold text-gray-700">{stats.residenceAttendees}</span> attendees
						from
						<span class="font-semibold text-gray-700">{stats.residenceLocations}</span> locations
					{:else}
						<span class="font-semibold text-gray-700">{stats.nationalityAttendees}</span> attendees
						from
						<span class="font-semibold text-gray-700">{stats.nationalityCount}</span> nationalities
					{/if}
				</p>

				{#if stats.createdAt}
					<p class="text-xs text-gray-500">
						As of {stats.createdAt}
					</p>
				{/if}
				<p class="mt-1 text-xs text-gray-400 leading-snug">
					This data is based on registered attendee's answers to optional questions about their City
					and Country and Nationality.
				</p>
			</Card.Footer>
		{/if}
	</Card.Root>
</CustomControl>
