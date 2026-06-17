<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<div class="space-shell h-full w-full">
	<div class="space-stars" aria-hidden="true"></div>
	{@render children?.()}
</div>

<style>
	.space-shell {
		position: relative;
		overflow: hidden;
		background:
			radial-gradient(circle at 28% 24%, rgba(69, 104, 220, 0.28), transparent 38%),
			radial-gradient(circle at 72% 70%, rgba(127, 70, 255, 0.2), transparent 40%),
			linear-gradient(180deg, #030511 0%, #02040e 52%, #010206 100%);
	}

	.space-stars {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 0;
		opacity: 0.85;
		background-image:
			radial-gradient(1px 1px at 20px 28px, rgba(255, 255, 255, 0.95) 98%, transparent 100%),
			radial-gradient(1px 1px at 130px 84px, rgba(255, 255, 255, 0.9) 98%, transparent 100%),
			radial-gradient(1.5px 1.5px at 72px 150px, rgba(255, 255, 255, 0.88) 98%, transparent 100%),
			radial-gradient(2px 2px at 170px 48px, rgba(173, 216, 255, 0.9) 98%, transparent 100%);
		background-size:
			220px 220px,
			320px 320px,
			420px 420px,
			540px 540px;
		background-position:
			0 0,
			40px 120px,
			120px 40px,
			200px 120px;
	}

	.space-stars::before,
	.space-stars::after {
		content: '';
		position: absolute;
		inset: -20%;
		pointer-events: none;
	}

	.space-stars::before {
		opacity: 0.55;
		background-image:
			radial-gradient(1px 1px at 30px 40px, rgba(255, 255, 255, 0.85) 98%, transparent 100%),
			radial-gradient(1.5px 1.5px at 180px 90px, rgba(255, 255, 255, 0.75) 98%, transparent 100%),
			radial-gradient(1px 1px at 90px 190px, rgba(147, 197, 253, 0.8) 98%, transparent 100%);
		background-size:
			260px 260px,
			380px 380px,
			520px 520px;
		background-position:
			0 0,
			80px 40px,
			140px 200px;
		animation: star-drift 160s linear infinite;
	}

	.space-stars::after {
		opacity: 0.28;
		filter: blur(0.8px);
		background-image:
			radial-gradient(2px 2px at 60px 80px, rgba(255, 255, 255, 0.65) 98%, transparent 100%),
			radial-gradient(2.5px 2.5px at 200px 160px, rgba(125, 211, 252, 0.55) 98%, transparent 100%);
		background-size:
			420px 420px,
			620px 620px;
		background-position:
			40px 0,
			180px 120px;
		animation: star-drift 240s linear infinite reverse;
	}

	@keyframes star-drift {
		from {
			transform: translate3d(0, 0, 0);
		}
		to {
			transform: translate3d(-6%, -4%, 0);
		}
	}

	.space-shell :global(.space-map.maplibregl-map) {
		background: transparent !important;
		position: relative;
		z-index: 1;
	}

	.space-shell :global(.space-map .maplibregl-canvas),
	.space-shell :global(.space-map .maplibregl-canvas-container) {
		background: transparent !important;
	}
</style>
