<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import type { ChartRow } from '$lib/chartUtils';
	import { currentLocale, currentMessages, localeTag } from '$lib/i18n';

	type LayerType = 'residence' | 'nationality';
	type SortKey = 'name' | 'country' | 'region' | 'count';
	type SortDirection = 'asc' | 'desc';

	interface Props {
		data: ChartRow[];
		activeLayer: LayerType;
	}

	let { data, activeLayer }: Props = $props();

	let t = $derived(currentMessages());
	/** Text columns hold localized names, so they need the locale's collation. */
	let collator = $derived(new Intl.Collator(localeTag(currentLocale())));
	let nameHeader = $derived(
		activeLayer === 'residence' ? t.table.headResidence : t.table.headNationality
	);

	let sortKey = $state<SortKey>('count');
	let sortDirection = $state<SortDirection>('desc');

	const handleSort = (key: SortKey) => {
		if (sortKey === key) {
			sortDirection = sortDirection === 'desc' ? 'asc' : 'desc';
			return;
		}

		sortKey = key;
		sortDirection = key === 'count' ? 'desc' : 'asc';
	};

	const sortIndicator = (key: SortKey) => {
		if (sortKey !== key) return '';
		return sortDirection === 'desc' ? '↓' : '↑';
	};

	const getSortLabel = (key: SortKey) => {
		if (key === 'count') return t.table.sortKeyCount;
		if (key === 'country') return t.table.sortKeyCountry;
		if (key === 'region') return t.table.sortKeyRegion;
		return t.table.sortKeyName;
	};

	// Filters on the raw name, not the localized label, so it holds in every language.
	let filteredData = $derived(data.filter((row) => row.name !== 'No answer'));

	let sortedTableData = $derived(
		[...filteredData].sort((a, b) => {
			if (sortKey === 'count') {
				return sortDirection === 'desc' ? b.count - a.count : a.count - b.count;
			}

			const field =
				sortKey === 'country' ? 'countryLabel' : sortKey === 'region' ? 'regionLabel' : 'nameLabel';
			const order = collator.compare(a[field], b[field]);

			return sortDirection === 'desc' ? -order : order;
		})
	);
	let totalAttendees = $derived(filteredData.reduce((sum, row) => sum + row.count, 0));
</script>

<div class="flex h-full min-h-0 flex-col">
	<p class="mb-2 shrink-0 text-xs text-muted-foreground">
		{t.table.sortedBy(getSortLabel(sortKey), sortDirection, filteredData.length)}
	</p>
	<div class="table-scroll min-h-0 flex-1 rounded-md border">
		<Table.Root>
			<Table.Header class="sticky top-0 z-20 bg-background">
				<Table.Row>
					<Table.Head class="sticky top-0 z-20 w-16 bg-background text-end">#</Table.Head>
					<Table.Head class="sticky top-0 z-20 bg-background">
						<button
							type="button"
							onclick={() => handleSort('name')}
							class="inline-flex cursor-pointer items-center gap-1 text-start"
						>
							<span>{nameHeader}{sortIndicator('name') ? ` ${sortIndicator('name')}` : ''}</span>
						</button>
					</Table.Head>
					<Table.Head class="sticky top-0 z-20 bg-background">
						<button
							type="button"
							onclick={() => handleSort('count')}
							class="inline-flex cursor-pointer items-center gap-1 text-start"
						>
							<span
								>{t.table.headAttendees}{sortIndicator('count')
									? ` ${sortIndicator('count')}`
									: ''}</span
							>
						</button>
					</Table.Head>
					<Table.Head class="sticky top-0 z-20 bg-background">
						<button
							type="button"
							onclick={() => handleSort('country')}
							class="inline-flex cursor-pointer items-center gap-1 text-start"
						>
							<span
								>{t.table.headCountry}{sortIndicator('country')
									? ` ${sortIndicator('country')}`
									: ''}</span
							>
						</button>
					</Table.Head>
					<Table.Head class="sticky top-0 z-20 bg-background">
						<button
							type="button"
							onclick={() => handleSort('region')}
							class="inline-flex cursor-pointer items-center gap-1 text-start"
						>
							<span
								>{t.table.headRegion}{sortIndicator('region')
									? ` ${sortIndicator('region')}`
									: ''}</span
							>
						</button>
					</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each sortedTableData as row (row.id)}
					<Table.Row>
						<Table.Cell class="text-end font-mono text-xs text-muted-foreground"
							>{row.rank}</Table.Cell
						>
						<Table.Cell class="max-w-[320px] truncate" title={row.nameLabel}
							>{row.nameLabel}</Table.Cell
						>
						<Table.Cell class="font-semibold">{row.count}</Table.Cell>
						<Table.Cell class="max-w-55 truncate" title={row.countryLabel}
							>{row.countryLabel}</Table.Cell
						>
						<Table.Cell class="max-w-55 truncate" title={row.regionLabel}
							>{row.regionLabel}</Table.Cell
						>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="my-3 shrink-0 rounded-md border bg-muted px-3 py-2 text-sm">
		<div class="flex items-center justify-between">
			<span class="font-medium text-muted-foreground">{t.table.total}</span>
			<span class="font-semibold text-foreground">{totalAttendees}</span>
		</div>
	</div>
</div>

<style>
	:global(.table-scroll [data-slot='table-container']) {
		height: 100%;
		max-height: none;
		overflow-y: auto;
	}
</style>
