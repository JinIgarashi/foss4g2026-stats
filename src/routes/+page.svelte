<script lang="ts">
	import { setContext } from 'svelte';
	import { createMapStore, MAPSTORE_CONTEXT_KEY } from '$lib/stores';
	import Map from '$lib/Map.svelte';
	import Layers from '$lib/Layers.svelte';
	import logoSvg from '$lib/assets/logo.svg';

	const mapStore = createMapStore();
	setContext(MAPSTORE_CONTEXT_KEY, mapStore);
</script>

<Map />
<Layers />
<a
	href="https://2026.foss4g.org/en/register/registration/"
	target="_blank"
	rel="noopener noreferrer"
	class="absolute bottom-3 left-3 z-10 flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-colors hover:bg-red-700"
>
	<img src={logoSvg} alt="" class="h-5 w-5 brightness-0 invert" />
	Join FOSS4G Hiroshima 2026
</a>
