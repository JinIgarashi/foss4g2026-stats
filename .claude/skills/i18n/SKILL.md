---
name: i18n
description: How this site does multi-language support — adding or removing locales, adding message keys, fixing translations, the nationality-to-language mapping, RTL, and the language picker dialog. Required reading before touching src/lib/i18n/, src/hooks.server.ts, src/lib/LanguageDialog.svelte, or after regenerating nationality.geojson.
---

# How i18n works here

## 1. Ground rules

- **No i18n library.** Everything is hand-rolled; TypeScript is what enforces correctness.
- **The URL's `[lang]` is the single source of truth.** There is no locale store. Switching language is navigation via `<a href="/{code}">`, not a state change.
- Every page is prerendered (`export const prerender = true` in `src/routes/+layout.ts`). **40 locales** today.
- Main API (`src/lib/i18n/index.ts`):
  - `currentLocale()` — derived from `page.params.lang`
  - `currentMessages()` — messages for the active locale
  - `currentLocaleDefinition()` — flag, dateLocale, protomaps, dir, …
  - `LOCALE_STORAGE_KEY` — localStorage key remembering the last choice, used only by `/`

  All of them read `page`, so **call them during component init or inside a reactive context**:

  ```svelte
  let t = $derived(currentMessages());
  ```

### Where things live

| Path                                    | Role                                                                                                |
| --------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `src/lib/i18n/locales.ts`               | `LOCALES`, the `Locale` type, `isLocale`/`getLocaleDefinition`/`localeTag`/`resolvePreferredLocale` |
| `src/lib/i18n/messages/en.ts`           | **Source of truth for translations.** `export type Messages = typeof en`                            |
| `src/lib/i18n/messages/<code>.ts`       | One file per language (40 of them)                                                                  |
| `src/lib/i18n/messages/index.ts`        | Explicit eager barrel, `Record<Locale, Messages>`                                                   |
| `src/lib/i18n/nationality-languages.ts` | Nationality → language mapping plus the inverse indexes                                             |
| `src/lib/i18n/plural.ts`                | `Intl.PluralRules` helper                                                                           |
| `src/routes/[lang]/+layout.server.ts`   | Per-language attendee counts                                                                        |
| `src/lib/LanguageDialog.svelte`         | The searchable language picker                                                                      |
| `src/hooks.server.ts` + `src/app.html`  | Bakes `<html lang dir>` into the prerendered output                                                 |

---

## 2. Adding one locale

1. **Append to `LOCALES` in `locales.ts`.** Field constraints:
   - `code` — **always lowercase**. It becomes a URL segment and a prerendered filename (`build/zh-hant.html`); mixed case breaks on static hosts.
   - `label` — the language name written in that language (endonym)
   - `flag` — ISO 3166-1 alpha-2 for `flag-icons`
   - `dateLocale` — BCP 47 tag passed to `Intl`
   - `protomaps` — basemap label language. **Supported:** `ar bg zh-Hans zh-Hant hr cs da nl en et fi fr de el he hi hu id ga it ja ko lv lt mt mr ne no fa pl pt ro ru sk sl es sv tr uk ur vi`. Anything else must be `'en'`.
   - `exportLocal` — only the `Language` union of `@watergis/maplibre-gl-export` is valid: **`en fr fi de sv es ca vi uk zhHans zhHant ja pt ru`**. Anything else is `'en'`.
   - `dir` — `'ltr'` or `'rtl'`
   - `bcp47` — only when the canonical spelling differs from `code` (today just `zh-hant` → `zh-Hant`)
2. **Copy `en.ts` to `messages/<code>.ts`** and translate (see §3 and §4)
3. **Add the import and the record entry to `messages/index.ts`**
4. Add the language code to the relevant countries in `nationality-languages.ts`, if any
5. If browsers report the language under a different tag, add it to `LANGUAGE_ALIASES` in `locales.ts`
6. Make `pnpm check` pass

**What you do _not_ need to touch** (all derived from `LOCALES`): `entries()` in `[lang]/+page.server.ts`, and the hreflang loops in `[lang]/+layout.svelte` and `+page.svelte`.

---

## 3. Adding a message key

