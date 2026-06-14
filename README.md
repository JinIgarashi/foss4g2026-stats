# FOSS4G Hiroshima 2026 - Attendee Statistics

Interactive map visualization of FOSS4G Hiroshima 2026 conference attendee locations and nationalities using MapLibre GL JS with cluster visualization.

Statistics data is based on questions which registered attendees answered. Nominatim API is used for geocoding for Nationalities and Recidential cities.

## Prerequisites

- [Node.js](https://nodejs.org/) v24+
- [pnpm](https://pnpm.io/)

## Setup

```bash
# Install dependencies
pnpm install

# Create .env file with your Protomaps API key
cp .env.example .env
# Edit .env and set PUBLIC_PROTOMAP_KEY
```

## Geocoding

Place ticket CSV exports in `scripts/data/` and run:

```bash
pnpm geocode
```

This reads all CSV files, geocodes unique "City and Country" and "Nationality" values using the [Nominatim](https://nominatim.openstreetmap.org/) API, and outputs `residence.geojson` and `nationality.geojson` to `src/lib/assets/`.

Results are cached in `scripts/data/geocode-cache.json` to avoid redundant API calls on subsequent runs.

## Development

```bash
pnpm dev
```

## Build

```bash
pnpm build
pnpm preview
```

## Deployment

The project is automatically deployed to GitHub Pages on push to `main` via GitHub Actions.

Set the `PUBLIC_PROTOMAP_KEY` secret in your repository settings under **Settings > Secrets and variables > Actions**.

## License

License for source code is [MIT LICENSE](LICENSE).

License for attendees statistics is CC BY 4.0 License attributed to `FOSS4G Hiroshima 2026`.
