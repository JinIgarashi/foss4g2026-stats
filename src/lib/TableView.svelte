<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';

	type LayerType = 'residence' | 'nationality';
	type SortKey = 'name' | 'country' | 'region' | 'count';
	type SortDirection = 'asc' | 'desc';

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
	}

	let { data, activeLayer }: Props = $props();

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
		if (key === 'count') return 'attendee count';
		if (key === 'country') return 'country';
		if (key === 'region') return 'region';
		return 'name';
	};

	let filteredData = $derived(data.filter((row) => row.name !== 'No answer'));

	let sortedTableData = $derived(
		[...filteredData].sort((a, b) => {
			if (sortKey === 'count') {
				return sortDirection === 'desc' ? b.count - a.count : a.count - b.count;
			}

			if (sortKey === 'country') {
				return sortDirection === 'desc'
					? b.country.localeCompare(a.country)
					: a.country.localeCompare(b.country);
			}

			if (sortKey === 'region') {
				return sortDirection === 'desc'
					? b.region.localeCompare(a.region)
					: a.region.localeCompare(b.region);
			}

			return sortDirection === 'desc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
		})
	);
	let totalAttendees = $derived(filteredData.reduce((sum, row) => sum + row.count, 0));
</script>

<div class="flex h-full min-h-0 flex-col">
	<p class="mb-2 shrink-0 text-xs text-gray-500">
		Sorted by {getSortLabel(sortKey)} ({sortDirection}): {filteredData.length} rows
	</p>
	<div class="table-scroll min-h-0 flex-1 rounded-md border">
		<Table.Root>
			<Table.Header class="sticky top-0 z-20 bg-white">
				<Table.Row>
					<Table.Head class="sticky top-0 z-20 w-16 bg-white text-right">#</Table.Head>
					<Table.Head class="sticky top-0 z-20 bg-white">
						<button
							type="button"
							onclick={() => handleSort('name')}
							class="inline-flex cursor-pointer items-center gap-1 text-left"
						>
							<span
								>{activeLayer === 'residence' ? 'Residence' : 'Nationality'}{sortIndicator('name')
									? ` ${sortIndicator('name')}`
									: ''}</span
							>
						</button>
					</Table.Head>
					<Table.Head class="sticky top-0 z-20 bg-white">
						<button
							type="button"
							onclick={() => handleSort('count')}
							class="inline-flex cursor-pointer items-center gap-1 text-left"
						>
							<span>Attendees{sortIndicator('count') ? ` ${sortIndicator('count')}` : ''}</span>
						</button>
					</Table.Head>
					<Table.Head class="sticky top-0 z-20 bg-white">
						<button
							type="button"
							onclick={() => handleSort('country')}
							class="inline-flex cursor-pointer items-center gap-1 text-left"
						>
							<span>Country{sortIndicator('country') ? ` ${sortIndicator('country')}` : ''}</span>
						</button>
					</Table.Head>
					<Table.Head class="sticky top-0 z-20 bg-white">
						<button
							type="button"
							onclick={() => handleSort('region')}
							class="inline-flex cursor-pointer items-center gap-1 text-left"
						>
							<span>Region{sortIndicator('region') ? ` ${sortIndicator('region')}` : ''}</span>
						</button>
					</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each sortedTableData as row (row.id)}
					<Table.Row>
						<Table.Cell class="text-right font-mono text-xs text-gray-600">{row.rank}</Table.Cell>
						<Table.Cell class="max-w-[320px] truncate" title={row.name}>{row.name}</Table.Cell>
						<Table.Cell class="font-semibold">{row.count}</Table.Cell>
						<Table.Cell class="max-w-55 truncate" title={row.country}>{row.country}</Table.Cell>
						<Table.Cell class="max-w-55 truncate" title={row.region}>{row.region}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="my-3 shrink-0 rounded-md border bg-gray-50 px-3 py-2 text-sm">
		<div class="flex items-center justify-between">
			<span class="font-medium text-slate-700">Total</span>
			<span class="font-semibold text-slate-900">{totalAttendees}</span>
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
