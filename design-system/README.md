# FAKTOTUM Design System

Design system operativo per FAKTOTUM, società di servizi che orchestra automazioni intelligenti per professionisti, PMI e startup tech. La promessa del brand e sintetizzata dalla tagline:

> Intelligent Automation

Questo kit serve a mantenere coerenti interfacce, materiali marketing e prototipi: logo, palette, tipografia, componenti, preview HTML e linee guida di utilizzo.

## Stato Del Kit

Il sistema attuale e centrato su una UI chiara, pulita e product-first. La base visuale e bianca/neutra, con testo viola scuro, accento lime ad alta energia e gradiente blu-viola per stati brand o highlight.

Il brief sorgente cita anche applicazioni scure e materiali brand book; queste sono da trattare come estensioni marketing, non come tema primario dell'app. Dove serve una variante dark, usare i token dedicati in `colors_and_type.css` invece di invertire manualmente i colori.

## Asset Disponibili

| Area | File/cartella | Uso |
| --- | --- | --- |
| Logo | `assets/logo.svg` | Lockup principale su fondo chiaro |
| Logo | `assets/logo-color.svg` | Variante colore compatta |
| Logo | `assets/logo-white.svg` | Variante per fondo scuro |
| Logo | `assets/logo-dark.svg` | Variante monocromatica scura |
| Marchio | `assets/logo-mark.svg`, `assets/favicon.svg` | Icone, app mark, favicon |
| Preview | `preview/*.html` | Schede visuali registrabili nel design system |
| UI kit | `ui_kits/web/index.html` | Demo interattiva SaaS |
| Componenti | `ui_kits/web/components.jsx` | Componenti React/Babel dimostrativi |
| Token | `colors_and_type.css` | Variabili CSS e stili base |
| Brief | `uploads/Brief_Claude_Design.txt` | Fonte del brand brief in italiano |

## Principi

- Product first: l'interfaccia deve sembrare uno strumento di lavoro, non una landing decorativa.
- Futuristico ma umano: precisione tecnica, copy diretto, nessun tono freddo o eccessivamente robotico.
- Energia controllata: il lime e il gradiente sono accenti, non sfondi onnipresenti.
- Chiarezza prima dell'effetto: contrasto, densita informativa e gerarchie leggibili hanno priorita su glow e texture.
- Coerenza modulare: usare token e componenti prima di introdurre nuove varianti.

## Voce E Copy

- Brand sempre in maiuscolo: `FAKTOTUM`.
- Tagline in inglese: `Intelligent Automation`.
- UI copy preferibilmente in inglese se il prodotto e internazionale; materiali commerciali possono essere in italiano.
- Usare frasi brevi e orientate all'azione: `Create agent`, `Run workflow`, `View logs`, `Automate now`.
- Evitare emoji nell'interfaccia. Usare icone lineari per azioni e stati.
- Evitare jargon non necessario: spiegare benefici e risultato operativo, non solo tecnologia.

## Palette

### Neutrali

| Token | Valore | Uso |
| --- | --- | --- |
| `--bg` | `#FFFFFF` | Fondo principale app |
| `--bg-soft` | `#F8F9FA` | Shell, aree secondarie, hover leggeri |
| `--bg-purple-tint` | `#F5F0FB` | Navigazione attiva, superfici brand soft |
| `--text-primary` | `#1A0B2E` | Titoli, testo primario, icone principali |
| `--text-secondary` | `#4A3A5C` | Body copy e descrizioni |
| `--text-light` | `#6B5A7D` | Label, placeholder, metadata |
| `--border` | `#E5E1EB` | Bordo standard |
| `--border-light` | `#F0EBF5` | Divider e bordi secondari |

### Accenti

| Token | Valore | Uso |
| --- | --- | --- |
| `--accent-lime` | `#ABFA0F` | CTA primarie, toggle attivi, indicatori positivi |
| `--accent-lime-soft` | `#F5FFE0` | Background per stato success/active |
| `--accent-lime-dark` | `#8CC408` | Hover CTA lime |
| `--accent-lime-text` | `#4D7600` | Testo su fondi lime soft |
| `--accent-blue` | `#667EEA` | Gradiente, grafici, elementi decorativi |
| `--accent-blue-text` | `#4A5FBF` | Link e testo informativo accessibile |
| `--accent-purple` | `#764BA2` | Stato attivo, hover link, gradiente |

### Gradienti

- Brand: `linear-gradient(135deg, #667EEA, #764BA2)`
- Lime soft: `linear-gradient(135deg, #F5FFE0, #E8F5C9)`
- Usare i gradienti per hero, metriche evidenziate, grafici e CTA secondarie. Evitare card intere in gradiente quando il contenuto deve essere letto o confrontato.

## Accessibilita Colore

Contrasti verificati sui principali abbinamenti:

| Coppia | Rapporto | Esito |
| --- | ---: | --- |
| `#1A0B2E` su `#FFFFFF` | 18.56:1 | AAA |
| `#4A3A5C` su `#FFFFFF` | 10.24:1 | AAA |
| `#6B5A7D` su `#FFFFFF` | 6.21:1 | AA |
| `#1A0B2E` su `#ABFA0F` | 14.51:1 | AAA |
| `#1A0B2E` su `#8CC408` | 8.85:1 | AAA |
| `#764BA2` su `#FFFFFF` | 6.37:1 | AA |
| `#667EEA` su `#FFFFFF` | 3.66:1 | Solo testo grande |
| `#4A5FBF` su `#FFFFFF` | 5.71:1 | AA |

