<script lang="ts">
	import { BarChart } from 'layerchart';
	import * as Chart from '$lib/components/ui/chart/index.js';

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

	let selectedBar = $state<{ name: string; count: number } | null>(null);

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

	let preparedChartData = $derived(data.slice(0, topN));
	let chartCanvasMinWidth = $derived(Math.max(preparedChartData.length * 56, 640));
</script>

<div class="flex h-full min-h-0 flex-col">
	<p class="mb-2 shrink-0 text-xs text-gray-500">
		X-axis: {activeLayer === 'residence' ? 'Residence' : 'Nationality'} (Top {topN})
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
</style>
