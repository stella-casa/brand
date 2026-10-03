# Playground d’identità stella.casa

Aprire `index.html` in un browser. Il playground funziona in locale e non richiede un server.

Seleziona una proposta della shortlist, una palette, un sistema tipografico e una direzione illustrativa. Il marchio viene ricolorato con l’inchiostro scelto; le illustrazioni vengono adattate ai quattro ruoli cromatici della palette. La selezione aggiorna landing, blog, post singolo e feed Instagram, Facebook e cartoncino fisico. Si può selezionare un’illustrazione anche dalla galleria e copiare l’indirizzo per condividere la combinazione.

I dati e le immagini originali (due tavole logo, palette, font, illustrazioni I00–I09) sono in `sorgenti/`; foto e progetto della casa sono letti da `../assets/` e `../canali/sito/`; le maschere logo e le varianti illustrate sono derivate per il playground. `I00 / La base v4` è inclusa per il confronto. Il pulsante «Riparti da v4» ripristina la combinazione d’ingresso (Incastro, palette C00, font T00 e illustrazione I00), non dichiara approvato il logo.

Per rigenerare la pagina dopo modifiche alle sorgenti, da questa cartella eseguire:

```sh
node build.mjs
```

La generazione richiede Python 3 con Pillow e NumPy, usati per creare maschere logo e immagini illustrative ricolorate in WebP. Le tavole originali restano invariate.

## Landing per i proprietari

Dalla pagina [landing.html](landing.html) si apre direttamente la bozza per i proprietari. In alternativa, aggiungi `?view=landing` all’indirizzo di `index.html`. La modalità usa la stessa pagina e conserva i quattro selettori e l’URL condivisibile; **Torna al confronto identità** riapre il playground completo.

La pagina mette in sequenza promessa e immagine della casa, cosa resta al proprietario nel co-hosting, metodo, reportage del progetto pilota, esempio di rendiconto, struttura dei costi, presenza sul territorio, FAQ e contatto. Il modulo mostra soltanto un riepilogo nella pagina: non invia né salva dati. Le fotografie provengono dall’archivio della casa pilota; non sono usate come risultati di gestione. Logo, palette e font restano scelte aperte.
