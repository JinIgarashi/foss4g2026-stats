<script lang="ts">
	import { Axis, BarChart, Bars, Circle, Spline, getChartContext } from 'layerchart';
	import * as Chart from '$lib/components/ui/chart/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { FOSS4G_EDITIONS, editionSplit } from '$lib/data/foss4g-editions';
	import { buildEditionRows, type EditionRow } from '$lib/editionRows';
	import type { LocationProperties } from '$lib/chartUtils';
	import { currentLocale, currentMessages } from '$lib/i18n';

	interface Props {
		/** This year's registrations by nationality — the complete count, including
		 *  the attendees who left the residence question blank. Used to plot the
		 *  2026 entry alongside past editions. */
		nationalityData?: GeoJSON.FeatureCollection<GeoJSON.Point, LocationProperties>;
		/** Whether fully-online editions and the online half of hybrid ones are counted. */
		includeOnline?: boolean;
	}

	let { nationalityData, includeOnline = false }: Props = $props();

	/** `ChartState` is not exported from layerchart's barrel, so it is recovered
	 *  from the accessor the library does export. */
	type MarksContext = ReturnType<typeof getChartContext>;

	let t = $derived(currentMessages());
	let locale = $derived(currentLocale());

	const HOST_COLOR = '#3288bd';
	const INTERNATIONAL_COLOR = '#fdae61';
	/** Deliberately outside the two category colours: the line reads as an
	 *  overlay on the split rather than a third slice of it. */
	const TOTAL_COLOR = '#2f9e44';
	/** 2026 is marked in a darker shade of the line's own green — it is set apart
	 *  by size, not by a colour that would need its own legend entry. */
	const CURRENT_COLOR = '#1b5e20';
	/** Neutral grey on purpose: the registrations the breakdown cannot place are
	 *  a hole in the data, not a third kind of attendee. */
	const UNKNOWN_COLOR = '#94a3b8';

	let rows = $derived(buildEditionRows(nationalityData, includeOnline, locale));

	/** The editions that have a figure to plot: the line's markers, and the points
	 *  the dashed bridge is drawn through. */
	let rowsWithFigures = $derived(rows.filter((row) => row.total > 0));

	/** The line's own scale. `|| 1` keeps the divisor safe before data arrives. */
	let totalMax = $derived(Math.max(...rows.map((row) => row.total), 0) || 1);

	let rowByTick = $derived(new Map(rows.map((row) => [row.tickLabel, row])));

	/** The editions the split cannot cover, named in the footnote. */
	let missingSplitYears = $derived(
		FOSS4G_EDITIONS.filter((edition) => !edition.cancelled && !editionSplit(edition))
			.map((edition) => edition.year)
			.join(', ')
	);

	/** Editions whose host + international fall short of the registrations they
	 *  reported (2010 and 2023): the bar is a share of what is known, not of the
	 *  total, which the footnote says out loud. */
	let partialSplitYears = $derived(
		rows
			.filter((row) => row.hasSplit && row.host + row.international < row.registrations)
			.map((row) => row.year)
			.join(', ')
	);

	let cancelledYears = $derived(
		FOSS4G_EDITIONS.filter((edition) => edition.cancelled)
			.map((edition) => edition.year)
			.join(', ')
	);

	let config = $derived({
		host: { label: t.chart.editions.hostCountry, color: HOST_COLOR },
		international: { label: t.chart.editions.international, color: INTERNATIONAL_COLOR },
		unknown: { label: t.chart.editions.unknown, color: UNKNOWN_COLOR }
	} satisfies Chart.ChartConfig);

	/** Stacked in this order, so the grey slice the breakdown cannot place sits on
	 *  top of the two it is not part of. */
	let series = $derived([
		{ key: 'host', label: t.chart.editions.hostCountry, color: HOST_COLOR },
		{ key: 'international', label: t.chart.editions.international, color: INTERNATIONAL_COLOR },
		{ key: 'unknown', label: t.chart.editions.unknown, color: UNKNOWN_COLOR }
	]);

	/** 56px per band matches `ChartView`, and keeps the whole chart — including
	 *  both count and share axes — inside a desktop drawer without horizontal
	 *  scrolling. */
	let canvasMinWidth = $derived(Math.max(rows.length * 56, 640));

	const formatPercent = (ratio: number) => `${Math.round(ratio * 100)}%`;
	let formatCount = $derived((value: number) => value.toLocaleString(locale));