`en.ts` is the source of truth (`export type Messages = typeof en`).

1. Add the key to `en.ts`
2. Run `pnpm check` — all 39 other files now fail with a missing key. **Use that error list as the task list.**
3. Add the key to each file, running `pnpm check` every ~5 files

Every translation file uses the **type-annotation** form:

```ts
import type { Messages } from './en';
const xx: Messages = { … };
```

Annotation rather than `satisfies`, because the annotation both infers the parameter types of `(n) => …` functions and rejects **missing and excess** keys.

---

## 4. Function-valued messages and plurals

Some messages are functions. **Translate them as code, not by swapping the strings.**

They are: `layers.attendees(n)`, `layers.places(n, layer)`, `layers.asOf(date)`, `chart.topN(n, kind)`, `chart.xAxis(kind)`, `chart.byCountry(n)`, `chart.attendeesCount(n: string)`, `chart.selectedAttendees(n)`, `table.sortedBy(key, direction, rows)`, `language.resultCount(n)`, `language.attendees(n)`.

- **Word order shifts**: `` `Top ${n} ${kind}` `` in `en.ts` becomes `` `${kind} 上位 ${n} 件` `` in `ja.ts`
- **Some branch**: `places` switches on `layer === 'residence'`, `sortedBy` on `direction === 'desc'`

### Plurals

Languages with three or more forms go through `plural()` from `src/lib/i18n/plural.ts`:

```ts
import { plural } from '../plural';
const uchastnik = (n: number) =>
	plural('ru', n, { one: 'участник', few: 'участника', many: 'участников' });
// …
attendees: (n) => `${n} ${uchastnik(n)}`;
```

- 6 forms: `ar` (zero/one/two/few/many/other)
- 4 forms including a dual: `sl`
- 3–4 forms: `ru uk pl cs sk hr sr ro`
- **1 form** (skip `plural()`, interpolate directly): `ja ko zh zh-hant th vi id ms fil ta si fa ur`
- Two-form languages (`de nl sv da fi et no es pt it fr` …) are fine with a ternary; `plural()` is not required

### Other conventions

- Do **not** translate `header.logoAlt` (`FOSS4G Hiroshima 2026`) or the brand portion of `meta.title`
- RTL files (`ar`, `fa`, `ur`): write template literals in **logical order**. The browser's bidi algorithm handles the visual order once `dir="rtl"` is set.

---

## 5. Nationality → language mapping

`src/lib/i18n/nationality-languages.ts`:

- **Keys match `properties.name` in `src/lib/assets/nationality.geojson` exactly.** That field is free text, so `Türkiye`, `Czechia`, `Russian Federation` and `Congo, The Democratic Republic of the` appear verbatim.
- `No answer` (73 attendees) is deliberately absent — no nationality, so no language. It is listed in `UNMAPPED_NATIONALITIES` to keep it out of the warning below.
- Policy:
  - A country with several widely-written official languages maps to **all of them**, and its attendee count is added to each (Canada → `en, fr`; Singapore → `en, zh, ms, ta`; Switzerland → `de, fr, it`)
  - **Long-tail languages are excluded** (Tetum, Guaraní, Lingala, Chichewa, Fijian, Samoan, Luxembourgish, Māori, Romansh) because we cannot vouch for a UI translation in them; those countries map to the lingua franca instead
- `iso` exists so `Intl.DisplayNames({ type: 'region' })` can produce localized country names. **Never hand-translate country names.** It is also what localizes the Nationality column in the stats table (§5a).

### After regenerating the GeoJSON

`scripts/geocoding-attendee-locations.ts` can introduce new country names. Watch for this warning during prerender and add the missing names to the mapping:

```
[i18n] nationality.geojson has names missing from NATIONALITY_LANGUAGES: …
```

---

## 5a. Localized geography in the stats chart and table

Three of the four columns in `ChartControl` → `ChartView` / `TableView` are drawn from closed vocabularies and are localized; **Residence is not**, because it is free text the attendee typed.

