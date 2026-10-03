# Registro delle decisioni · stella.casa

Consolidamento del 28 settembre 2026. La struttura dei documenti è quella della v4 approvata il 22 settembre 2026: brand identity in 16 tavole, brand book in 27 pagine, stessa sequenza e stesso corredo. Cambiano i contenuti secondo le decisioni seguenti.

## Posizionamento

- Il sito deve convincere i **proprietari** ad affidare la gestione (27 settembre). La home parla a loro; gli ospiti hanno la scheda della casa.
- Messaggio principale: «La tua casa, seguita da vicino.» Co-hosting: «La casa è tua. Anche l’annuncio.», sempre con la spiegazione: annuncio, account e recensioni restano al proprietario.
- Firma verbale di chiusura: «Case per soggiornare. Case da seguire.» Non fa parte del logo.
- Marchio madre stella.casa. Stella sul Mare è la casa pilota a Oneglia (32 m², secondo piano) e tiene il suo nome.

## Marchio

- Scelto **01 Incastro** (28 settembre). Firma × Filo / Iniziale 24 esce dal sistema.
- Tre composizioni: marchio completo (simbolo sopra, nome sotto), firma orizzontale (header, email, documenti, targa), simbolo (avatar, favicon, adesivo, portachiavi, firme nei post). Logotipo solo come elemento secondario.
- Colore: prugna sui fondi chiari, crema sui fondi scuri; sul corallo il simbolo è prugna. Mai corallo su corallo, mai crema su pesca o lavanda.
- Area di rispetto: 25% dell’altezza del simbolo (il gradino fra i due tetti).
- Nel sito il nome «stella.casa» è sempre visibile accanto al simbolo.
- I tracciati sono vettorializzati dalla tavola 01. Da fare prima dell’uso pubblico: ridisegno geometrico esatto e verifica di registrabilità.

## Colore

- Palette: Corallo #F25B45 (unico accento), Vino #511B36, Pesca #F6B495, Lavanda #B7A0CA, Crema #FFF3E7, Prugna #281C2D.
- Contrasti misurati in `contrasti.json`. Correzione emersa nel consolidamento: bianco sul corallo è 3,3:1, quindi solo per titoli grandi; il testo piccolo sul corallo è prugna (4,9:1).
- Gradiente vino → corallo a 132° solo per copertine e fondi narrativi.

## Tipografia

- Outfit 600 per titoli (−0,045 em, interlinea 0,99), DM Sans per testo e interfaccia (18 px / 1,55). Licenze OFL in `font/`.

## Illustrazione

- Le SVG disegnate a mano sono state scartate: troppo schematiche.
- Si usano le illustrazioni originali del book rilavorate in **bicromia plum → crema** con grana da stampa; l’accento giallo cedro diventa corallo.
- Due famiglie: **A · Silhouette e luce** (luce-persiane, luce-lama) per emozione e primo contatto; **B · Incisione di dettaglio** (incisione-facciata, incisione-spaccato) per spiegare.
- Regole: corallo solo su luce o soglia; una famiglia per blocco (non affiancate nella stessa riga); titoli in etichette crema; stessi soggetti liguri.
- Escluse: linea continua e matita (troppo delicate), collage, ceramica e gouache (fondi e accenti incompatibili).
- Pagina guida: `canali/sito/illustrazioni.html`.

## Fotografia

- Solo foto reali della casa pilota per rappresentare case. La scenografia d’interni in apertura è generata e dichiarata in didascalia.

## Sito e interfaccia

- Home: apertura, manifesto sul corallo, metodo in quattro schede, tre gesti illustrati (Aprire, Preparare, Accogliere), casa pilota, FAQ e contatto.
- Header: trasparente in apertura, si trasforma in modo continuo con lo scroll (12–232 px) in una pillola crema fino a 1100 px, raggio 48, sfocatura 14 px; il simbolo passa da crema a prugna in modo graduale.
- Metodo: quattro schede (crema, corallo, pesca, vino). Componente a passo: un gesto = una scheda, slide 0,8 s cubic-bezier(.7,0,.2,1); inerzia assorbita all’ingresso; uscita alla prima/ultima scheda; frecce, spazio, swipe, pulsanti; lista sotto 800 px e con reduced motion. Sostituisce la versione legata allo scroll continuo e quella con scroll-snap, entrambe scartate.
- Scheda casa: richiesta con date e ospiti e riepilogo locale; disponibilità e prezzo confermati da stella.casa (flusso ripreso da un sito di prenotazione diretta). Nessun prezzo o calendario simulato.
- Pulsante di studio «Esplora il progetto»: solo per la presentazione, non fa parte del brand. Su mobile è un cerchio con il simbolo.

## Materiali fisici

- Targa d’ingresso come nella v4: prugna, firma crema, nome della casa e «Una casa seguita da stella.casa».
- Targhetta 150 × 100 mm accanto al portone: crema, simbolo e nome della casa in vino.
- Tessili in due versioni: chiara (crema, ricamo vino) e scura (vino, ricamo crema). Si ricama solo il simbolo, a punto raso: sulla fascia degli asciugamani, nell’angolo del bordo Oxford delle federe, al centro del risvolto del lenzuolo. Il corallo solo come profilo sottile. Portachiavi in pelle vino o corallo, anello in ottone.
- I mockup fotografici dei tessili e del portachiavi sono immagini generate, usate come visualizzazione d’intento. Le schede tecniche (`stampa/schede/`) restano la specifica per la produzione.
- Il mockup d’ingresso è la foto della v4 con targa e cartoncino nuovi; la targhetta è sulla foto reale della facciata.

## Canali

- Instagram: griglia 3×3 con cinque formati (foto casa, frase su campo, elenco su crema, illustrazione A, gradiente). Le firme nei riquadri non si ingrandiscono con le foto.
- Facebook: deve riconoscersi come pagina Facebook; copertina illustrazione A.
- Substack «Lettere da casa»: masthead con logo, banner illustrazione B, articolo in evidenza, archivio, iscrizione.
- Diario e articolo sul preventivo: illustrazione B in apertura.

## Scelte tecniche della presentazione

- Nessun dato inventato: esempi e segnaposto sono dichiarati.
- Moduli e iscrizioni restituiscono solo un riepilogo locale.
