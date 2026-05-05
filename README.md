# FAKTOTUM Landing

Sito statico FAKTOTUM pronto per deploy su Vercel.

Sito: https://www.faktotum.it

## Struttura

```text
.
|-- index.html
|-- momentum.html
|-- faktotumdesignsystem.html
|-- FaktotumOS.html
|-- assets/
|   |-- brand/
|   `-- videos/
|-- design-system/
`-- tools/
    `-- video-render/
```

## Pagine pubbliche

- `index.html`: landing principale.
- `momentum.html`: radar agenti e risorse.
- `faktotumdesignsystem.html`: anteprima visuale del design system.
- `FaktotumOS.html`: prototipo/preview di prodotto.

## Asset

- `assets/brand/headerlogo.svg`: logo usato dagli header del sito.
- `assets/videos/`: video usati da `momentum.html` e output del render tool.
- `design-system/assets/`: sorgente brand e varianti logo del design system.

## Tooling

`tools/video-render/` contiene il generatore dei video. Le dipendenze non sono versionate: entra nella cartella e installale solo quando devi rigenerare gli MP4.

```bash
cd tools/video-render
npm install
node render.js
```

## Deploy

La cartella e pensata per essere collegata direttamente a Vercel come progetto statico. Non serve build step: `index.html` resta il documento principale.
