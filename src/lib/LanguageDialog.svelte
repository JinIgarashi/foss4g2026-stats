<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Check from '@lucide/svelte/icons/check';
	import Search from '@lucide/svelte/icons/search';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import {
		currentLocale,
		currentMessages,
		getLocaleDefinition,
		localeTag,
		LOCALE_STORAGE_KEY,
		LOCALES,
		type Locale
	} from '$lib/i18n';
	import { LOCALE_NATIONALITIES, LOCALE_REGIONS } from '$lib/i18n/nationality-languages';

	let {
		counts,
		class: className = ''
	}: {
		/** Attendees per language, from `[lang]/+layout.server.ts`. */
		counts: Partial<Record<Locale, number>>;
		class?: string;
	} = $props();

	let locale = $derived(currentLocale());
	let t = $derived(currentMessages());
	let active = $derived(getLocaleDefinition(locale));

	/**
	 * Carries the map position (`#zoom/lat/lng`) across to the translated page.
	 * MapLibre's hash control rewrites the fragment through the History API
	 * without telling SvelteKit, so `page.url.hash` goes stale as soon as the
	 * visitor pans; re-read `location` when the dialog opens instead. The
	 * `page.url` value is the server-render fallback.
	 */
	let hash = $state(page.url.hash);

	/** Always first, whatever the counts say: site default, then host country. */
	const PINNED: readonly Locale[] = ['en', 'ja'];

	let open = $state(false);
	let query = $state('');
	let searchElement = $state<HTMLInputElement | null>(null);
	let listElement = $state<HTMLUListElement | null>(null);

	/**
	 * Language and country names come from `Intl.DisplayNames`, so searching by
	 * either — in English or in the current UI language — works without any of
	 * those names being translated by hand.
	 */
	let entries = $derived.by(() => {
		const tag = localeTag(active);
		const languageNames = new Intl.DisplayNames([tag], { type: 'language' });
		const englishLanguageNames = new Intl.DisplayNames(['en'], { type: 'language' });
		const regionNames = new Intl.DisplayNames([tag], { type: 'region' });
		const numberFormat = new Intl.NumberFormat(tag);

		const rows = LOCALES.map((definition) => {
			const localeTagged = localeTag(definition);
			const countries = LOCALE_NATIONALITIES[definition.code] ?? [];
			const localizedCountries = (LOCALE_REGIONS[definition.code] ?? []).map(
				(iso) => regionNames.of(iso) ?? iso
			);
			const count = counts[definition.code as Locale] ?? 0;

			return {
				definition,
				count,
				formattedCount: numberFormat.format(count),
				localizedName: languageNames.of(localeTagged) ?? definition.label,
				haystack: [
					definition.label,
					definition.code,
					localeTagged,
					englishLanguageNames.of(localeTagged) ?? '',
					languageNames.of(localeTagged) ?? '',
					...countries,
					...localizedCountries
				]
					.join(' ')
					.toLowerCase()
			};
		});

		const rank = (code: string) => {
			const index = PINNED.indexOf(code as Locale);
			return index === -1 ? PINNED.length : index;
		};

		// Pinned first, then attendees descending. The code tie-break keeps the
		// order deterministic so the server and client renders agree.
		rows.sort(
			(a, b) =>
				rank(a.definition.code) - rank(b.definition.code) ||
				b.count - a.count ||
				a.definition.code.localeCompare(b.definition.code)
		);
		return rows;
	});

	let filtered = $derived.by(() => {
		const trimmed = query.trim().toLowerCase();
		if (!trimmed) return entries;
		// AND across terms, so "hong kong" and "traditional chinese" both work.
		const terms = trimmed.split(/\s+/);
		return entries.filter((entry) => terms.every((term) => entry.haystack.includes(term)));
	});

	const select = (code: Locale) => {
		localStorage.setItem(LOCALE_STORAGE_KEY, code);
		open = false;
	};

	const focusFirstResult = (event: KeyboardEvent) => {
		if (event.key !== 'ArrowDown') return;
		event.preventDefault();
		listElement?.querySelector('a')?.focus();
	};
</script>

<!-- Hrefs below are resolve()d with the map hash appended, which the rule cannot see through. -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->
<Dialog.Root
	bind:open
	onOpenChange={(value) => {
		if (!value) return;
		query = '';
		hash = location.hash;
	}}
>
	<Dialog.Trigger
		class={`${buttonVariants({ variant: 'ghost', size: 'sm' })} cursor-pointer ${className}`}
		aria-label={t.header.language}
	>
		<!-- `fi` sizes itself in em, so a larger font-size is what enlarges the flag. -->
		<span class={`fi fi-${active.flag} rounded-xs text-xl`} aria-hidden="true"></span>
	</Dialog.Trigger>

	<Dialog.Content
		class="flex max-h-[85dvh] flex-col gap-0 p-0 sm:max-w-2xl"
		onOpenAutoFocus={(event) => {
			// Land on the search box rather than the close button: searching is the
			// whole point of the dialog once the list is 41 entries long.
			event.preventDefault();
			searchElement?.focus();
		}}
	>
		<Dialog.Header class="border-b border-border p-4 pe-12">
			<Dialog.Title>{t.language.title}</Dialog.Title>
			<Dialog.Description>{t.language.description}</Dialog.Description>
			<div class="relative mt-1">
				<Search
					size={16}
					class="pointer-events-none absolute start-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
					aria-hidden="true"
				/>
				<Input
					bind:ref={searchElement}
					bind:value={query}
					type="search"
					class="ps-9"
					placeholder={t.language.searchPlaceholder}
					aria-label={t.language.search}
					onkeydown={focusFirstResult}
				/>
			</div>
		</Dialog.Header>

		<p class="sr-only" aria-live="polite">{t.language.resultCount(filtered.length)}</p>

		<ul
			bind:this={listElement}
			class="grid min-h-0 flex-1 grid-cols-1 gap-1 overflow-y-auto p-2 sm:grid-cols-2"
		>
			{#each filtered as item (item.definition.code)}
				<li>
					<a
						href={`${resolve('/[lang]', { lang: item.definition.code })}${hash}`}
						hreflang={localeTag(item.definition)}
						lang={localeTag(item.definition)}
						dir={item.definition.dir}
						aria-current={item.definition.code === locale ? 'true' : undefined}
						onclick={() => select(item.definition.code)}
						class="flex items-center gap-3 rounded-md px-3 py-2 text-start hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none aria-[current]:bg-accent"
					>
						<span
							class={`fi fi-${item.definition.flag} shrink-0 rounded-xs text-xl`}
							aria-hidden="true"
						></span>
						<span class="min-w-0 flex-1">
							<span class="block truncate font-medium">{item.definition.label}</span>
							<span class="block truncate text-xs text-muted-foreground">{item.localizedName}</span>
						</span>
						{#if item.count > 0}
							<span
								class="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground tabular-nums"
								title={t.language.attendees(item.count)}
							>
								{item.formattedCount}
								<span class="sr-only">{t.language.attendees(item.count)}</span>
							</span>
						{/if}
						{#if item.definition.code === locale}
							<Check size={14} class="shrink-0" />
						{/if}
					</a>
				</li>
			{:else}
				<li class="col-span-full p-6 text-center text-sm text-muted-foreground">
					{t.language.noResults}
				</li>
			{/each}
		</ul>
	</Dialog.Content>
</Dialog.Root>
