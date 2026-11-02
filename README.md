# brand · stella.casa

Brand identity di stella.casa: marchio Incastro, palette, tipografia, illustrazioni, template dei canali, master di stampa, brand book. Fonte unica per ogni output visivo o editoriale (landing, simulatore, offerte, PDF, social, email).

Licenze: codice GPL-3.0, identità visiva con diritti riservati, font OFL (`LICENZE.md`, `LICENSE`).

Orientamento rapido: `LEGGIMI.md`. Decisioni di design: `sorgenti/DECISIONI.md`. Come rilasciare: `RELEASING.md`.

## Quale asset usare, e dove

Percorsi relativi alla radice del repo. Colori e font vengono sempre da `tokens.css` / `design-tokens.json` e dai file in `font/`.

| Uso | Cosa prendere | Note |
|---|---|---|
| **Landing e pagine web** | Logo: `assets/firma-*.svg` (header orizzontale) o `assets/logo-*.svg` (marchio completo). Favicon: `assets/favicon.svg` / `.png`. Icone: `assets/icone/*.svg`. Illustrazioni: `assets/luce-*.jpg` (famiglia A), `assets/incisione-*.jpg` (famiglia B). Hero: `assets/hero-scenografia.png`. Foto: `assets/casa-*`. Stile: `tokens.css`, `font/` | Riferimento completo di layout e componenti: `canali/sito/` (home, scheda casa, diario, articolo, lettere). Preferisci SVG; i PNG solo dove l'SVG non basta |
| **Applicazioni e web app (simulatore, strumenti)** | Solo token e font (`tokens.css`, `design-tokens.json`, `font/`), icone `assets/icone/*.svg`, simbolo `assets/simbolo-*.svg`, `assets/favicon.*`, `assets/avatar.*` | Nessun valore o font inventato. Controlla i contrasti in `sorgenti/contrasti.json` |
| **Social (Instagram, Facebook, Substack)** | Template in `canali/`: `instagram-story.html` (1080×1920), `instagram-carousel-0N.html` (1080×1350), mockup `canali/instagram-feed.png`, `facebook.png`. Avatar: `assets/avatar.png`. Firma nei post: `assets/simbolo-*.svg` | Cambia i testi nell'HTML ed esporta il PNG alla stessa dimensione. Formati e regole: `canali/LEGGIMI.md` |
| **Email** | `canali/firma-email.html` (600×220), `canali/benvenuto.html` (card ospiti, A5) | Contatti e dati sono segnaposto «esempio» |
| **Documenti, preventivi, report** | Logo: `assets/firma-*.svg` o `assets/logo-*.svg`; layout di riferimento: `canali/quaderno.html` (A4), `canali/locandina.html` (A3) | Font e colori dai token |
| **Materiale fisico (stampa)** | Master in `stampa/`: biglietto 91×61 con abbondanza 3 mm, cartellina, segnalibro, targa, targhetta, adesivo, portachiavi (fustella); schede tecniche tessili in `stampa/schede/`; mockup in `assets/mockup-*` | RGB, non PDF/X: conversione CMYK con il profilo della tipografia. Specifiche: `stampa/LEGGIMI.txt` |
| **Locandine e cartaceo** | `canali/locandina.html` (A3), `canali/benvenuto.html` (A5) | |
| **Presentazioni e materiale commerciale** | `assets/logo-*.svg`, `assets/luce-*.jpg`, `assets/incisione-*.jpg`, token | Mai illustrazioni di famiglie diverse nello stesso blocco |
| **Brand book e regole** | `pdf/` (PDF correnti), `brand-book.html`, `brand-identity.html` | Versioni storiche nelle Releases |

Varianti colore dei loghi: `-prugna` sui fondi chiari, `-crema` sui fondi scuri, `-vino` e `-corallo` secondo le regole di colore sotto.

## Struttura

| Percorso | Contenuto | Tipo |
|---|---|---|
| `tokens.css`, `design-tokens.json` | Colori, font, raggi, spaziature, easing | **sorgente** (vanno tenuti allineati) |
| `font/` | Outfit e DM Sans WOFF2 + licenze OFL | sorgente |
| `assets/` | Logo (`logo-*`), firma (`firma-*`), simbolo, logotipo, avatar, favicon, illustrazioni (`luce-*` famiglia A, `incisione-*` famiglia B), foto casa pilota, `icone/` | sorgente (SVG) + PNG esportati |
| `canali/*.html` | Template editabili: story, caroselli, firma email, locandina, benvenuto, quaderno | sorgente |
| `canali/*.png` | Export dei template, stesso nome dell'HTML | **generato** |
| `canali/sito/` | Prototipo del sito (home proprietari, social, diario, articolo, scheda casa) | sorgente, non pubblicato |
| `stampa/` | Master SVG (biglietto, targa, adesivo, portachiavi, segnalibro, cartellina) e `LEGGIMI.txt` con specifiche | sorgente (SVG), PNG generati |
| `stampa/schede/` | Schede tecniche asciugamani, letto, portachiavi | **generato** da `sorgenti/genera-schede.py` |
| `brand-identity.html`, `brand-book.html` | Documenti (16 tavole, 27 pagine) | **generato** da `sorgenti/genera-documenti.py` |
| `pdf/` | PDF correnti di brand identity e brand book | **generato** (Chrome headless, vedi `RELEASING.md`) |
| `index.html`, `book.css` | Indice e stile dei documenti | sorgente |
| `playground/` | Esploratore di identità (logo, palette, font, illustrazioni) | `index.html` generato da `build.mjs`; resto sorgente |
| `sorgenti/` | `DECISIONI.md`, `contrasti.json`, script di generazione | sorgente |

