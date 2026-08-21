<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import { buildEditionRows } from '$lib/editionRows';
	import type { LocationProperties } from '$lib/chartUtils';
	import { currentLocale, currentMessages, localeTag } from '$lib/i18n';

	type SortKey =
		| 'year'
		| 'country'
		| 'total'
		| 'registrations'
		| 'inPerson'
		| 'online'
		| 'host'
		| 'international'
		| 'unknown'
		| 'hostShare';
	type SortDirection = 'asc' | 'desc';

	interface Props {
		/** This year's registrations by nationality — the complete count, including
		 *  the attendees who left the residence question blank. */
		nationalityData?: GeoJSON.FeatureCollection<GeoJSON.Point, LocationProperties>;
	}

	let { nationalityData }: Props = $props();

	let t = $derived(currentMessages());
	let locale = $derived(currentLocale());
	/** The country column holds localized names, so it needs the locale's collation. */
	let collator = $derived(new Intl.Collator(localeTag(currentLocale())));

	/** Always built with `includeOnline`: unlike the chart, the table has a column
	 *  per figure, so there is nothing to hide — every edition is listed, the
	 *  fully-online ones included. */
	let rows = $derived(buildEditionRows(nationalityData, true, locale));

	/** Chronological by default, newest first: the most recent editions are the
	 *  ones people compare 2026 against. */
	let sortKey = $state<SortKey>('year');
	let sortDirection = $state<SortDirection>('desc');

	const handleSort = (key: SortKey) => {
		if (sortKey === key) {
			sortDirection = sortDirection === 'desc' ? 'asc' : 'desc';
			return;
		}

		sortKey = key;
		sortDirection = key === 'country' ? 'asc' : 'desc';
	};

	const sortIndicator = (key: SortKey) => {
		if (sortKey !== key) return '';
		return sortDirection === 'desc' ? '↓' : '↑';
	};

	let sortedRows = $derived(
		[...rows].sort((a, b) => {
			let order: number;
			if (sortKey === 'country') {
				order = collator.compare(a.country, b.country);
			} else if (sortKey === 'hostShare') {
				// Editions without a breakdown sort to the bottom either way.
				order = (a.hostShare ?? -1) - (b.hostShare ?? -1);
			} else {
				order = a[sortKey] - b[sortKey];
			}

			if (order === 0) order = a.year - b.year;
			return sortDirection === 'desc' ? -order : order;
		})
	);

	let formatCount = $derived((value: number) => value.toLocaleString(locale));
	/** `—` rather than `0`: a cancelled or unreported figure is not a zero. */
	const formatOptional = (value: number, present: boolean) => (present ? formatCount(value) : '—');
	const formatShare = (share: number | null) =>
		share === null ? '—' : `${Math.round(share * 100)}%`;
</script>

{#snippet head(key: SortKey, label: string, numeric = true)}
	<Table.Head class={`sticky top-0 z-20 bg-background ${numeric ? 'text-end' : ''}`}>
		<button
			type="button"
			onclick={() => handleSort(key)}
			class="inline-flex cursor-pointer items-center gap-1 text-start"
		>
			<span>{label}{sortIndicator(key) ? ` ${sortIndicator(key)}` : ''}</span>
		</button>
	</Table.Head>
{/snippet}

<div class="flex h-full min-h-0 flex-col">
	<p class="mb-2 shrink-0 text-xs text-muted-foreground">
		{t.chart.editions.splitDesc} ·
		<a
			href="https://wiki.osgeo.org/wiki/FOSS4G"
			target="_blank"
			rel="noopener noreferrer"
			class="underline underline-offset-2 hover:text-foreground"
		>
			{t.chart.editions.source}
		</a>
	</p>
	<div class="table-scroll min-h-0 flex-1 rounded-md border">
		<Table.Root>
			<Table.Header class="sticky top-0 z-20 bg-background">
				<Table.Row>
					{@render head('year', t.chart.editions.table.edition, false)}
					{@render head('country', t.table.headCountry, false)}
					{@render head('total', t.chart.attendeesLabel)}
					{@render head('registrations', t.chart.editions.table.registrations)}
					{@render head('inPerson', t.chart.editions.table.inPerson)}
					{@render head('online', t.chart.editions.table.online)}
					{@render head('host', t.chart.editions.hostCountry)}
					{@render head('international', t.chart.editions.international)}
					{@render head('unknown', t.chart.editions.unknown)}
					{@render head('hostShare', t.chart.editions.table.hostShare)}
					<Table.Head class="sticky top-0 z-20 bg-background">
						{t.chart.editions.table.status}
					</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each sortedRows as row (row.tickLabel)}
					<Table.Row class={row.cancelled ? 'text-muted-foreground' : ''}>
						<Table.Cell class="font-medium whitespace-nowrap">
							{row.year}
							{row.city}
						</Table.Cell>
						<Table.Cell class="max-w-55 truncate" title={row.country}>{row.country}</Table.Cell>
						<Table.Cell class="text-end font-semibold tabular-nums">
							{formatOptional(row.total, row.total > 0)}
						</Table.Cell>
						<Table.Cell class="text-end tabular-nums">
							{formatOptional(row.registrations, row.registrations > 0)}
						</Table.Cell>
						<Table.Cell class="text-end tabular-nums">
							{formatOptional(row.inPerson, !row.cancelled)}
						</Table.Cell>
						<Table.Cell class="text-end tabular-nums">
							{formatOptional(row.online, !row.cancelled)}
						</Table.Cell>
						<Table.Cell class="text-end tabular-nums">
							{formatOptional(row.host, row.hasSplit)}
						</Table.Cell>
						<Table.Cell class="text-end tabular-nums">
							{formatOptional(row.international, row.hasSplit)}
						</Table.Cell>
						<Table.Cell class="text-end tabular-nums">
							{formatOptional(row.unknown, row.hasSplit)}
						</Table.Cell>
						<Table.Cell class="text-end tabular-nums">{formatShare(row.hostShare)}</Table.Cell>
						<Table.Cell class="whitespace-nowrap">
							{row.cancelled ? t.chart.editions.cancelled : ''}
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>

<style>
	:global(.table-scroll [data-slot='table-container']) {
		height: 100%;
		max-height: none;
		overflow-y: auto;
	}
</style>
