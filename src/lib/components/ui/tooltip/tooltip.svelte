<script lang="ts" generics="T = never">
	import { Tooltip as TooltipPrimitive } from 'bits-ui';

	let {
		open = $bindable(false),
		triggerId = $bindable<string | null>(null),
		...restProps
	}: TooltipPrimitive.RootProps<T> & { triggerId?: string | null } = $props();
</script>

<TooltipPrimitive.Root bind:open bind:triggerId {...restProps} />
