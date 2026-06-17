<script lang="ts">
	import { CustomControl } from 'svelte-maplibre-gl';
	import MapPinHouse from '@lucide/svelte/icons/map-pin-house';
	import MapPinned from '@lucide/svelte/icons/map-pinned';
	import Layers from '@lucide/svelte/icons/layers';
	import Info from '@lucide/svelte/icons/info';
	import * as Card from '$lib/components/ui/card/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

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

	let infoOpen = $state(false);
	let infoTriggerId = $state<string | null>(null);

	const openInfo = () => {
		infoTriggerId = 'layer-info';
		infoOpen = true;
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
						setLayer(checked ? 'residence' : 'nationality');
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
						setLayer(checked ? 'nationality' : 'residence');
					}}
				/>
			</div>
		</Card.Content>
		{#if layersReady}
			<Card.Footer class="text-left">
				<div class="flex w-full items-start gap-2">
					<div class="min-w-0">
						<p class="text-xs text-gray-500">
							{#if activeLayer === 'residence'}
								<span class="font-semibold text-gray-700">{stats.residenceAttendees}</span>
								attendees from
								<span class="font-semibold text-gray-700">{stats.residenceLocations}</span> locations
							{:else}
								<span class="font-semibold text-gray-700">{stats.nationalityAttendees}</span>
								attendees from
								<span class="font-semibold text-gray-700">{stats.nationalityCount}</span> nationalities
							{/if}
						</p>

						{#if stats.createdAt}
							<p class="text-xs text-gray-500">
								As of {stats.createdAt}
							</p>
						{/if}
					</div>
					<Tooltip.Provider delayDuration={200}>
						<Tooltip.Root
							disableCloseOnTriggerClick
							bind:open={infoOpen}
							bind:triggerId={infoTriggerId}
						>
							<Tooltip.Trigger
								id="layer-info"
								class={buttonVariants({ variant: 'ghost', size: 'icon' }) + ' ml-auto shrink-0'}
								aria-label="About attendee data"
								onclick={openInfo}
							>
								<Info />
							</Tooltip.Trigger>
							<Tooltip.Content class="max-w-64 text-xs leading-relaxed">
								<p>
									This data is based on registered attendee's answers to optional questions about
									their City and Country and Nationality.
								</p>
							</Tooltip.Content>
						</Tooltip.Root>
					</Tooltip.Provider>
				</div>
			</Card.Footer>
		{/if}
	</Card.Root>
</CustomControl>
