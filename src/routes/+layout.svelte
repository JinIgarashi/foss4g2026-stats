<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import logo from '$lib/assets/logo-with-title.svg';

	let { children } = $props();

	const title = 'FOSS4G Hiroshima 2026 - Attendee Statistics';
	const description =
		'Interactive map visualization of FOSS4G Hiroshima 2026 conference attendee locations and nationalities.';
	const siteUrl = 'https://jinigarashi.github.io/foss4g2026-stats';
	const ogImage = `${siteUrl}/logo.svg`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:url" content={siteUrl} />
	<meta property="og:site_name" content="FOSS4G Hiroshima 2026" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />

	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex h-dvh flex-col">
	<header class="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-2">
		<a href="https://2026.foss4g.org" target="_blank" rel="noopener noreferrer">
			<img src={logo} alt="FOSS4G Hiroshima 2026" class="h-10" />
		</a>
		<h1 class="text-lg font-semibold text-gray-800">Attendee Statistics</h1>
	</header>
	<main class="relative flex-1">
		{@render children()}
	</main>
</div>
