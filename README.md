# ANAMAY Website

Static GitHub Pages website for ANAMAY.

## Clean Page Endpoints

- `/home/`
- `/about-us/`
- `/our-journey/`
- `/our-impact/`
- `/anamay-original/`
- `/turmeric-honey/`
- `/jasmine/`

## Local Preview

Open Terminal inside this extracted folder and run:

```bash
python3 -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

It will redirect to:

```text
http://localhost:5500/home/
```

## GitHub Pages Setup

Upload the extracted contents to the root of your GitHub repository, not the ZIP file.

## Updating the Toilet Contribution Timeline

The sanitation timeline on `/our-impact/` is generated from `TOILET_PROJECTS` in `script.js`.

For a new month:

1. Create a folder such as `images/toilets/2026-09/`.
2. Add the four WebP photos using names such as `toilet-09.webp` through `toilet-12.webp`.
3. Add one new month object to `TOILET_PROJECTS` in `script.js` with each toilet's ID, village, commune, district, and image path.

The total number of toilets, the completed month node, and the next upcoming month are generated automatically.
