<script lang="ts">
	import { Arc, BarChart, PieChart, Text } from 'layerchart';
	import * as Chart from '$lib/components/ui/chart/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { currentMessages } from '$lib/i18n';

	type LayerType = 'residence' | 'nationality';

	interface ChartRow {
		id: string;
		rank: number;
		name: string;
		count: number;
		country: string;
		region: string;
	}

	interface Props {
		data: ChartRow[];
		activeLayer: LayerType;
		topN?: number;
	}

	let { data, activeLayer, topN = 20 }: Props = $props();

	let t = $derived(currentMessages());
	/** Label of the dimension on the X axis / bar chart title. */
	let kindLabel = $derived(activeLayer === 'residence' ? t.chart.residence : t.chart.nationality);

	let selectedBar = $state<{ name: string; count: number } | null>(null);
	type PieDatum = {
		key: string;
		label: string;
		value: number;
		color: string;
	};

	let barChartConfig = $derived({
		count: {
			label: t.chart.attendeesLabel,
			color: '#2563eb'
		}
	} satisfies Chart.ChartConfig);

	const othersSliceColor = 'oklch(87.2% 0.01 258.338)';
	const spectralPalette = [
		'#9e0142',
		'#d53e4f',
		'#f46d43',
		'#fdae61',
		'#fee08b',
		'#ffffbf',
		'#e6f598',
		'#abdda4',
		'#66c2a5',
		'#3288bd',
		'#5e4fa2'
	];

	const getDistinctPieColor = (index: number, total: number) => {
		if (total <= spectralPalette.length) {
			const step = (spectralPalette.length - 1) / Math.max(total - 1, 1);
			const paletteIndex = Math.round(index * step);
			return spectralPalette[Math.min(paletteIndex, spectralPalette.length - 1)];
		}

		// If categories exceed Spectral stops, reuse the nearest stop deterministically.
		return spectralPalette[index % spectralPalette.length];
	};

	const aggregatePieData = (
		rows: ChartRow[],
		key: 'country' | 'region',
		options?: { maxSlices?: number; othersLabel?: string }
	): PieDatum[] => {
		const totals: Record<string, number> = {};

		for (const row of rows) {
			const raw = String(row[key] ?? '-').trim() || '-';
			totals[raw] = (totals[raw] ?? 0) + row.count;
		}

		const sorted = Object.entries(totals)
			.map(([label, value]) => ({ label, value }))
			.sort((a, b) => b.value - a.value);

		const maxSlices = options?.maxSlices;
		const othersLabel = options?.othersLabel ?? t.chart.others;
		let collapsed = sorted;
		if (maxSlices && sorted.length > maxSlices) {
			const head = sorted.slice(0, maxSlices - 1);
			const otherValue = sorted.slice(maxSlices - 1).reduce((sum, item) => sum + item.value, 0);
			collapsed = [...head, { label: othersLabel, value: otherValue }];
		}

		return collapsed.map((item, index) => ({
			key: `${key}-${String(index).padStart(3, '0')}`,
			label: item.label,
			value: item.value,
			color:
				item.label === othersLabel ? othersSliceColor : getDistinctPieColor(index, collapsed.length)
		}));
	};

	const toPieChartConfig = (pieData: PieDatum[]): Chart.ChartConfig => ({
		value: { label: t.chart.attendeesLabel },
		...Object.fromEntries(
			pieData.map((item) => [item.key, { label: item.label, color: item.color }])
		)
	});

	const formatDisplayLabel = (raw: string) => {
		const normalized = String(raw ?? '').trim();
		if (activeLayer !== 'residence') return normalized;
		return normalized.split(',')[0]?.trim() ?? normalized;
	};

	const formatAxisLabel = (raw: string) => {
		const label = formatDisplayLabel(raw);
		return label.slice(0, 14);
	};

	const formatPercent = (ratio: number) => {
		if (!Number.isFinite(ratio) || ratio <= 0) return '0%';
		const percent = ratio * 100;
		if (percent < 1) return '<1%';
		if (percent < 10) return `${percent.toFixed(1)}%`;
		return `${Math.round(percent)}%`;
	};

	let filteredData = $derived(data.filter((row) => row.name !== 'No answer'));
	let preparedChartData = $derived(filteredData.slice(0, topN));
	let chartCanvasMinWidth = $derived(Math.max(preparedChartData.length * 56, 640));
	let showCountryPie = $derived(activeLayer === 'residence');
	let countryPieData = $derived(
		aggregatePieData(filteredData, 'country', { maxSlices: 11, othersLabel: t.chart.others })
	);
	let regionPieData = $derived(aggregatePieData(filteredData, 'region'));
	let countryPieTotal = $derived(countryPieData.reduce((sum, item) => sum + item.value, 0));
	let regionPieTotal = $derived(regionPieData.reduce((sum, item) => sum + item.value, 0));
	let countryPieConfig = $derived(toPieChartConfig(countryPieData));
	let regionPieConfig = $derived(toPieChartConfig(regionPieData));