</script>

<div class="flex h-full min-h-0 flex-col">
	<Card.Root class="flex h-full min-h-0 min-w-0 flex-col py-4">
		<Card.Header class="px-4">
			<Card.Title>{t.chart.editions.title}</Card.Title>
			<Card.Description>{t.chart.editions.splitDesc}</Card.Description>
		</Card.Header>
		<Card.Content class="flex min-h-0 flex-1 flex-col px-4">
			<div class="editions-legend shrink-0">
				<span class="editions-legend-item">
					<span class="editions-legend-swatch" style={`background-color: ${HOST_COLOR};`}></span>
					{t.chart.editions.hostCountry}
				</span>
				<span class="editions-legend-item">
					<span class="editions-legend-swatch" style={`background-color: ${INTERNATIONAL_COLOR};`}
					></span>
					{t.chart.editions.international}
				</span>
				<span class="editions-legend-item">
					<span class="editions-legend-swatch" style={`background-color: ${UNKNOWN_COLOR};`}></span>
					{t.chart.editions.unknown}
				</span>
				<span class="editions-legend-item">
					<span class="editions-legend-line" style={`background-color: ${TOTAL_COLOR};`}></span>
					{t.chart.attendeesLabel}
				</span>
			</div>

			<!-- Same `dir="ltr"` reasoning as `ChartView`: the plot is a left-to-right
			     coordinate system and the rotated tick labels are anchored at their
			     start, which SVG resolves to the right edge under RTL. The
			     `data-vaul-no-drag` pair keeps a horizontal swipe scrolling the chart
			     instead of dismissing the drawer. -->
			<div
				dir="ltr"
				class="chart-scroll-x min-h-0 flex-1 rounded-md border border-border bg-card/60"
				data-vaul-no-drag
				role="presentation"
				onpointerdown={(e) => e.stopPropagation()}
			>
				<!-- `px-3`: the axis labels are drawn flush against the SVG's own edge
				     (layerchart places them at `-padding.left` / `width + padding.right`),
				     so the breathing room has to come from outside the canvas. -->
				<div class="relative h-full px-3" style={`min-width: ${canvasMinWidth}px;`}>
					<Chart.Container {config} class="h-full min-h-0 w-full">
						<BarChart
							data={rows}
							x="tickLabel"
							{series}
							seriesLayout="stackExpand"
							axis={true}
							yDomain={[0, 1]}
							padding={{ top: 16, right: 56, left: 72, bottom: 120 }}
							tooltipContext={{
								mode: 'band',
								findTooltipData: 'closest',
								hideDelay: 80,
								touchEvents: 'pan-x'
							}}
							props={{
								xAxis: {
									tickLabelProps: {
										rotate: 60,
										textAnchor: 'start',
										dx: '1.3em',
										dy: '0.4em',
										dominantBaseline: 'hanging'
									}
								},
								/* The chart's own scale is the [0, 1] share, so it labels the
								   right-hand axis; the left-hand one is the attendee count
								   drawn in `marks`. `placement` is spread after the default,
								   so passing it here overrides it. */
								yAxis: {
									placement: 'right',
									format: (d: number) => formatPercent(d),
									label: t.chart.editions.shareLabel
								}
							}}
						>
							<!--
								Passing `marks` replaces `BarChart`'s own `Bars` loop, so the bars
								are drawn here as well. The line rides the *same* [0, 1] scale as
								the stacked shares — normalized by `totalMax` — and the left-hand
								axis re-labels that shared pixel range in attendee counts. Doing it
								this way rather than through the chart's `y1` scale keeps both axes
								pinned to the same zero baseline.
							-->
							{#snippet marks({ context }: { context: MarksContext })}
								{@const totalScale = context.yScale.copy().domain([0, totalMax])}
								{@const band = context.xScale.bandwidth?.() ?? 0}
								{#each context.series.visibleSeries as s, i (s.key)}
									<Bars
										seriesKey={s.key}
										rounded={i === context.series.visibleSeries.length - 1 ? 'edge' : 'none'}
										radius={4}
										strokeWidth={1}
									/>
								{/each}

								<!-- Two passes over the same points. The first joins every edition
								     that has figures, so it bridges the years that have none —
								     cancelled ones, and the fully online ones under `In person` —
								     with a dashed segment. The second draws the real line on top,
								     covering that path everywhere the years actually run on, so the
								     dashes are only ever visible across a gap. -->
								<Spline
									data={rowsWithFigures}
									y={(d: EditionRow) => d.total / totalMax}
									stroke={TOTAL_COLOR}
									strokeWidth={2}
									stroke-dasharray="4 4"
									fill="none"
								/>

								<Spline
									y={(d: EditionRow) => d.total / totalMax}
									defined={(d: EditionRow) => d.total > 0}
									stroke={TOTAL_COLOR}
									strokeWidth={2}
									fill="none"
								/>

								{#each rowsWithFigures as row (row.tickLabel)}
									<Circle
										cx={(context.xScale(row.tickLabel) ?? 0) + band / 2}
										cy={context.yScale(row.total / totalMax)}
										r={row.current ? 5.5 : 3.5}
										fill={row.current ? CURRENT_COLOR : TOTAL_COLOR}
										stroke="white"
										strokeWidth={row.current ? 1.5 : 1}
									/>
								{/each}

								<Axis
									placement="left"
									scale={totalScale}
									format={(d: number) => formatCount(d)}
									label={t.chart.attendeesLabel}
								/>
							{/snippet}

							{#snippet tooltip()}
								<Chart.Tooltip
									labelFormatter={(value) => {
										const row = rowByTick.get(String(value));
										if (!row) return String(value);
										const state = row.cancelled ? ` — ${t.chart.editions.cancelled}` : '';
										const total =
											row.total > 0 ? ` · ${t.chart.attendeesCount(formatCount(row.total))}` : '';
										return `${value}, ${row.country}${total}${state}`;
									}}
								>
									{#snippet formatter({ value, item, payload })}
										{@const count = Number(value ?? 0)}
										{@const label =
											item.key === 'host'
												? t.chart.editions.hostCountry
												: item.key === 'international'
													? t.chart.editions.international
													: t.chart.editions.unknown}
										{@const shown = payload.reduce((sum, p) => sum + Number(p.value ?? 0), 0)}
										<div class="flex w-full items-center justify-between gap-3">
											<span class="text-muted-foreground">{label}</span>
											<span class="font-mono font-medium text-foreground tabular-nums">
												{t.chart.attendeesCount(formatCount(count))}
												{#if shown > 0}
													({formatPercent(count / shown)})
												{/if}
											</span>
										</div>
									{/snippet}
								</Chart.Tooltip>
							{/snippet}
						</BarChart>
					</Chart.Container>
				</div>
			</div>

			<p class="mt-2 shrink-0 text-xs text-muted-foreground">
				{t.chart.editions.cancelled}: {cancelledYears} · {t.chart.editions.noBreakdown} ({missingSplitYears})
				{#if partialSplitYears}
					· {t.chart.editions.partialSplit} ({partialSplitYears})
				{/if}
				·
				<a
					href="https://wiki.osgeo.org/wiki/FOSS4G"
					target="_blank"
					rel="noopener noreferrer"
					class="underline underline-offset-2 hover:text-foreground"
				>
					{t.chart.editions.source}
				</a>
			</p>
		</Card.Content>
	</Card.Root>
</div>

<style>
	.chart-scroll-x {
		overflow-x: auto;
		overflow-y: hidden;
		touch-action: pan-x;
		-webkit-overflow-scrolling: touch;
	}

	.editions-legend {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 0.9rem;
		margin-bottom: 0.5rem;
		font-size: 0.72rem;
		line-height: 1.25;
	}

	.editions-legend-item {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}

	.editions-legend-swatch {
		width: 0.62rem;
		height: 0.62rem;
		border-radius: 2px;
		flex: none;
	}

	.editions-legend-line {
		width: 0.9rem;
		height: 0.15rem;
		border-radius: 2px;
		flex: none;
	}
</style>
