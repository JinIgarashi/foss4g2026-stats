<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { Spinner } from '$lib/components/ui/spinner/index.js';
	import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, resolvePreferredLocale } from '$lib/i18n';

	onMount(() => {
		const locale = resolvePreferredLocale(
			localStorage.getItem(LOCALE_STORAGE_KEY),
			navigator.languages ?? [navigator.language]
		);
		// The URL is resolve()d; the map hash is appended so a shared deep link survives.
		// eslint-disable-next-line svelte/no-navigation-without-resolve
		void goto(`${resolve('/[lang]', { lang: locale })}${location.hash}`, { replaceState: true });
	});
</script>

<svelte:head>
	<noscript>
		<meta http-equiv="refresh" content={`0; url=${resolve('/[lang]', { lang: DEFAULT_LOCALE })}`} />
	</noscript>
</svelte:head>

<div class="flex h-dvh w-full items-center justify-center bg-white">
	<Spinner />
</div>
