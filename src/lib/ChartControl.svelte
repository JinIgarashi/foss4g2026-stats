<script lang="ts">
	import ChartColumn from '@lucide/svelte/icons/chart-column';
	import { tick } from 'svelte';
	import { CustomControl, getMapContext } from 'svelte-maplibre-gl';
	import { Button } from './components/ui/button';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import * as ButtonGroup from '$lib/components/ui/button-group/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { Spinner } from '$lib/components/ui/spinner/index.js';
	import { geoJsonToChartData, type GeoJSONFeature } from '$lib/chartUtils';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import ChartView from '$lib/ChartView.svelte';
	import TableView from '$lib/TableView.svelte';

	type LayerType = 'residence' | 'nationality';

	interface Props {
		residenceData?: GeoJSON.FeatureCollection<
			GeoJSON.Point,
			{ count: number; name?: string; country?: string; region?: string }
		>;
		nationalityData?: GeoJSON.FeatureCollection<
			GeoJSON.Point,
			{ count: number; name?: string; country?: string; region?: string }
		>;
		activeLayer?: LayerType;
	}

	let {
		residenceData,
		nationalityData,
		activeLayer = $bindable<LayerType>('residence')
	}: Props = $props();

	// UI state
	let scopeType = $state<'all' | 'extent'>('all');
	let drawerOpen = $state(false);
	let isPreparing = $state(false);
	let mapExtent = $state<[number, number, number, number] | null>(null);
	let preparedData = $state<
		{ id: string; rank: number; name: string; count: number; country: string; region: string }[]
	>([]);
	let viewMode = $state<'chart' | 'table'>('chart');

	const mapCtx = getMapContext();

	const updateMapExtent = () => {
		const map = mapCtx?.map;
		if (!map) return;

		const bounds = map.getBounds();
		mapExtent = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()];
	};

	const handleDrawerOpenChange = (open: boolean) => {
		drawerOpen = open;
		if (open) {
			updateMapExtent();
			void prepareChartData();
		}
	};

	const filterByExtent = (features: GeoJSONFeature[]) => {
		if (!mapExtent) return features;

		const [west, south, east, north] = mapExtent;
		return features.filter((feature) => {
			const [lng, lat] = feature.geometry.coordinates;
			return lng >= west && lng <= east && lat >= south && lat <= north;
		});
	};

	const getActiveFeatures = () => {
		const data = activeLayer === 'residence' ? residenceData : nationalityData;
		if (!data || !data.features) return [] as GeoJSONFeature[];
		return data.features as GeoJSONFeature[];
	};

	const getCurrentData = () => {
		let features = getActiveFeatures();

		if (scopeType === 'extent' && mapExtent) {
			features = filterByExtent(features);
		}

		const chartData = geoJsonToChartData(features).map((item, index) => ({
			id: `${item.name}:${index}`,
			rank: index + 1,
			...item,
			name: formatDisplayLabel(item.name)
		}));

		return chartData;
	};

	const prepareChartData = async () => {
		isPreparing = true;
		await tick();

		if (scopeType === 'extent') {
			updateMapExtent();
		}

		const data = getCurrentData();
		preparedData = data;

		isPreparing = false;
	};

	$effect(() => {
		if (!drawerOpen) return;
		void prepareChartData();
	});

	const formatDisplayLabel = (raw: string) => {
		const normalized = String(raw ?? '').trim();
		if (activeLayer !== 'residence') return normalized;
		return normalized.split(',')[0]?.trim() ?? normalized;
	};
</script>