| column      | source                                  | localized via                                                       |
| ----------- | --------------------------------------- | ------------------------------------------------------------------- |
| Residence   | `residence.geojson` `properties.name`   | never — only trimmed to the part before the first comma             |
| Nationality | `nationality.geojson` `properties.name` | `NATIONALITY_LANGUAGES[name].iso` → `Intl.DisplayNames`             |
| Country     | Natural Earth `NAME`                    | `properties.iso` → `Intl.DisplayNames`                              |
| Region      | Natural Earth `REGION_WB`               | the `region` message namespace — the one hand-translated vocabulary |

**`properties.iso`** is emitted by `enrichGeoJsonWithCountryAndRegion()` from Natural Earth's **`ISO_A2_EH`** — not `ISO_A2`, which is `'-99'` for France and Norway. `'-99'` is dropped rather than written.

`src/lib/i18n/display-names.ts` holds the memoized `Intl.DisplayNames` and `localizeCountry(iso, fallback, locale)`, which returns the English fallback whenever there is no code or `Intl` echoes the code back.

`src/lib/i18n/regions.ts` maps the **seven** `REGION_WB` strings to message keys. `Intl` has no World-Bank-region API, so these really are hand-translated in all 40 files — the single exception to "never hand-translate geography".

Two invariants worth keeping:

- Rows carry **both** the raw value and a `*Label`. Every filter (`row.name !== 'No answer'`, `country !== 'Japan'`) and the pie-chart grouping key read the **raw** value, so buckets and row counts are identical in every language; only `*Label` is ever displayed.
- Nationality falls back to the raw string when it has no `NATIONALITY_LANGUAGES` entry, rather than using the point-derived `iso`. `No answer` sits at Null Island, which the spatial join tags `France` / `FR`.

`src/routes/[lang]/+page.server.ts` warns at prerender when either mapping has a gap:

```
[i18n] residence.geojson has countries without an ISO code, so they cannot be localized: …
[i18n] nationality.geojson has regions missing from the `region` messages: …
```

---

## 6. Per-language attendee counts

`src/routes/[lang]/+layout.server.ts` computes them once at module scope during the build and hands them over as `data.languageCounts`.

- **Do not hand-maintain a static table** — it drifts silently the moment the GeoJSON is regenerated
- **Do not import the GeoJSON from anything under `$lib`** — the header depends on it, which would bundle a second 16 KB copy into the client
- Countries mapping to several languages add to each, so **the totals sum to more than the attendee count**. That is intended.

---

## 7. RTL

`ar`, `fa` and `ur` are `dir: 'rtl'`. `<html dir>` is set through two paths:

1. **Server (prerender)**: `transformPageChunk` in `src/hooks.server.ts` replaces `%page.lang%` / `%page.dir%` in `src/app.html`
2. **Client**: the `$effect` in `src/routes/[lang]/+layout.svelte` updates `document.documentElement.lang` / `.dir`

Both are needed. Fixing only one leaves either a reload or a client-side navigation broken.

### Writing new UI

Use logical properties, not physical ones:

| Avoid                      | Use                       |
| -------------------------- | ------------------------- |
| `ml-*` / `mr-*`            | `ms-*` / `me-*`           |
| `pl-*` / `pr-*`            | `ps-*` / `pe-*`           |
| `text-left` / `text-right` | `text-start` / `text-end` |
| `left-*` / `right-*`       | `start-*` / `end-*`       |

bits-ui's `Dialog` and `DropdownMenu` read the ambient `dir` and flip their floating placement on their own.

### Deliberate exceptions — things that stay LTR / physical

All three are marked with a comment in the source. Do not "fix" them.

1. **The site header** in `[lang]/+layout.svelte` carries an explicit `dir="ltr"`. It is brand chrome: the logo lockup is a fixed left-hand mark, and mirroring it would move the logo to the right and the theme/language/GitHub controls to the left, which reads as a different site. The Arabic site name inside still renders right-to-left — bidi handles the run. Everything below the header keeps the document direction, and the language dialog is portaled to `<body>`, so it stays RTL.
2. **MapLibre control placement** (`CustomControl position="top-left"` and friends, in `LayerControl.svelte`, `ChartControl.svelte`, `MapExportControl.svelte`, `[lang]/+page.svelte`). MapLibre does not mirror control corners, and map chrome conventionally keeps its position. Only the content _inside_ those panels uses logical properties.
3. **The bar-chart canvas** in `ChartView.svelte` carries an explicit `dir="ltr"`. The plot is a left-to-right coordinate system (Y axis on the left, categories running rightwards), and its rotated X tick labels are placed with `text-anchor: start`. **`text-anchor` is direction-sensitive**: under `dir="rtl"` SVG resolves `start` to the _right_ edge, which throws every rotated label back up over the bars. The reason is purely geometric: since §5a the labels can be Arabic or Devanagari, and bidi still lays each one out correctly inside the LTR canvas.

