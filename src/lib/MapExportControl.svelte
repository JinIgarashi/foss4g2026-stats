<script lang="ts">
	import {
		MaplibreExportControl,
		Size,
		PageOrientation,
		Format,
		DPI,
		type Language
	} from '@watergis/maplibre-gl-export';
	import '@watergis/maplibre-gl-export/dist/maplibre-gl-export.css';
	import { CustomControl } from 'svelte-maplibre-gl';
	import { untrack } from 'svelte';

	let { local }: { local: Language } = $props();

	// The control reads its labels once at construction, so the language is applied by
	// rebuilding it — see the {#key} around this component in the page.
	//
	// Deliberately a plain const rather than a rune: CustomControl removes whatever
	// `control` resolves to when it is torn down, so a reactive value would resolve to
	// the *replacement* and leave this instance's button orphaned on the map.
	const control = new MaplibreExportControl({
		PageSize: Size.A4,
		PageOrientation: PageOrientation.Landscape,
		Format: Format.PNG,
		DPI: DPI[96],
		Crosshair: true,
		PrintableArea: true,
		Local: untrack(() => local)
	});
</script>

<CustomControl position="bottom-right" {control} />
