# brand · stella.casa

Brand identity di stella.casa: marchio Incastro, palette, tipografia, illustrazioni, template dei canali, master di stampa, brand book. Fonte unica per ogni output visivo o editoriale (landing, simulatore, offerte, PDF, social, email).

Orientamento rapido: `LEGGIMI.md`. Decisioni di design: `sorgenti/DECISIONI.md`. Come rilasciare: `RELEASING.md`.

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
9. **Contenuti vietati nel repo (è pubblico):** dati di clienti o ospiti, dati di terzi a pagamento, prezzi o strategia interna, materiale di terzi o riferimenti con copyright, segreti. Contatti e prezzi sono sempre segnaposto. Materiale interno e ricerche vanno in `knowledge-hub`.

## Limiti dichiarati

- Tracciati del marchio vettorializzati dalla tavola originale: prima di stampe grandi serve ridisegno geometrico e verifica di registrabilità.
- Illustrazioni generate e rilavorate: per stampe grandi serve un esecutivo alla risoluzione richiesta.
- Master di stampa in RGB, non PDF/X: conversione CMYK con il profilo della tipografia.
- Sito e canali sono prototipi locali: i moduli non inviano dati.

## Flusso di lavoro

- Branch and pull requests.
- Modifiche su branch `agente/<task>`, revisione e merge su `main`. Nessun push diretto su `main`.
- Dopo una modifica visibile: rigenera i derivati, controlla in browser, aggiorna i PDF e, se serve, una Release (`RELEASING.md`).