The general lesson from (3): **SVG `text-anchor: start` / `end` follow the inherited direction.** Any new SVG that positions text with `start`/`end` needs either an explicit `dir` or a direction-independent anchor (`middle`).

---

## 8. The language dialog

`src/lib/LanguageDialog.svelte` (it replaced the old `LanguageSwitcher.svelte` dropdown).

- **Sort order**: `en` and `ja` pinned first (`PINNED`), then attendee count descending, then locale code ascending. That last tie-break exists to keep the order **deterministic so the server and client renders agree** — do not remove it.
- **Search haystack**: endonym, code, BCP 47 tag, English language name, language name in the active UI language, English country names (from the GeoJSON), and country names in the active UI language. The last two come from `Intl.DisplayNames`, so **no country or language name is ever hand-translated**. Typing "brazil" in the English UI and 「ブラジル」 in the Japanese UI both find Portuguese.
- The query is AND-matched across whitespace-separated terms, so "hong kong" works.
- **Keep each entry a real `<a href>` with `hreflang`.** Crawlability and carrying the `#zoom/lat/lng` map hash both depend on it; `onclick` only writes localStorage and closes the dialog.
- The hash is re-read from `location` when the dialog opens: MapLibre's hash control rewrites the fragment through the History API without telling SvelteKit, so `page.url.hash` goes stale as soon as the visitor pans.
- The count badge is formatted with `Intl.NumberFormat` and labelled by `t.language.attendees(n)` in both `title` and an sr-only span.

### The "contribute a translation" map control

`[lang]/+page.svelte` renders a `CustomControl position="bottom-left"` labelled `t.language.contribute`, linking to `messagesEditUrl(locale)` from `$lib/i18n` — GitHub's editor for that locale's message file (`REPO_URL/edit/main/src/lib/i18n/messages/<code>.ts`). GitHub forks the repo for the visitor and opens a pull request on save, so a translator needs nothing but an account.

Two things to know if you touch it:

- **MapLibre prepends into its bottom corners**, so the _last_ control declared for `bottom-left` is the one that renders on top. The contribute button is declared after the register button for that reason.
- The link relies on locale codes being lowercase and matching filenames exactly (§2), which is what makes `zh-hant` resolve to `zh-hant.ts`.

---

## 9. Common mistakes

- Using uppercase in a locale code → 404 on static hosting. Carry the canonical spelling in `bcp47` instead.
- Forgetting `LANGUAGE_ALIASES` → a `zh-TW` visitor lands on Simplified Chinese.
- Forgetting to add the locale to `messages/index.ts` → `pnpm check` fails (it _is_ caught; don't ignore it).
- Translating without running `pnpm check` → 39 files' worth of drift surfaces all at once at the end.
- Writing `ml-auto` / `text-left` in new UI → it breaks under RTL.
- Positioning SVG text with `text-anchor: start`/`end` without pinning a direction → the anchor flips under RTL and the labels land on the wrong side (see §7, exception 3).
- Removing the `dir="ltr"` from the bar-chart canvas in `ChartView.svelte` → the rotated axis labels overlap the bars in `ar`/`fa`/`ur`.
- Turning dialog entries into `<button>`s → breaks crawlability and the map-hash carry-over.

## 10. Verifying

```bash
pnpm check && pnpm lint && pnpm build
```

`pnpm check` is the one gate for message-shape correctness. After `pnpm build`, confirm `build/` has a `<code>.html` and a `<code>/__data.json` for all 40 locales, and that `build/zh-hant.html` is all lowercase.
