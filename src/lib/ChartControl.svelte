<script lang="ts">
	import ChartColumn from '@lucide/svelte/icons/chart-column';
	import Table from '@lucide/svelte/icons/table';
	import { tick } from 'svelte';
	import { CustomControl, getMapContext } from 'svelte-maplibre-gl';
	import { Button } from './components/ui/button';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import * as ButtonGroup from '$lib/components/ui/button-group/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { Spinner } from '$lib/components/ui/spinner/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import {
		geoJsonToChartData,
		type ChartRow,
		type GeoJSONFeature,
		type LocationProperties
	} from '$lib/chartUtils';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import ChartView from '$lib/ChartView.svelte';
	import EditionsView from '$lib/EditionsView.svelte';
	import EditionsTable from '$lib/EditionsTable.svelte';
	import TableView from '$lib/TableView.svelte';
	import { currentLocale, currentMessages } from '$lib/i18n';
	import { localizeCountry } from '$lib/i18n/display-names';
	import { localizeRegion } from '$lib/i18n/regions';
	import { NATIONALITY_LANGUAGES } from '$lib/i18n/nationality-languages';

	type LayerType = 'residence' | 'nationality';
	/**
	 * The drawer's top-level navigation is the *dataset*, not the view mode:
	 * `residence` and `nationality` come from the map, `editions` is the static
	 * historical table and shares none of the map filters.
	 */
	type Section = LayerType | 'editions';

	interface Props {
		residenceData?: GeoJSON.FeatureCollection<GeoJSON.Point, LocationProperties>;
		nationalityData?: GeoJSON.FeatureCollection<GeoJSON.Point, LocationProperties>;
		activeLayer?: LayerType;
	}

	let {
		residenceData,
		nationalityData,
		activeLayer = $bindable<LayerType>('residence')
	}: Props = $props();

	let t = $derived(currentMessages());
	let locale = $derived(currentLocale());

	// UI state
	let scopeType = $state<'all' | 'extent'>('all');
	let excludeJapan = $state(false);
	let drawerOpen = $state(false);
	let isPreparing = $state(false);
	let mapExtent = $state<[number, number, number, number] | null>(null);
	let preparedData = $state<ChartRow[]>([]);
	let viewMode = $state<'chart' | 'table'>('chart');
	let section = $state<Section>('residence');
	let includeOnline = $state(false);
	/** The editions section keeps its own chart/table switch: it shares none of
	 *  the map filters, and switching dataset tabs should not reset it. */
	let editionsViewMode = $state<'chart' | 'table'>('chart');

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

	/**
	 * Switching between the two map datasets also switches the map layer, which
	 * is what `activeLayer` is bound to. `editions` is not a map layer, so it
	 * deliberately leaves the map alone.
	 */
	const handleSectionChange = (value: string) => {
		section = value as Section;
		if (section === 'editions') return;

		activeLayer = section;
		if (drawerOpen) void prepareChartData();
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

		if (excludeJapan) {
			features = features.filter((feature) => feature.properties.country !== 'Japan');
		}

		const chartData: ChartRow[] = geoJsonToChartData(features).map((item, index) => ({
			...item,
			id: `${item.name}:${index}`,
			rank: index + 1,
			nameLabel: formatDisplayLabel(item.name, item.iso),
			countryLabel: localizeCountry(item.iso, item.country, locale),
			regionLabel: localizeRegion(item.region, t)
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
		// `locale` is read here rather than only inside the async body, whose reads
		// happen after `await tick()` and so are not tracked.
		void locale;
		void prepareChartData();
	});

	/**
	 * The display label for the first column.
	 *
	 * Residence is free text ("Bansud, Philippines", "Perth, Australia, Perth"),
	 * so it is only trimmed to the part before the first comma — never
	 * translated. Nationality is effectively a country list, so it is localized
	 * from its ISO code, preferring the hand-maintained one in
	 * `NATIONALITY_LANGUAGES` over the code derived from the point: `No answer`
	 * sits at Null Island and is tagged `France` / `FR` by the spatial join.
	 */
	const formatDisplayLabel = (raw: string, iso: string | undefined) => {
		const normalized = String(raw ?? '').trim();
		if (activeLayer === 'residence') return normalized.split(',')[0]?.trim() ?? normalized;

		const entry = NATIONALITY_LANGUAGES[normalized as keyof typeof NATIONALITY_LANGUAGES];
		if (!entry) return normalized;

		return localizeCountry(entry.iso ?? iso, normalized, locale);
	};
</script>

<!--
	The map filters (`area`, `excludeJapan`) and the chart/table switch live in
	this one toolbar rather than in the drawer header, so they show up only for
	the sections they actually apply to and the charts keep the height back.
-->
{#snippet mapToolbar()}
	<div class="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-2">
		<ButtonGroup.Root aria-label={t.chart.area}>
			<Button
				variant={scopeType === 'all' ? 'default' : 'outline'}
				size="sm"
				onclick={() => {
					scopeType = 'all';
					if (drawerOpen) void prepareChartData();
				}}
				class="cursor-pointer"
			>
				{t.chart.all}
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
				{t.chart.currentExtent}
			</Button>
		</ButtonGroup.Root>

		<div class="flex items-center gap-2">
			<Switch
				id="exclude-japan"
				checked={excludeJapan}
				onCheckedChange={(checked: boolean) => {
					excludeJapan = checked;
					if (drawerOpen) void prepareChartData();
				}}
				class="cursor-pointer"
			/>
			<Label for="exclude-japan" class="cursor-pointer text-sm text-foreground">
				{t.chart.excludeJapan}
			</Label>
		</div>

		<div class="ms-auto">
			<ButtonGroup.Root>
				<Button
					variant={viewMode === 'chart' ? 'default' : 'outline'}
					size="sm"
					onclick={() => (viewMode = 'chart')}
					aria-label={t.chart.tabChart}
					title={t.chart.tabChart}
					class="cursor-pointer"
				>
					<ChartColumn class="size-4" />
					{t.chart.tabChart}
				</Button>
				<Button
					variant={viewMode === 'table' ? 'default' : 'outline'}
					size="sm"
					onclick={() => (viewMode = 'table')}
					aria-label={t.chart.tabTable}
					title={t.chart.tabTable}
					class="cursor-pointer"
				>
					<Table class="size-4" />
					{t.chart.tabTable}
				</Button>
			</ButtonGroup.Root>
		</div>
	</div>
{/snippet}

{#snippet mapSection(layer: LayerType)}
	<div class="flex h-full min-h-0 flex-col gap-3">
		{@render mapToolbar()}

		<div class="min-h-0 flex-1">
			{#if isPreparing}
				<div class="flex h-full min-h-75 items-center justify-center">
					<div class="flex items-center gap-2 text-sm text-muted-foreground">
						<Spinner />
						{t.chart.preparing}
					</div>
				</div>
			{:else if preparedData.length > 0}
				{#if viewMode === 'chart'}
					<ChartView data={preparedData} activeLayer={layer} />
				{:else}
					<TableView data={preparedData} activeLayer={layer} />
				{/if}
			{:else}
				<div class="flex h-full min-h-75 items-center justify-center text-muted-foreground">
					<p>{t.chart.noData}</p>
				</div>
			{/if}
		</div>
	</div>
{/snippet}

<CustomControl position="top-left" group={false}>
	<Drawer.Root bind:open={drawerOpen} onOpenChange={handleDrawerOpenChange}>
		<Drawer.Trigger>
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button
							variant="outline"
							size="icon"
							class="map-ctrl-btn cursor-pointer shadow-sm backdrop-blur-sm"
						>
							<ChartColumn />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>{t.chart.show}</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
		</Drawer.Trigger>
		<Drawer.Content class="h-[85dvh] max-h-[85dvh] p-0">
			<Tabs.Root
				value={section}
				onValueChange={handleSectionChange}
				class="flex h-full min-h-0 flex-col gap-0"
			>
				<Drawer.Header class="shrink-0 pb-2">
					<div class="flex items-center gap-2">
						<Drawer.Title>{t.chart.title}</Drawer.Title>
						{#if isPreparing}
							<Spinner class="size-4 text-muted-foreground" />
						{/if}
					</div>
					<Drawer.Description class="sr-only">{t.chart.show}</Drawer.Description>
					<Tabs.List class="mt-2 grid w-full grid-cols-3">
						<Tabs.Trigger value="residence" class="cursor-pointer">
							{t.chart.residence}
						</Tabs.Trigger>
						<Tabs.Trigger value="nationality" class="cursor-pointer">
							{t.chart.nationality}
						</Tabs.Trigger>
						<Tabs.Trigger value="editions" class="cursor-pointer">
							{t.chart.editions.tab}
						</Tabs.Trigger>
					</Tabs.List>
				</Drawer.Header>

				<div class="min-h-0 flex-1 px-4 pb-2">
					<Tabs.Content value="residence" class="mt-1 h-full min-h-0">
						{@render mapSection('residence')}
					</Tabs.Content>

					<Tabs.Content value="nationality" class="mt-1 h-full min-h-0">
						{@render mapSection('nationality')}
					</Tabs.Content>

					<Tabs.Content value="editions" class="mt-1 h-full min-h-0">
						<div class="flex h-full min-h-0 flex-col gap-3">
							<div class="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-2">
								<!-- The table lists in-person and online in their own columns, so
								     the toggle only means something for the chart. -->
								{#if editionsViewMode === 'chart'}
									<ButtonGroup.Root>
										<Button
											variant={includeOnline ? 'outline' : 'default'}
											size="sm"
											onclick={() => (includeOnline = false)}
											class="cursor-pointer"
										>
											{t.chart.editions.inPersonOnly}
										</Button>
										<Button
											variant={includeOnline ? 'default' : 'outline'}
											size="sm"
											onclick={() => (includeOnline = true)}
											class="cursor-pointer"
										>
											{t.chart.editions.includeOnline}
										</Button>
									</ButtonGroup.Root>
								{/if}

								<div class="ms-auto">
									<ButtonGroup.Root>
										<Button
											variant={editionsViewMode === 'chart' ? 'default' : 'outline'}
											size="sm"
											onclick={() => (editionsViewMode = 'chart')}
											aria-label={t.chart.tabChart}
											title={t.chart.tabChart}
											class="cursor-pointer"
										>
											<ChartColumn class="size-4" />
											{t.chart.tabChart}
										</Button>
										<Button
											variant={editionsViewMode === 'table' ? 'default' : 'outline'}
											size="sm"
											onclick={() => (editionsViewMode = 'table')}
											aria-label={t.chart.tabTable}
											title={t.chart.tabTable}
											class="cursor-pointer"
										>
											<Table class="size-4" />
											{t.chart.tabTable}
										</Button>
									</ButtonGroup.Root>
								</div>
							</div>

							<div class="min-h-0 flex-1">
								{#if editionsViewMode === 'chart'}
									<EditionsView {nationalityData} {includeOnline} />
								{:else}
									<EditionsTable {nationalityData} />
								{/if}
							</div>
						</div>
					</Tabs.Content>
				</div>
			</Tabs.Root>
		</Drawer.Content>
	</Drawer.Root>
</CustomControl>
