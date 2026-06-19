<script lang="ts">
	import ChartColumn from '@lucide/svelte/icons/chart-column';
	import { tick } from 'svelte';
	import { CustomControl, getMapContext } from 'svelte-maplibre-gl';
	import { Button } from './components/ui/button';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import * as ButtonGroup from '$lib/components/ui/button-group/index.js';
	import * as Chart from '$lib/components/ui/chart/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Spinner } from '$lib/components/ui/spinner/index.js';
	import { BarChart } from 'layerchart';
	import { geoJsonToChartData, type GeoJSONFeature } from '$lib/chartUtils';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	type LayerType = 'residence' | 'nationality';

	interface Props {
		residenceData?: GeoJSON.FeatureCollection<GeoJSON.Point, { count: number; name?: string }>;
		nationalityData?: GeoJSON.FeatureCollection<GeoJSON.Point, { count: number; name?: string }>;
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
	let preparedData = $state<{ id: string; rank: number; name: string; count: number }[]>([]);
	let selectedBar = $state<{ name: string; count: number } | null>(null);
	let viewMode = $state<'chart' | 'table'>('chart');
	let sortKey = $state<'name' | 'count'>('count');
	let sortDirection = $state<'asc' | 'desc'>('desc');

	const TOP_N = 20;

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
		selectedBar = null;
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

	const chartConfig = {
		count: {
			label: 'Attendees',
			color: '#2563eb'
		}
	} satisfies Chart.ChartConfig;

	const formatDisplayLabel = (raw: string) => {
		const normalized = String(raw ?? '').trim();
		if (activeLayer !== 'residence') return normalized;
		return normalized.split(',')[0]?.trim() ?? normalized;
	};

	const formatAxisLabel = (raw: string) => {
		const label = formatDisplayLabel(raw);
		return label.slice(0, 14);
	};

	const handleSort = (key: 'name' | 'count') => {
		if (sortKey === key) {
			sortDirection = sortDirection === 'desc' ? 'asc' : 'desc';
			return;
		}

		sortKey = key;
		sortDirection = key === 'count' ? 'desc' : 'asc';
	};

	const sortIndicator = (key: 'name' | 'count') => {
		if (sortKey !== key) return '';
		return sortDirection === 'desc' ? '↓' : '↑';
	};

	let preparedChartData = $derived(preparedData.slice(0, TOP_N));
	let chartCanvasMinWidth = $derived(Math.max(preparedChartData.length * 56, 640));
	let preparedTableData = $derived(
		[...preparedData].sort((a, b) => {
			if (sortKey === 'count') {
				return sortDirection === 'desc' ? b.count - a.count : a.count - b.count;
			}

			return sortDirection === 'desc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
		})
	);
	let preparedTotalAttendees = $derived(preparedData.reduce((sum, row) => sum + row.count, 0));
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
								<div class="flex h-full min-h-0 flex-col">
									<p class="mb-2 shrink-0 text-xs text-gray-500">
										X-axis: {activeLayer === 'residence' ? 'Residence' : 'Nationality'} (Top {TOP_N})
									</p>
									<div class="chart-blue-bars relative min-h-0 flex-1 w-full">
										<div
											class="chart-scroll-x h-full rounded-md border border-slate-100 bg-white/60"
											data-vaul-no-drag
											role="presentation"
											onpointerdown={(e) => e.stopPropagation()}
										>
											<div class="relative h-full" style={`min-width: ${chartCanvasMinWidth}px;`}>
												{#if selectedBar}
													<div
														class="absolute right-2 top-2 z-20 rounded-md border bg-white/95 p-3 text-xs shadow-md backdrop-blur-sm"
													>
														<div class="mb-1 font-semibold text-slate-800">{selectedBar.name}</div>
														<div class="text-slate-600">Attendees: {selectedBar.count}</div>
													</div>
												{/if}

												<Chart.Container config={chartConfig} class="h-full min-h-0 w-full">
													<BarChart
														data={preparedChartData}
														x="name"
														y="count"
														axis={true}
														padding={{ top: 20, right: 16, left: 52, bottom: 132 }}
														tooltipContext={{
															mode: 'band',
															findTooltipData: 'closest',
															hideDelay: 80,
															touchEvents: 'pan-x'
														}}
														onBarClick={(_, detail) => {
															const item = detail.data as { name?: string; count?: number };
															selectedBar = {
																name: formatDisplayLabel(String(item?.name ?? '-')),
																count: Number(item?.count ?? 0)
															};
														}}
														props={{
															xAxis: {
																tickLabelProps: {
																	rotate: 60,
																	textAnchor: 'start',
																	dx: '1.3em',
																	dy: '0.4em',
																	dominantBaseline: 'hanging'
																},
																format: (d: string) => formatAxisLabel(d)
															},
															bars: {
																fill: '#2563eb',
																class: 'stat-bar',
																style: 'transition: fill 140ms ease;'
															}
														}}
													>
														{#snippet tooltip()}
															<Chart.Tooltip labelKey="name" nameKey="name" color="#2563eb" />
														{/snippet}
													</BarChart>
												</Chart.Container>
											</div>
										</div>
									</div>
								</div>
							</Tabs.Content>

							<Tabs.Content value="table" class="mt-3 min-h-0 flex-1">
								<div class="flex h-full min-h-0 flex-col">
									<p class="mb-2 shrink-0 text-xs text-gray-500">
										Sorted by {sortKey === 'count' ? 'attendee count' : 'name'} ({sortDirection}): {preparedData.length}
										rows
									</p>
									<div class="table-scroll min-h-0 flex-1 rounded-md border">
										<Table.Root>
											<Table.Header class="sticky top-0 z-20 bg-white">
												<Table.Row>
													<Table.Head class="sticky top-0 z-20 w-16 bg-white text-right"
														>#</Table.Head
													>
													<Table.Head class="sticky top-0 z-20 bg-white">
														<button
															type="button"
															onclick={() => handleSort('name')}
															class="inline-flex cursor-pointer items-center gap-1 text-left"
														>
															<span
																>{activeLayer === 'residence'
																	? 'Residence'
																	: 'Nationality'}{sortIndicator('name')
																	? ` ${sortIndicator('name')}`
																	: ''}</span
															>
														</button>
													</Table.Head>
													<Table.Head class="sticky top-0 z-20 bg-white text-right">
														<button
															type="button"
															onclick={() => handleSort('count')}
															class="ml-auto inline-flex cursor-pointer items-center gap-1"
														>
															<span
																>Attendees{sortIndicator('count')
																	? ` ${sortIndicator('count')}`
																	: ''}</span
															>
														</button>
													</Table.Head>
												</Table.Row>
											</Table.Header>
											<Table.Body>
												{#each preparedTableData as row (row.id)}
													<Table.Row>
														<Table.Cell class="text-right font-mono text-xs text-gray-600">
															{row.rank}
														</Table.Cell>
														<Table.Cell class="max-w-[320px] truncate" title={row.name}>
															{row.name}
														</Table.Cell>
														<Table.Cell class="text-right font-semibold">
															{row.count}
														</Table.Cell>
													</Table.Row>
												{/each}
											</Table.Body>
										</Table.Root>
									</div>
									<div class="mt-3 shrink-0 rounded-md border bg-gray-50 px-3 py-2 text-sm">
										<div class="flex items-center justify-between">
											<span class="font-medium text-slate-700">Total</span>
											<span class="font-semibold text-slate-900">{preparedTotalAttendees}</span>
										</div>
									</div>
								</div>
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

	:global(.chart-blue-bars .stat-bar) {
		fill: #2563eb;
	}

	:global(.chart-blue-bars .stat-bar:hover) {
		fill: #1d4ed8;
	}

	:global(.table-scroll [data-slot='table-container']) {
		height: 100%;
		max-height: none;
		overflow-y: auto;
	}

	.chart-scroll-x {
		overflow-x: auto;
		overflow-y: hidden;
		touch-action: pan-x;
		-webkit-overflow-scrolling: touch;
	}
</style>
