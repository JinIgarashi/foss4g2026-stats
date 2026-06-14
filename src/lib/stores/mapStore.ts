import { writable } from 'svelte/store';
import type { Map as MaplibreMap } from 'maplibre-gl';

export const MAPSTORE_CONTEXT_KEY = 'maplibre-map-store';

export type MapStore = ReturnType<typeof createMapStore>;

export function createMapStore() {
	const { subscribe, set, update } = writable<MaplibreMap | undefined>(undefined);
	return { subscribe, set, update };
}