</script>

<div
	class={`chart-layout grid h-full min-h-0 grid-cols-1 gap-3 overflow-y-auto pr-1 pb-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:grid-rows-2 lg:overflow-hidden lg:pr-0 lg:pb-0 ${showCountryPie ? 'md:grid-cols-2' : ''}`}
>
	<Card.Root
		class={`chart-blue-bars flex min-h-90 min-w-0 flex-col py-4 lg:row-span-2 lg:min-h-0 ${showCountryPie ? 'md:col-span-2 lg:col-auto' : ''}`}
	>
		<Card.Header class="px-4">
			<Card.Title>{t.chart.topN(topN, kindLabel)}</Card.Title>
			<Card.Description>{t.chart.xAxis(kindLabel)}</Card.Description>
		</Card.Header>
		<Card.Content class="min-h-0 flex-1 px-4">
			<div
				class="chart-scroll-x h-full rounded-md border border-slate-100 bg-white/60"
				data-vaul-no-drag
				role="presentation"
				onpointerdown={(e) => e.stopPropagation()}
			>
				<div class="relative h-full" style={`min-width: ${chartCanvasMinWidth}px;`}>
					{#if selectedBar}
						<div
							class="absolute top-2 right-2 z-20 rounded-md border bg-white/95 p-3 text-xs shadow-md backdrop-blur-sm"
						>
							<div class="mb-1 font-semibold text-slate-800">{selectedBar.name}</div>
							<div class="text-slate-600">{t.chart.selectedAttendees(selectedBar.count)}</div>
						</div>
					{/if}

					<Chart.Container config={barChartConfig} class="h-full min-h-0 w-full">
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
		</Card.Content>
	</Card.Root>

	{#if showCountryPie}
		<Card.Root class="flex min-h-70 min-w-0 flex-col py-4 lg:min-h-0">
			<Card.Header class="px-4">
				<Card.Title>{t.chart.byCountry(10)}</Card.Title>
				<Card.Description>{t.chart.share}</Card.Description>
			</Card.Header>
			<Card.Content class="min-h-0 flex-1 px-4">
				<div class="pie-layout h-full max-h-70">
					<div class="pie-legend-scroll">
						{#each countryPieData as item (item.key)}
							<div class="pie-legend-item" title={item.label}>
								<span class="pie-legend-swatch" style={`background-color: ${item.color};`}></span>
								<span class="pie-legend-label"
									>{item.label} ({t.chart.attendeesCount(item.value.toLocaleString())}, {formatPercent(
										countryPieTotal > 0 ? item.value / countryPieTotal : 0
									)})</span
								>
							</div>
						{/each}
					</div>
					<Chart.Container config={countryPieConfig} class="mx-auto h-full w-full">
						<PieChart
							data={countryPieData}
							key="key"
							value="value"
							label={(d) => d.label}
							cRange={countryPieData.map((d) => d.color)}
							c="color"
							props={{
								pie: {
									motion: 'tween',
									sort: null
								}
							}}
						>
							{#snippet tooltip()}
								<Chart.Tooltip hideLabel>
									{#snippet formatter({ value, name, item })}
										{@const attendeeCount = Number(value ?? 0)}
										{@const ratio = countryPieTotal > 0 ? attendeeCount / countryPieTotal : 0}
										{@const resolvedItem = countryPieData.find((d) => d.key === String(item.key))}
										{@const resolvedName = resolvedItem?.label ?? name}
										{@const resolvedColor = resolvedItem?.color ?? '#94a3b8'}
										<div class="grid w-full gap-1">
											<div class="flex items-center justify-between gap-2">
												<span class="text-muted-foreground">{resolvedName}</span>
												<span
													class="inline-block size-2.5 rounded-xs"
													style={`background-color: ${resolvedColor};`}
												></span>
											</div>
											<div class="font-mono font-medium text-foreground tabular-nums">
												{t.chart.attendeesCount(attendeeCount.toLocaleString())}
											</div>
											<div class="font-mono text-muted-foreground tabular-nums">
												{formatPercent(ratio)}
											</div>
										</div>
									{/snippet}
								</Chart.Tooltip>
							{/snippet}
							{#snippet arc({ props, visibleData, index })}
								{@const total = visibleData.reduce((sum, item) => sum + Number(item.value ?? 0), 0)}
								{@const ratio = total > 0 ? Number(visibleData[index].value ?? 0) / total : 0}
								{@const percentLabel = formatPercent(ratio)}
								<Arc {...props}>
									{#snippet children({ getArcTextProps })}
										{#if ratio >= 0.06}
											<Text
												value={percentLabel}
												{...getArcTextProps('centroid')}
												font-size="10"
												class="fill-white"
											/>
										{/if}
									{/snippet}
								</Arc>
							{/snippet}
						</PieChart>
					</Chart.Container>
				</div>
			</Card.Content>
		</Card.Root>
	{/if}

	<Card.Root
		class={`flex min-h-70 min-w-0 flex-col py-4 lg:min-h-0 ${showCountryPie ? '' : 'lg:row-span-2'}`}
	>
		<Card.Header class="px-4">
			<Card.Title>{t.chart.byRegion}</Card.Title>
			<Card.Description>{t.chart.share}</Card.Description>
		</Card.Header>
		<Card.Content class="min-h-0 flex-1 px-4">
			<div class="pie-layout h-full max-h-70">
				<div class="pie-legend-scroll">
					{#each regionPieData as item (item.key)}
						<div class="pie-legend-item" title={item.label}>
							<span class="pie-legend-swatch" style={`background-color: ${item.color};`}></span>
							<span class="pie-legend-label"
								>{item.label} ({t.chart.attendeesCount(item.value.toLocaleString())}, {formatPercent(
									regionPieTotal > 0 ? item.value / regionPieTotal : 0
								)})</span
							>
						</div>
					{/each}
				</div>
				<Chart.Container config={regionPieConfig} class="mx-auto h-full w-full">
					<PieChart
						data={regionPieData}
						key="key"
						value="value"
						label={(d) => d.label}
						cRange={regionPieData.map((d) => d.color)}
						c="color"
						props={{
							pie: {
								motion: 'tween',
								sort: null
							}
						}}
					>
						{#snippet tooltip()}
							<Chart.Tooltip hideLabel>
								{#snippet formatter({ value, name, item })}
									{@const attendeeCount = Number(value ?? 0)}
									{@const ratio = regionPieTotal > 0 ? attendeeCount / regionPieTotal : 0}
									{@const resolvedItem = regionPieData.find((d) => d.key === String(item.key))}
									{@const resolvedName = resolvedItem?.label ?? name}
									{@const resolvedColor = resolvedItem?.color ?? '#94a3b8'}
									<div class="grid w-full gap-1">
										<div class="flex items-center justify-between gap-2">
											<span class="text-muted-foreground">{resolvedName}</span>
											<span
												class="inline-block size-2.5 rounded-xs"
												style={`background-color: ${resolvedColor};`}
											></span>
										</div>
										<div class="font-mono font-medium text-foreground tabular-nums">
											{t.chart.attendeesCount(attendeeCount.toLocaleString())}
										</div>
										<div class="font-mono text-muted-foreground tabular-nums">
											{formatPercent(ratio)}
										</div>
									</div>
								{/snippet}
							</Chart.Tooltip>
						{/snippet}
						{#snippet arc({ props, visibleData, index })}
							{@const total = visibleData.reduce((sum, item) => sum + Number(item.value ?? 0), 0)}
							{@const ratio = total > 0 ? Number(visibleData[index].value ?? 0) / total : 0}
							{@const percentLabel = formatPercent(ratio)}
							<Arc {...props}>
								{#snippet children({ getArcTextProps })}
									{#if ratio >= 0.05}
										<Text
											value={percentLabel}
											{...getArcTextProps('centroid')}
											font-size="10"
											class="fill-white"
										/>
									{/if}
								{/snippet}
							</Arc>
						{/snippet}
					</PieChart>
				</Chart.Container>
			</div>
		</Card.Content>
	</Card.Root>
</div>

<style>
	:global(.chart-blue-bars .stat-bar) {
		fill: #2563eb;
	}

	:global(.chart-blue-bars .stat-bar:hover) {
		fill: #1d4ed8;
	}

	.chart-scroll-x {
		overflow-x: auto;
		overflow-y: hidden;
		touch-action: pan-x;
		-webkit-overflow-scrolling: touch;
	}

	.pie-layout {
		display: grid;
		grid-template-columns: minmax(0, 9rem) minmax(0, 1fr);
		gap: 0.75rem;
		align-items: stretch;
	}

	.pie-legend-scroll {
		overflow-y: auto;
		overflow-x: hidden;
		border: 1px solid rgb(226 232 240);
		border-radius: 0.5rem;
		padding: 0.4rem;
		background: rgb(248 250 252 / 0.65);
	}

	.pie-legend-item {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.72rem;
		line-height: 1.25;
		padding: 0.2rem 0;
	}

	.pie-legend-swatch {
		width: 0.62rem;
		height: 0.62rem;
		border-radius: 2px;
		flex: none;
	}

	.pie-legend-label {
		min-width: 0;
		word-break: break-word;
	}

	@media (max-width: 767px) {
		.pie-layout {
			grid-template-columns: minmax(0, 7.25rem) minmax(0, 1fr);
		}
	}
</style>
