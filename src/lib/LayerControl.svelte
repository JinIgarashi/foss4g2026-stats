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
	import { currentLocaleDefinition, currentMessages } from '$lib/i18n';

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

	let t = $derived(currentMessages());
	let localeDef = $derived(currentLocaleDefinition());

	// `stats.createdAt` is a raw ISO timestamp so it can be formatted per locale here.
	let createdAtLabel = $derived.by(() => {
		if (!stats.createdAt) return '';
		return new Date(stats.createdAt).toLocaleDateString(localeDef.dateLocale, {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	});

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

<!-- Map control corners stay physical even in RTL: MapLibre does not mirror
     them, and map chrome conventionally keeps its position. Only the content
     inside the panel uses logical properties. -->
<CustomControl position="top-left" group={false}>
	{#if layerPanelOpen}
		<Card.Root class="w-80 py-4">
			<Card.Header class="flex flex-row items-center justify-between">
				<Card.Title><Layers size={16} class="me-2 inline-block" />{t.layers.title}</Card.Title>
				<Button
					variant="ghost"
					size="icon"
					class="cursor-pointer"
					aria-label={t.layers.close}
					onclick={() => (layerPanelOpen = false)}
				>
					<X size={16} />
				</Button>
			</Card.Header>
			<Card.Content>
				<div class="flex items-center justify-between gap-3 text-sm text-muted-foreground">
					<Label for="layer-residence" class="cursor-pointer">
						<span>
							<MapPinHouse size={14} />
						</span>
						{t.layers.residence}
					</Label>
					<Switch
						id="layer-residence"
						checked={activeLayer === 'residence'}
						onCheckedChange={(checked: boolean) => {
							setLayer(checked ? 'residence' : 'nationality');
						}}
					/>
				</div>
				<div class="mt-2 flex items-center justify-between gap-3 text-sm text-muted-foreground">
					<Label for="layer-nationality" class="cursor-pointer">
						<span>
							<MapPinned size={14} />
						</span>
						{t.layers.nationality}
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
				<Card.Footer class="text-start">
					<div class="flex w-full items-start gap-2">
						<div class="min-w-0">
							<p class="text-xs text-foreground">
								<UserRound size={14} class="inline-block align-[-2px]" />
								<span class="font-semibold">
									{t.layers.attendees(
										activeLayer === 'residence'
											? stats.residenceAttendees
											: stats.nationalityAttendees
									)}
								</span>
								<Flag size={14} class="inline-block align-[-2px]" />
								{t.layers.places(
									activeLayer === 'residence' ? stats.residenceLocations : stats.nationalityCount,
									activeLayer
								)}
							</p>

							{#if createdAtLabel}
								<p class="text-xs text-foreground">
									{t.layers.asOf(createdAtLabel)}
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
									class={buttonVariants({ variant: 'ghost', size: 'icon' }) + ' ms-auto shrink-0'}
									aria-label={t.layers.about}
									onclick={openInfo}
								>
									<Info />
								</Tooltip.Trigger>
								<Tooltip.Content class="max-w-64 text-xs leading-relaxed">
									<p>{t.layers.aboutText}</p>
								</Tooltip.Content>
							</Tooltip.Root>
						</Tooltip.Provider>
					</div>
				</Card.Footer>
			{/if}
		</Card.Root>
	{:else}
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<Button
						variant="outline"
						size="icon"
						class="map-ctrl-btn cursor-pointer shadow-sm backdrop-blur-sm"
						onclick={() => (layerPanelOpen = true)}
					>
						<Layers />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>{t.layers.show}</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	{/if}
</CustomControl>
