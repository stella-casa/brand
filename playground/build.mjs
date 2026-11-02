import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const directory=path.dirname(fileURLToPath(import.meta.url));
const root=directory;
execFileSync('python3',[path.join(directory,'generate-masks.py')],{stdio:'inherit'});
const read=async p=>JSON.parse(await readFile(path.join(root,p),'utf8'));
const logos=JSON.parse(await readFile(path.join(root,'sources/logos/index.json'),'utf8'))
  .filter(x=>['01-incastro','24-firma-filo-iniziale'].includes(x.file));
const palettes=await read('sources/identity/colors.json');
const types=await read('sources/identity/typography.json');
const illustrations=(await read('sources/identity/illustrations.json')).proposte;
const fontCss=await readFile(path.join(root,'sources/identity/studi.css'),'utf8');
const faces=[...fontCss.matchAll(/@font-face\{[^}]+\}/g)].map(m=>m[0].replaceAll('url(font/','url(sources/identity/font/')).join('\n');
for(const l of logos){
  l.image=`sources/logos/${l.file}.png`;
  if(l.file==='01-incastro')Object.assign(l,{cropX:60,cropY:70,cropW:840,cropH:685,iconX:280,iconY:135,iconW:455,iconH:455,ground:'#f1c3a3'});
  else Object.assign(l,{cropX:45,cropY:65,cropW:875,cropH:640,iconX:660,iconY:780,iconW:150,iconH:150,ground:'#c2d4fb'});
  l.zoom=`${1536/l.cropW*100}% auto`;
  l.position=`${l.cropX/(1536-l.cropW)*100}% ${l.cropY/(1024-l.cropH)*100}%`;
  l.iconZoom=`${1536/l.iconW*100}% auto`;
  l.iconPosition=`${l.iconX/(1536-l.iconW)*100}% ${l.iconY/(1024-l.iconH)*100}%`;
  l.mask=`assets/logo-${l.number}.png`;
  l.symbol=`assets/simbolo-${l.number}.png`;
  l.maskData=(await readFile(path.join(directory,l.mask))).toString('base64');
  l.symbolData=(await readFile(path.join(directory,l.symbol))).toString('base64');
  l.markRatio=String(l.cropW/l.cropH);
  l.symbolRatio=String(l.iconW/l.iconH);
}
const cleanIllustrations=[{
  id:'I00',file:'i00-v4',name:'La base v4',character:'domestico, lineare, quieto.',
  description:'La scena illustrata che accompagna la brand identity v4: la casa raccontata attraverso un gesto quotidiano, con un segno sottile e una campitura d’accento.',
  accent:'Un dettaglio domestico colorato concentra l’attenzione; il disegno resta aperto e arioso.',
  rules:'Conservare il tratto leggero e lo spazio bianco. Usare l’accento con parsimonia e mantenere leggibili le linee sui formati piccoli.',
  channels:'Scena intera su sito e carta; ritaglio del dettaglio per post e copertine.',
  risk:'Il tratto fine va controllato in stampa e nei ritagli social.',logos:'Riferimento illustrativo della v4, indipendente dalla scelta del logo.',
  image:'sources/identity/assets/i00-v4.png',colorImages:Object.fromEntries(palettes.map(c=>[c.id,`assets/colors/i00-${c.id.toLowerCase()}.webp`]))
},...illustrations.map(({prompt,...item})=>({...item,image:`sources/identity/assets/${item.file}.png`,colorImages:Object.fromEntries(palettes.map(c=>[c.id,`assets/colors/${item.id.toLowerCase()}-${c.id.toLowerCase()}.webp`]))}))];
const safeJson=value=>JSON.stringify(value).replaceAll('<','\\u003c').replaceAll('\u2028','\\u2028').replaceAll('\u2029','\\u2029');
const title='stella.casa / Play di identità';
const html=`<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<style>${faces}</style>
<link rel="stylesheet" href="playground.css">
<link rel="stylesheet" href="logo-previews.css">
<link rel="stylesheet" href="landing.css">
<script defer src="playground.js"></script>
</head>
<body>
<header class="masthead" id="inizio">
  <a class="mast-brand" href="#inizio">stella.casa <span>/ play d’identità</span></a>
  <a class="source-link" href="../index.html">Indice delle linee guida</a>
</header>
<main>
  <section class="opening">
    <div><p class="eyebrow">Due loghi / Sette palette / Sette sistemi tipografici / Dieci illustrazioni</p>
      <h1>Prova la<br>combinazione.</h1>
      <p class="opening-copy">Metti insieme una proposta di marchio e una direzione visiva. Vedi come convivono su sito, diario, social e carta.</p>
    </div>
    <div class="open-index"><a href="#componi"><span>01</span> Componi la tua identità</a><a id="landing-view-link" href="?view=landing"><span>02</span> Landing proprietari a tutta larghezza</a><a href="#illustrazioni"><span>03</span> Confronta i disegni</a><a href="#regole"><span>04</span> Cosa stai guardando</a></div>
  </section>

  <section id="componi" class="playground">
    <aside class="controls">
      <p class="eyebrow">Punto di partenza</p><h2>Metti insieme i pezzi.</h2>
      <details class="landing-settings"><summary><span>Modifica combinazione</span><strong id="selection-summary-mobile"></strong></summary><div class="landing-settings-fields">
      <label for="logo-select">Logo <span>La shortlist</span></label><select id="logo-select"></select>
      <label for="palette-select">Colore <span>Ruoli e codici HEX</span></label><select id="palette-select"></select>
      <label for="type-select">Font <span>Titoli, lettura e interfaccia</span></label><select id="type-select"></select>
      <label for="ill-select">Illustrazione <span>Tutte le esplorazioni</span></label><select id="ill-select"></select>
      <div class="control-actions"><button id="reset" type="button">Riparti da v4</button><button id="copy" type="button">Copia il link</button></div>
      <p id="copy-status" class="copy-status" aria-live="polite"></p>
      <div class="picked"><span>Combinazione attuale</span><strong id="selection-summary"></strong></div>
      </div></details>
      <a id="landing-exit" class="landing-exit" href="#componi">Torna al confronto identità</a>
  <p class="control-note">Il marchio usa il colore “inchiostro” della palette; il simbolo social usa lo stesso colore su fondo “accento”. Le tavole complete restano invariate negli archivi.</p>
    </aside>
    <div class="live" id="live" aria-live="polite">
      <div class="live-heading"><div><p class="eyebrow">Anteprima in contesto</p><h2>Una marca. Più luoghi.</h2></div><span id="live-codes"></span></div>

      <article class="site" id="site">
        <div class="site-nav"><div class="site-nav-brand"><span id="site-mark" class="mini-mark" role="img" aria-label="Logo selezionato"></span><small>gestione di case</small></div><div>Case&nbsp;&nbsp; Diario&nbsp;&nbsp; Per i proprietari&nbsp;&nbsp; <b>Parliamone</b></div></div>
        <div class="site-hero"><div class="site-copy"><p class="eyebrow">Il lavoro, dentro casa</p><h3>La casa è tua.<br>Il lavoro si vede.</h3><p>Una scelta di gestione per ogni immobile. Regole chiare, controlli e un quaderno che documenta il lavoro.</p><span class="text-action">Come lavoriamo <i>↗</i></span></div><figure class="site-art"><img id="site-image" src="" alt="Illustrazione selezionata"></figure></div>
        <div class="site-services"><article><b>Una formula spiegata</b><span>Costi e commissioni, con la base di calcolo.</span></article><article><b>Controlli in casa</b><span>Foto, note e interventi tracciati nel quaderno.</span></article><article><b>La scelta del contratto</b><span>Turistico, transitorio o stagionale, caso per caso.</span></article></div>
        <div class="logo-stamp" id="logo-stamp"><span>Segno e lettering della proposta</span><div id="logo-crop" class="logo-crop" role="img" aria-label="Marchio della proposta selezionata"></div><a id="logo-original" href="#">Apri la tavola completa del logo ↗</a></div>
      </article>

      <div class="channel-grid">
        <article class="blog-channel">
          <div class="channel-title"><h3>Diario / Blog</h3><span>Articolo e fotografia</span></div>
          <div class="blog-paper"><div class="blog-nav"><span id="blog-mark" class="micro-mark" role="img" aria-label="Logo selezionato"></span><span>Il diario di Oneglia</span></div><p class="eyebrow">Il lavoro dentro casa</p><h4>Una casa si prepara prima di aprire.</h4><p class="blog-deck">Le ore fra due soggiorni raccontano un lavoro fatto di gesti precisi.</p><img id="blog-image" src="" alt="Illustrazione selezionata nell’articolo"><p class="caption">Una scena, un gesto, una storia da raccontare.</p><h5>Il dettaglio che resta.</h5><p class="blog-copy">Aprire le persiane, controllare una maniglia, annotare quello che va sistemato. Il quaderno tiene insieme le cose viste, il lavoro fatto e il prossimo passo.</p></div>
        </article>
        <article class="instagram-channel">
          <div class="channel-title"><h3>Instagram / Post singolo</h3><span>Feed · 4:5</span></div>
          <div class="social-card"><div class="social-head"><span class="social-avatar" id="social-avatar" role="img" aria-label="Simbolo del logo selezionato"></span><b>stella.casa</b><span>•••</span></div><div class="social-art"><img id="social-image" src="" alt="Illustrazione selezionata per il post"></div><div class="social-copy"><span class="eyebrow">Il quaderno della casa</span><h4>Il lavoro si vede nei dettagli.</h4><p>Un controllo, una nota. La casa è pronta.</p></div><div class="social-foot">♡　◯　↗ <span>1 / 9</span></div></div>
          <div class="feed-heading"><strong>Anteprima feed</strong><span>Griglia 3 × 3 · alternanza di scena, segno e testo</span></div>
          <div class="instagram-feed" id="instagram-feed" aria-label="Anteprima di nove contenuti Instagram">
            <div class="feed-tile feed-art"><img alt="Illustrazione selezionata nel feed"></div>
            <div class="feed-tile feed-type"><span>IL QUADERNO<br>DELLA CASA</span><strong>Il lavoro<br>si vede.</strong><i>01 — METODO</i></div>
            <div class="feed-tile feed-detail"><img alt="Dettaglio dell’illustrazione selezionata"><span>una nota, poi il gesto</span></div>
            <div class="feed-tile feed-mark"><span class="feed-mark-symbol" role="img" aria-label="Simbolo del logo scelto"></span><b>stella.casa</b><small>CASE, CON CURA.</small></div>
            <div class="feed-tile feed-frame"><img alt="Scena illustrata nel feed"><span>PRIMA DI APRIRE</span></div>
            <div class="feed-tile feed-quote"><span>02 — IL METODO</span><strong>Una casa<br>si prepara<br>prima.</strong><i>→</i></div>
            <div class="feed-tile feed-accent"><span>IL DIARIO<br>DI ONEGLIA</span><strong>Luoghi.<br>Gesti.<br>Case.</strong></div>
            <div class="feed-tile feed-detail feed-detail-alt"><img alt="Taglio editoriale della scena selezionata"><span>il dettaglio resta</span></div>
            <div class="feed-tile feed-closer"><span class="feed-wordmark" role="img" aria-label="Logo scelto"></span><small>storie di case<br>e di chi se ne prende cura</small><b>stella.casa</b></div>
          </div>
        </article>
      </div>

      <div class="channel-grid wide-grid">
        <article class="facebook-channel">
          <div class="channel-title"><h3>Facebook / Copertina editoriale</h3><span>Formato largo</span></div>
          <div class="facebook-card"><img id="facebook-image" src="" alt="Illustrazione selezionata in formato orizzontale"><div><p class="eyebrow">stella.casa / Il diario</p><strong>Fuori dalla porta.</strong><span>Una guida di Oneglia fatta di luoghi, persone e cose da mangiare.</span></div></div>
        </article>
        <article class="physical-channel">
          <div class="channel-title"><h3>In casa / Cartoncino</h3><span>Stampa e materia</span></div>
          <div class="welcome-object"><div class="welcome-illustration"><img id="welcome-image" src="" alt="Illustrazione selezionata sul cartoncino di benvenuto"></div><div class="welcome-copy"><p class="eyebrow">Ben arrivati</p><h4>Il quaderno<br>della casa è qui.</h4><p>Appunti utili per i giorni a Oneglia.</p><span id="welcome-mark" class="mini-mark" role="img" aria-label="Logo selezionato"></span></div></div>
        </article>
      </div>

      <div class="owner-landing" id="landing-proprietari">
        <nav class="landing-nav" aria-label="Navigazione della landing demo">
          <a class="landing-wordmark" href="#landing-top" aria-label="stella.casa, torna all’inizio della landing"><span class="landing-mark" role="img" aria-label="Simbolo del logo scelto"></span><b>stella.casa</b></a>
          <div><a href="#landing-metodo">Il metodo</a><a href="#landing-caso">La casa pilota</a><a href="#landing-faq">Domande</a><a class="landing-nav-cta" href="#landing-contatto">Parliamo della tua casa</a></div>
        </nav>
        <section class="owner-hero" id="landing-top">
          <div class="owner-hero-heading"><p class="eyebrow">Per i proprietari · Imperia e ponente ligure</p><h1>La tua casa.<br>Conti alla mano.</h1></div>
          <div class="owner-hero-frame"><figure class="owner-hero-photo"><img src="../assets/casa-soggiorno.jpg" alt="Soggiorno del monolocale Stella sul Mare, foto dell’archivio di progetto"><figcaption>Stella sul Mare · Oneglia · foto dell’archivio di progetto</figcaption></figure><div class="owner-hero-panel"><p class="hero-promise">Valutiamo come affittarla, rendiamo chiari i costi e seguiamo la gestione.</p><p class="hero-reassurance">Tu sai che cosa succede e che cosa ti resta.</p><a class="owner-button" href="#landing-contatto">Parliamo della tua casa <b>↗</b></a><span class="hero-panel-note">Una casa alla volta. Una proposta leggibile.</span></div></div>
        </section>
        <div class="owner-context-strip"><span>stella.casa / gestione di immobili</span><span>Una scelta da fare sulla singola casa</span><a href="#landing-metodo">Guarda il metodo <b>↗</b></a></div>

        <section class="owner-ownership owner-section">
          <div class="ownership-mark"><span class="ownership-kicker">Quando lavoriamo in co-hosting</span><h2>La casa<br>resta tua.</h2><span class="ownership-foot">Una gestione condivisa, con responsabilità da mettere nero su bianco.</span></div>
          <div class="ownership-copy"><p class="eyebrow">Il tuo patrimonio rimane leggibile</p><h2>Annuncio.<br>Recensioni.<br>Fotografie.</h2><p>Nel co-hosting annunci e profili restano nella disponibilità del proprietario, secondo le condizioni concordate. La proposta chiarisce accessi, responsabilità e cosa succede alla fine del rapporto.</p><div class="ownership-line"><span>La tua casa</span><span>La tua storia</span><span>Il tuo controllo</span></div></div>
        </section>

        <section class="owner-method owner-section" id="landing-metodo">
          <div class="method-heading"><p class="eyebrow">Prima di pubblicare</p><h2>Prima guardiamo.<br>Poi facciamo i conti.</h2><p>Partiamo da ciò che la casa può sostenere. Le ipotesi restano riconoscibili come ipotesi; ogni passaggio diventa una decisione da condividere.</p></div>
          <div class="method-layout"><ol class="method-steps"><li><span>01</span><div><h3>Guardiamo la casa.</h3><p>Posizione, spazi, dotazioni, condizioni e disponibilità. Anche quello che non funziona.</p></div></li><li><span>02</span><div><h3>Mettiamo i costi in chiaro.</h3><p>Confrontiamo modalità di affitto, costi e dati utilizzabili. Senza presentare le stime come risultati.</p></div></li><li><span>03</span><div><h3>Facciamo il lavoro.</h3><p>Accordi, annuncio, preparazione, accoglienza e controlli diventano attività concrete.</p><img id="landing-method-image" class="method-inline-art" src="" alt="Illustrazione selezionata, piccolo accento a margine del metodo"></div></li></ol><div class="method-aside"><span>Il punto non è riempire un calendario.</span><b>È sapere che cosa stiamo facendo, e perché.</b><a href="#landing-rendiconto">Vedi come documentiamo il lavoro</a></div></div>
        </section>

        <section class="owner-pilot owner-section" id="landing-caso">
          <div class="pilot-copy"><div><p class="eyebrow">La casa da cui siamo partiti</p><h2>Stella sul Mare.</h2></div><div class="pilot-summary"><p>Un monolocale di 32 m² a Oneglia. Il progetto pilota con cui abbiamo costruito il sito della casa, il diario della città e l’area ospiti.</p><a href="../channels/site/property.html">Guarda il progetto della casa ↗</a></div><span class="pilot-meta">32 m² <i>/</i> Oneglia <i>/</i> Imperia</span></div>
          <figure class="pilot-image"><img class="pilot-main" src="../assets/casa-soggiorno.jpg" alt="Il soggiorno del monolocale Stella sul Mare"><div class="pilot-detail"><img src="../assets/casa-cucina.jpg" alt="Dettaglio della cucina di Stella sul Mare"></div><figcaption>Stella sul Mare · il progetto pilota, non un caso cliente né una promessa di rendimento.</figcaption></figure>
          <div class="pilot-annotations"><span><b>01</b> Annuncio e sito della casa</span><span><b>02</b> Informazioni prima e durante il soggiorno</span><span><b>03</b> Lavoro sugli ospiti e sulle recensioni</span><a href="../channels/site/property.html">Apri il progetto completo ↗</a></div>
        </section>

        <section class="owner-record owner-section" id="landing-rendiconto">
          <div class="record-intro"><p class="eyebrow">Un esempio di struttura</p><h2>La cura deve lasciare una traccia.</h2><p>Un controllo è utile quando puoi capire cosa è stato visto e cosa resta da fare. Il quaderno della casa mette ordine fra verifiche, note e interventi.</p><span class="facsimile-label">Facsimile di struttura · nessun intervento reale</span></div>
          <div class="record-sheet"><div class="record-title"><span>stella.casa / quaderno della casa</span><b>Modello dimostrativo</b></div><div class="record-columns"><b>Controllo</b><b>Evidenza</b><b>Prossimo passo</b></div><div class="record-row"><span>Dotazioni</span><span>Foto e nota</span><span>Intervento da valutare</span></div><div class="record-row"><span>Preparazione</span><span>Checklist</span><span>Verifica finale</span></div><div class="record-row"><span>Segnalazione</span><span>Descrizione</span><span>Aggiornamento al proprietario</span></div><div class="record-sheet-foot">Nessuna data, esito o attività riferiti a un intervento reale.</div></div>
        </section>

        <section class="owner-fees owner-section">
          <div><p class="eyebrow">Condizioni leggibili</p><h2>La percentuale,<br>da sola, non basta.</h2><p>Conta su quale importo viene calcolata e quali voci restano fuori. La proposta deve rendere leggibili commissione, costi e responsabilità prima di parlare di quanto può restare.</p></div>
          <div class="fee-formula"><div><span>01</span><b>Importi incassati</b></div><i>−</i><div><span>02</span><b>Voci escluse</b></div><i>=</i><div><span>03</span><b>Base di calcolo</b></div><i>→</i><div><span>04</span><b>Compenso</b></div><aside>Da mostrare nella proposta: base di calcolo, costi a carico del proprietario, ipotesi usate nella stima.</aside></div>
        </section>

        <section class="owner-presence owner-section">
          <div class="presence-statement"><p class="eyebrow">Presenza sul territorio</p><strong>Imperia<br>e dintorni.</strong><span>La distanza fra una promessa e un lavoro fatto si misura anche in chilometri.</span></div><div><p class="eyebrow">Quando serve esserci</p><h2>Una gestione ha un indirizzo.</h2><p>Sopralluoghi, preparazione e imprevisti richiedono persone riconoscibili e responsabilità chiare. La proposta indica chi segue la casa e come ci si aggiorna.</p><div class="presence-acts"><span>Visita alla casa</span><span>Preparazione</span><span>Controlli</span></div></div>
        </section>

        <section class="owner-faq owner-section" id="landing-faq">
          <div class="owner-heading"><p class="eyebrow">Prima di parlarne</p><h2>Le domande da cui partire.</h2></div><div class="faq-list"><details><summary>La mia casa deve essere già online?</summary><p>No. Il punto di partenza può essere un annuncio esistente o una casa ancora da preparare. Cambiano le informazioni da raccogliere e il lavoro iniziale.</p></details><details><summary>Proponete sempre l’affitto breve?</summary><p>Valutiamo la singola casa prima di scegliere come affittarla. Il confronto dipende da caratteristiche, disponibilità e dati utilizzabili.</p></details><details><summary>Posso valutare prima di affidare l’immobile?</summary><p>La prima conversazione serve a capire la casa e le tue esigenze. Il passo successivo è una proposta da leggere e discutere.</p></details><details><summary>Come seguirò il lavoro?</summary><p>La proposta dovrà indicare cosa viene documentato, come lo ricevi e a chi rivolgerti. Il facsimile sopra mostra il tipo di chiarezza che vogliamo ottenere.</p></details></div>
        </section>

        <section class="owner-contact owner-section" id="landing-contatto">
          <div><p class="eyebrow">Il primo passo</p><h2>Cominciamo<br>dalla tua casa.</h2><p>Dicci dove si trova e a che punto sei. Se hai già un annuncio, aggiungi il link: aiuta a partire da qualcosa di concreto.</p><p class="form-prototype-note">Questo è un prototipo: i dati non vengono inviati né salvati.</p></div>
          <form id="owner-demo-form" class="owner-form"><label>Nome<input name="nome" autocomplete="name" required></label><label>Email<input name="email" type="email" autocomplete="email" required></label><label>Comune<input name="comune" autocomplete="address-level2" required></label><label>La situazione<select name="situazione"><option>Già in affitto</option><option>Da preparare</option><option>Sto valutando</option></select></label><label class="form-wide">Link annuncio <span>facoltativo</span><input name="annuncio" type="url" placeholder="https://"></label><label class="form-wide">Una nota <span>facoltativa</span><textarea name="nota" rows="3"></textarea></label><button type="submit">Anteprima della richiesta</button><output class="form-output" id="owner-form-output" aria-live="polite"></output></form>
        </section>
        <footer class="owner-footer"><span class="landing-wordmark"><span class="landing-mark" aria-hidden="true"></span><b>stella.casa</b></span><span>Gestione di immobili · Imperia e ponente ligure</span><a href="#landing-top">Torna all’inizio ↑</a></footer>
      </div>
    </div>
  </section>

  <section id="palette" class="palette-section">
    <div class="section-intro"><div><p class="eyebrow">Tinta e superficie</p><h2>Colore della combinazione.</h2></div><p>Quattro ruoli, dallo schermo alla carta. Prova la palette nel contesto prima di affezionarti a un singolo campione.</p></div>
    <div id="swatches" class="swatch-row"></div>
    <div class="palette-note"><span id="palette-character"></span><span id="palette-description"></span></div>
  </section>

  <section id="illustrazioni" class="illustration-section">
    <div class="section-intro"><div><p class="eyebrow">Il linguaggio illustrativo</p><h2>Dieci scene,<br>dieci accenti.</h2></div><p>Scegli una tavola per provarla nei canali sopra. Le quattro direzioni nuove cambiano tecnica e composizione; le prime cinque e la base v4 restano disponibili.</p></div>
    <div id="illustration-gallery" class="illustration-gallery"></div>
  </section>

  <section id="loghi" class="logo-section">
    <div class="section-intro"><div><p class="eyebrow">La shortlist</p><h2>Il nome prende<br>due forme.</h2></div><p>Incastro affida il ricordo a una sagoma. Firma × Filo / Iniziale mette in primo piano la parola Stella e la sua S. Seleziona i due studi e apri ogni tavola completa.</p></div>
    <div id="logo-gallery" class="logo-gallery"></div>
  </section>

  <section id="regole" class="about-section"><div><p class="eyebrow">Come leggere il playground</p><h2>Questa è una prova di combinazione.</h2></div><div class="about-copy"><p>I contenuti di esempio mettono lo stesso marchio in pagine, social e materiali di casa. Titoli e testi sono campioni visivi, non promesse o nuove informazioni commerciali. Cambiando font si aggiornano gerarchie e ritorni a capo. Il marchio usa l’inchiostro della palette scelta e le illustrazioni vengono ricolorate nei ruoli di inchiostro, carta, accento e secondario, mantenendo ombre e texture.</p><p>Le illustrazioni sono studi editoriali. Per mostrare una casa o un intervento reali servono fotografie reali. La resa in ricamo, rilievo o stampa fisica si verifica su file vettoriali e campioni di produzione.</p></div></section>
</main>
<footer><a href="#inizio">stella.casa / play d’identità</a><span>Esplorazione. Nessuna combinazione ancora approvata.</span></footer>
<script id="playground-data" type="application/json">${safeJson({logos,palettes,types,illustrations:cleanIllustrations})}</script>
</body></html>
`;
await writeFile(path.join(directory,'index.html'),html);
console.log('Playground updated from logo archives and identity studies.');
