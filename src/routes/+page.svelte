<script lang="ts">
	import { setContext } from 'svelte';
	import { createMapStore, MAPSTORE_CONTEXT_KEY } from '$lib/stores';
	import Map from '$lib/Map.svelte';
	import Layers from '$lib/Layers.svelte';

	const mapStore = createMapStore();
	setContext(MAPSTORE_CONTEXT_KEY, mapStore);
</script>

<Map />
<Layers />
