<script lang="ts">
	import { Sky } from 'svelte-maplibre-gl';
	import type { SkySpecification } from 'maplibre-gl';

	const SPACE_SKY_COLOR = '#0a1230';

	const skySpec: SkySpecification = {
		'sky-color': SPACE_SKY_COLOR,
		'horizon-color': '#1a2a52',
		'fog-color': '#3f78d9',
		'fog-ground-blend': 0.75,
		'horizon-fog-blend': 0.35,
		'sky-horizon-blend': 0.3,
		'atmosphere-blend': ['interpolate', ['linear'], ['zoom'], 0, 0.18, 3, 0.45, 6, 0.85, 10, 1]
	};
</script>

<Sky {...skySpec} />