## Cosa si modifica a mano e cosa no

- **A mano:** token, asset SVG, template in `canali/`, master in `stampa/`, testi in `sorgenti/genera-documenti.py`, `DECISIONI.md`.
- **Mai a mano (si rigenera):** `brand-identity.html`, `brand-book.html`, `playground/index.html`, `stampa/schede/*`, i PDF, i PNG di `canali/`.
- **Mai committati:** archivi e versioni storiche (zip, PDF vecchi). Vanno nelle Releases (`RELEASING.md`). `dist/` è ignorato.

## Rigenerare

```sh
python3 sorgenti/genera-documenti.py      # brand-identity.html + brand-book.html
python3 sorgenti/genera-schede.py         # stampa/schede (Pillow)
cd playground && node build.mjs           # playground (Python 3 con Pillow e NumPy)
```
PDF: comando Chrome headless in `RELEASING.md`. PNG dei canali: riesporta lo screenshot alla stessa dimensione di viewport indicata in `canali/LEGGIMI.md`.

## Regole per modificare o creare asset

1. **Colori e font solo dai token.** Palette: Corallo #F25B45 (unico accento), Vino #511B36, Pesca #F6B495, Lavanda #B7A0CA, Crema #FFF3E7, Prugna #281C2D. Font: Outfit (titoli), DM Sans (testo). Nessun valore o font inventato. Se cambi un token, aggiorna `tokens.css` **e** `design-tokens.json`, poi `sorgenti/contrasti.json` se cambiano i contrasti.
2. **Contrasti:** bianco sul corallo solo per titoli grandi (3,3:1); testo piccolo sul corallo in prugna. Mai corallo su corallo, mai crema su pesca o lavanda.
3. **Logo:** prugna sui fondi chiari, crema sui fondi scuri; sul corallo il simbolo è prugna. Area di rispetto 25% dell'altezza del simbolo. Il nome «stella.casa» resta visibile accanto al simbolo nel sito. Non ridisegnare i tracciati.
4. **Illustrazioni:** famiglia A (luce) e famiglia B (incisione) mai nello stesso blocco.
5. **Nuovo asset:** SVG se possibile; nome `tipo-variante.ext` in minuscolo con trattini, come in `assets/`; esporta il PNG con lo stesso nome; usa solo font e colori dei token.
6. **Nuovo template di canale:** HTML standalone dimensionato esattamente al formato, che richiama `../tokens.css`; dati e contatti sono placeholder etichettati «esempio»; documenta formato e uso in `canali/LEGGIMI.md`.
7. **Documenti (identity/book):** la struttura (16 tavole, 27 pagine, stessa sequenza) è approvata: si cambiano i contenuti, non l'ordine. Modifica `sorgenti/genera-documenti.py`, rigenera, poi rigenera i PDF.
8. **Decisioni:** ogni scelta di design nuova o cambiata va in `sorgenti/DECISIONI.md` (una riga, data, motivo). Niente storia delle revisioni altrove.
9. **Licenze:** il codice nuovo è GPL-3.0; asset e marchio restano a diritti riservati (`LICENZE.md`). Font solo OFL.
10. **Contenuti vietati nel repo (è pubblico):** dati di clienti o ospiti, dati di terzi a pagamento, prezzi o strategia interna, materiale di terzi o riferimenti con copyright, segreti. Contatti e prezzi sono sempre segnaposto. 

## Limiti dichiarati

- Tracciati del marchio vettorializzati dalla tavola originale: prima di stampe grandi serve ridisegno geometrico e verifica di registrabilità.
- Illustrazioni generate e rilavorate: per stampe grandi serve un esecutivo alla risoluzione richiesta.
- Master di stampa in RGB, non PDF/X: conversione CMYK con il profilo della tipografia.
- Sito e canali sono prototipi locali: i moduli non inviano dati.

## Contribuire

- Lavora su un branch dedicato e apri una pull request verso `main`: niente push diretti su `main`.
- Dopo una modifica visibile: rigenera i derivati, controlla in browser, aggiorna i PDF e, se serve, pubblica una Release (`RELEASING.md`).
