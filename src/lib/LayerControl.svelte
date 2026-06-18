<script lang="ts">
	import { CustomControl } from 'svelte-maplibre-gl';
	import MapPinHouse from '@lucide/svelte/icons/map-pin-house';
	import MapPinned from '@lucide/svelte/icons/map-pinned';
	import Layers from '@lucide/svelte/icons/layers';
	import Info from '@lucide/svelte/icons/info';
	import Flag from '@lucide/svelte/icons/flag';
	import UserRound from '@lucide/svelte/icons/user-round';
	import X from '@lucide/svelte/icons/x';
	import * as Card from '$lib/components/ui/card/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import Button from './components/ui/button/button.svelte';
	import { onMount } from 'svelte';

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

	let layerPanelOpen = $state(false);
	let infoOpen = $state(false);
	let infoTriggerId = $state<string | null>(null);

	const openInfo = () => {
		infoTriggerId = 'layer-info';
		infoOpen = true;
	};

	onMount(() => {
		layerPanelOpen = true;
	});
</script>

<CustomControl position="top-left" group={false}>
	{#if layerPanelOpen}
		<Card.Root class="w-80 py-4">
			<Card.Header class="flex flex-row items-center justify-between">
				<Card.Title><Layers size={16} class="inline-block mr-2" />Layers</Card.Title>
				<Button
					variant="ghost"
					size="icon"
					class="cursor-pointer"
					aria-label="Close layer panel"
					onclick={() => (layerPanelOpen = false)}
				>
					<X size={16} />
				</Button>
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
							<p class="text-xs text-gray-800">
								<span class="font-semibold">
									{activeLayer === 'residence'
										? stats.residenceAttendees
										: stats.nationalityAttendees}
								</span>
								attendees
								<UserRound size={14} class="inline-block align-[-2px]" />
								from
								<span class="font-semibold">
									{activeLayer === 'residence' ? stats.residenceLocations : stats.nationalityCount}
								</span>
								{activeLayer === 'residence' ? 'locations' : 'nationalities'}
								<Flag size={14} class="inline-block align-[-2px]" />
							</p>

							{#if stats.createdAt}
								<p class="text-xs text-gray-800">
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
	{:else}
		<Button
			variant="outline"
			size="icon"
			class="layer-toggle-btn border-slate-200 bg-white/90 text-slate-900 shadow-sm backdrop-blur-sm cursor-pointer"
			onclick={() => (layerPanelOpen = true)}
		>
			<Layers />
		</Button>
	{/if}
</CustomControl>

<style>
	:global(.maplibregl-ctrl .layer-toggle-btn:hover) {
		background-color: rgb(255 255 255) !important;
		color: rgb(15 23 42) !important;
	}
</style>