<CustomControl position="top-left" group={false}>
	<Drawer.Root bind:open={drawerOpen} onOpenChange={handleDrawerOpenChange}>
		<Drawer.Trigger>
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button
							variant="outline"
							size="icon"
							class="layer-toggle-btn border-slate-200 bg-white/90 text-slate-900 shadow-sm backdrop-blur-sm cursor-pointer hover:bg-white hover:text-slate-900"
						>
							<ChartColumn />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>Show attendee statistics chart</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
		</Drawer.Trigger>
		<Drawer.Content class="h-[85dvh] max-h-[85dvh] p-0">
			<div class="flex h-full min-h-0 flex-col">
				<Drawer.Header class="shrink-0">
					<Drawer.Title>Attendee statistics</Drawer.Title>
					<Drawer.Description class="space-y-4">
						{#if isPreparing}
							<div class="flex items-center gap-2 text-sm text-gray-500">
								<Spinner class="size-4" />
								Preparing chart data...
							</div>
						{/if}

						<!-- Chart Type Selector -->
						<div class="mt-4">
							<div class="flex items-center gap-1">
								<p class="w-20 shrink-0 pr-1 text-right text-sm font-medium text-gray-700">
									Data type:
								</p>
								<ButtonGroup.Root>
									<Button
										variant={activeLayer === 'residence' ? 'default' : 'outline'}
										size="sm"
										onclick={() => {
											activeLayer = 'residence';
											if (drawerOpen) void prepareChartData();
										}}
										class="cursor-pointer"
									>
										Residence
									</Button>
									<Button
										variant={activeLayer === 'nationality' ? 'default' : 'outline'}
										size="sm"
										onclick={() => {
											activeLayer = 'nationality';
											if (drawerOpen) void prepareChartData();
										}}
										class="cursor-pointer"
									>
										Nationality
									</Button>
								</ButtonGroup.Root>
							</div>
						</div>

						<!-- Scope Selector -->
						<div>
							<div class="flex items-center gap-1">
								<p class="w-20 shrink-0 pr-1 text-right text-sm font-medium text-gray-700">Area:</p>
								<ButtonGroup.Root>
									<Button
										variant={scopeType === 'all' ? 'default' : 'outline'}
										size="sm"
										onclick={() => {
											scopeType = 'all';
											if (drawerOpen) void prepareChartData();
										}}
										class="cursor-pointer"
									>
										All
									</Button>
									<Button
										variant={scopeType === 'extent' ? 'default' : 'outline'}
										size="sm"
										onclick={() => {
											updateMapExtent();
											scopeType = 'extent';
											if (drawerOpen) void prepareChartData();
										}}
										class="cursor-pointer"
									>
										Current extent
									</Button>
								</ButtonGroup.Root>
							</div>
						</div>
					</Drawer.Description>
				</Drawer.Header>

				<!-- Chart -->
				<div class="min-h-0 flex-1 px-4">
					{#if isPreparing}
						<div class="flex h-full min-h-75 items-center justify-center">
							<div class="flex items-center gap-2 text-sm text-gray-500">
								<Spinner />
								Preparing chart...
							</div>
						</div>
					{:else if preparedData.length > 0}
						<Tabs.Root bind:value={viewMode} class="flex h-full min-h-0 w-full flex-col">
							<Tabs.List class="grid w-full shrink-0 grid-cols-2">
								<Tabs.Trigger value="chart" class="cursor-pointer">Chart</Tabs.Trigger>
								<Tabs.Trigger value="table" class="cursor-pointer">Table</Tabs.Trigger>
							</Tabs.List>

							<Tabs.Content value="chart" class="mt-3 min-h-0 flex-1">
								<ChartView data={preparedData} {activeLayer} />
							</Tabs.Content>

							<Tabs.Content value="table" class="mt-3 min-h-0 flex-1">
								<TableView data={preparedData} {activeLayer} />
							</Tabs.Content>
						</Tabs.Root>
					{:else}
						<div class="flex h-full min-h-75 items-center justify-center text-gray-500">
							<p>No data available in this range</p>
						</div>
					{/if}
				</div>
			</div>
		</Drawer.Content>
	</Drawer.Root>
</CustomControl>

<style>
	:global(.maplibregl-ctrl .layer-toggle-btn:hover) {
		background-color: rgb(255 255 255) !important;
		color: rgb(15 23 42) !important;
	}
</style>
