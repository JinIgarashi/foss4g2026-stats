<script lang="ts">
	import { CustomControl } from 'svelte-maplibre-gl';
	import MapPinHouse from '@lucide/svelte/icons/map-pin-house';
	import MapPinned from '@lucide/svelte/icons/map-pinned';
	import Layers from '@lucide/svelte/icons/layers';
	import * as Card from '$lib/components/ui/card/index.js';

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
</script>

<CustomControl position="top-left" class="w-96" group={false}>
	<Card.Root>
		<Card.Header>
			<Card.Title><Layers size={16} class="inline-block mr-2" />Layers</Card.Title>
		</Card.Header>
		<Card.Content>
			<label class="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
				<input
					type="radio"
					name="layer"
					value="residence"
					checked={activeLayer === 'residence'}
					onchange={() => (activeLayer = 'residence')}
				/>
				<span>
					<MapPinHouse size={14} />
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
					<MapPinned size={14} />
				</span>
				What nationality attendees have
			</label>
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

					{#if stats.createdAt}
						(As of {stats.createdAt})
					{/if}
				</p>
				<p class="mt-1 text-xs text-gray-400 leading-snug">
					This data is based on registered attendee's answers to optional questions about their City
					and Country and Nationality.
				</p>
			</Card.Footer>
		{/if}
	</Card.Root>
</CustomControl>
