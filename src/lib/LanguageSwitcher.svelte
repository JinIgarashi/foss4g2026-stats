<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Check from '@lucide/svelte/icons/check';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import {
		currentLocale,
		currentMessages,
		getLocaleDefinition,
		LOCALE_STORAGE_KEY,
		LOCALES,
		type Locale
	} from '$lib/i18n';

	let { class: className = '' }: { class?: string } = $props();

	let locale = $derived(currentLocale());
	let t = $derived(currentMessages());
	let active = $derived(getLocaleDefinition(locale));

	// Carry the map position (`#zoom/lat/lng`) across to the translated page.
	let hash = $derived(page.url.hash);

	// Controlled: each item renders an `<a>` whose own `onclick` shadows the one
	// bits-ui merges in, so the menu is closed explicitly on selection.
	let open = $state(false);

	const select = (code: Locale) => {
		localStorage.setItem(LOCALE_STORAGE_KEY, code);
		open = false;
	};
</script>

<!-- Hrefs below are resolve()d with the map hash appended, which the rule cannot see through. -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->
<DropdownMenu.Root bind:open>
	<DropdownMenu.Trigger
		class={`${buttonVariants({ variant: 'ghost', size: 'sm' })} cursor-pointer gap-1 ${className}`}
		aria-label={t.header.language}
	>
		<!-- `fi` sizes itself in em, so a larger font-size is what enlarges the flag. -->
		<span class={`fi fi-${active.flag} rounded-xs text-xl`} aria-hidden="true"></span>
		<ChevronDown size={14} class="opacity-60" />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end" class="max-h-[70dvh] w-52 overflow-y-auto">
		{#each LOCALES as item (item.code)}
			<DropdownMenu.Item>
				{#snippet child({ props })}
					<a
						{...props}
						href={`${resolve('/[lang]', { lang: item.code })}${hash}`}
						class={`${props.class ?? ''} cursor-pointer gap-2`}
						hreflang={item.code}
						aria-current={item.code === locale ? 'true' : undefined}
						onclick={() => select(item.code)}
					>
						<span class={`fi fi-${item.flag} rounded-xs`} aria-hidden="true"></span>
						<span class="flex-1">{item.label}</span>
						{#if item.code === locale}
							<Check size={14} />
						{/if}
					</a>
				{/snippet}
			</DropdownMenu.Item>
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