Regola pratica: non usare `--accent-blue` per testo normale su bianco; usare `--accent-blue-text`.

## Tipografia

| Ruolo | Font | Peso | Note |
| --- | --- | --- | --- |
| Display, heading, bottoni | Space Grotesk | 500, 600, 700 | Geometrico, distintivo, tech |
| Body, form, dati | Inter | 400, 500, 600, 700 | Leggibile e neutro |
| Codice | JetBrains Mono / Fira Code fallback | 400 | Token, API key, esempi tecnici |

Scala consigliata:

| Stile | Size | Peso | Line-height |
| --- | ---: | ---: | ---: |
| H1 marketing | 64-80px | 700 | 1.05-1.1 |
| H1 app | 24-32px | 700 | 1.15 |
| H2 | 40-52px | 700 | 1.15 |
| H3 | 28-40px | 600 | 1.2 |
| H4 | 20-24px | 700 | 1.3 |
| Body | 16px | 400 | 1.6-1.65 |
| Small/label | 12-13px | 600 | 1.3 |

Usare letter spacing neutro (`0`) nelle UI operative. L'uppercase e ammesso per label brevi, con tracking moderato (`0.06em-0.08em`).

## Layout

- Base spacing: 8px.
- Spazi principali: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px.
- Max content width marketing: circa 1200px.
- App shell: sidebar fissa, contenuto denso, card informative senza nesting.
- Card: 12-14px radius, bordo chiaro, ombra minima.
- Modali: 20px radius, overlay viola scuro traslucido, max-width leggibile.
- Non usare sezioni decorative a card quando la pagina e un'app o dashboard.

## Componenti

### Button

- `primary`: lime, testo `#1A0B2E`, per azione principale.
- `brand`: gradiente blu-viola, per CTA marketing o azione secondaria ad alto impatto.
- `ghost`: fondo trasparente, bordo neutro, hover viola.
- `subtle`: fondo soft, radius meno pill, per azioni di supporto.
- `danger`: solo per azioni distruttive, sempre con conferma nel flusso reale.

### Badge

- `active`: fondo lime soft, testo `--accent-lime-text`.
- `running`: tinta blu con testo blu accessibile.
- `idle`: neutro.
- `error`: rosso soft.
- `beta`: tinta viola.

### Card

Usare card per un singolo oggetto ripetibile, una metrica o un modulo. Evitare card dentro card. Hover solo quando la card e cliccabile.

### Form

Input bianchi, bordo `--border`, focus lime con ring soft. Label brevi in uppercase. Placeholder informativi ma non essenziali.

## Logo

- Spazio di protezione: almeno l'altezza del bolt mark su tutti i lati.
- Dimensione minima: 64px per icone web, 24mm di larghezza per stampa.
- Su fondo chiaro usare `logo.svg` o `logo-color.svg`.
- Su fondo scuro usare `logo-white.svg`.
- Non cambiare colore al bolt fuori dai token lime.
- Non aggiungere ombre, outline o gradienti al logo.
- Non comprimere, stirare o ricostruire il wordmark manualmente.

## Iconografia

Preferire icone lineari con stroke 1.5-2px, cap e join arrotondati. Lucide Icons e la libreria consigliata per prodotto e marketing. Le icone devono comunicare azioni reali, non decorazione generica.

Dimensioni:

| Contesto | Size |
| --- | ---: |
| Inline/meta | 16px |
| UI standard | 20px |
| Feature | 24px |
| Hero o empty state | 40-48px |

## Motion

- Transizioni standard: 150-200ms ease-out.
- Reveal: opacity + translateY leggero.
- Hover card: bordo piu evidente e micro lift solo su elementi cliccabili.
- Press state: scale leggero o riduzione brightness.
- Evitare animazioni elastiche o troppo giocose.

## Uso Rapido

In un prototipo HTML:

```html
<link rel="stylesheet" href="colors_and_type.css">
```

Per usare il tema scuro:

```html
<main data-theme="dark">
  ...
</main>
```

Per aprire la demo web:

```text
ui_kits/web/index.html
```

## Checklist Di Implementazione

- Importare `colors_and_type.css` o mappare gli stessi token nel framework.
- Usare Space Grotesk per heading/bottoni e Inter per body/form.
- Usare `--accent-blue-text` per link su fondo chiaro.
- Verificare focus visibile per ogni controllo interattivo.
- Evitare nuove tonalita se un token esistente copre il caso.
- Testare contrasto AA su testo normale e label.
- Mantenere CTA primaria lime una sola volta per schermata quando possibile.

## Gap Da Completare

- Esportazioni raster finali del logo: PNG 64/128/256px e JPG 300dpi.
- Versioni AI/EPS, se servono ai fornitori stampa.
- PDF palette, guida tipografica e brand book 8-12 pagine.
- Template editabili per social, presentazioni e carta intestata.
- Eventuale tema dark completo per marketing website, se verra richiesto come superficie primaria.

## Fonti

- `uploads/Brief_Claude_Design.txt`
- `colors_and_type.css`
- `preview/*.html`
- `ui_kits/web/*`

Aggiornato: maggio 2026.
