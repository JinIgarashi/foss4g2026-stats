<script lang="ts">
	import logo from '$lib/assets/logo-with-title.svg';
	import logoDark from '$lib/assets/logo-with-title-dark.svg';
	import siGithub from 'simple-icons/icons/github.svg?raw';
	import LanguageSwitcher from '$lib/LanguageSwitcher.svelte';
	import ThemeSwitcher from '$lib/ThemeSwitcher.svelte';
	import { currentLocale, currentMessages, LOCALES } from '$lib/i18n';

	let { children } = $props();

	const siteUrl = 'https://jinigarashi.github.io/foss4g2026-stats';
	const ogImage = `${siteUrl}/logo.svg`;

	let locale = $derived(currentLocale());
	let t = $derived(currentMessages());
	let pageUrl = $derived(`${siteUrl}/${locale}`);

	// `hooks.server.ts` bakes `lang` into the prerendered HTML; keep it in sync
	// when the visitor switches language client-side.
	$effect(() => {
		document.documentElement.lang = locale;
	});
</script>

<svelte:head>
	<title>{t.meta.title}</title>
	<meta name="description" content={t.meta.description} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={t.meta.title} />
	<meta property="og:description" content={t.meta.description} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:locale" content={locale} />
	<meta property="og:site_name" content="FOSS4G Hiroshima 2026" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={t.meta.title} />
	<meta name="twitter:description" content={t.meta.description} />
	<meta name="twitter:image" content={ogImage} />

	<link rel="canonical" href={pageUrl} />
	{#each LOCALES as alternate (alternate.code)}
		<link rel="alternate" hreflang={alternate.code} href={`${siteUrl}/${alternate.code}`} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={`${siteUrl}/`} />
</svelte:head>

<div class="flex h-dvh flex-col">
	<header class="flex items-center gap-3 border-b border-border bg-background px-4 py-2">
		<a href="https://2026.foss4g.org" target="_blank" rel="noopener noreferrer">
			<!-- Four lockups, one visible at a time: the wrapper picks the colour (the
			     default artwork is near-black, dark mode needs the white one) and the
			     inner images pick the shape — the wide one does not fit a phone header. -->
			<span class="dark:hidden">
				<img src={logo} alt={t.header.logoAlt} class=" h-10" />
			</span>
			<span class="hidden dark:block">
				<img src={logoDark} alt={t.header.logoAlt} class=" h-10" />
			</span>
		</a>
		<!-- Hidden on phones: some locales are long enough to squeeze the logo. -->
		<p class="hidden font-semibold sm:block">{t.header.siteName}</p>
		<div class="ml-auto flex items-center">
			<ThemeSwitcher />
			<LanguageSwitcher />
			<a
				href="https://github.com/JinIgarashi/foss4g2026-stats"
				target="_blank"
				rel="noopener noreferrer"
				aria-label={t.header.github}
				class="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
			>
				<span
					aria-hidden="true"
					class="inline-flex h-6 w-6 [&>svg]:h-full [&>svg]:w-full [&>svg]:fill-current"
				>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html siGithub}
				</span>
			</a>
		</div>
	</header>
	<main class="relative flex-1">
		{@render children()}
	</main>
</div>
