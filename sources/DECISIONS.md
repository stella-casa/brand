# Decision log · stella.casa

Consolidation of 28 September 2026. The document structure is that of v4, approved on 22 September 2026: brand identity in 16 plates, brand book in 27 pages, same sequence and same set of contents. The contents change according to the decisions below.

## Positioning

- The site must convince **owners** to entrust their management (27 September). The home page speaks to them; guests get the house page.
- Main message: «La tua casa, seguita da vicino.» Co-hosting: «La casa è tua. Anche l’annuncio.», always with the explanation: listing, account and reviews stay with the owner.
- Closing verbal signature: «Case per soggiornare. Case da seguire.» It is not part of the logo.
- Parent brand stella.casa. Stella sul Mare is the pilot house in Oneglia (32 m², second floor) and keeps its name.

## Mark

- **01 Incastro** chosen (28 September). Firma × Filo / Iniziale 24 leaves the system.
- Three compositions: full mark (symbol above, name below), horizontal signature (header, email, documents, sign), symbol (avatar, favicon, sticker, key ring, signatures in posts). Logotype only as a secondary element.
- Color: Prugna on light backgrounds, Crema on dark backgrounds; on Corallo the symbol is Prugna. Never Corallo on Corallo, never Crema on Pesca or Lavanda.
- Clear space: 25% of the symbol height (the step between the two roofs).
- On the site the name «stella.casa» is always visible next to the symbol.
- The paths are vectorized from plate 01. To do before public use: exact geometric redraw and registrability check.

## Color

- Palette: Corallo #F25B45 (the only accent), Vino #511B36, Pesca #F6B495, Lavanda #B7A0CA, Crema #FFF3E7, Prugna #281C2D.
- Contrasts measured in `contrast.json`. Correction found during consolidation: white on Corallo is 3.3:1, so only for large headings; small text on Corallo is Prugna (4.9:1).
- Vino → Corallo gradient at 132° only for covers and narrative backgrounds.

## Typography

- Outfit 600 for headings (−0.045 em, line height 0.99), DM Sans for text and interface (18 px / 1.55). OFL licenses in `font/`.

## Illustration

- Hand-drawn SVGs were discarded: too schematic.
- The original book illustrations are used, reworked in **plum → cream duotone** with print grain; the cedar-yellow accent becomes Corallo.
- Two families: **A · Silhouette and light** (luce-persiane, luce-lama) for emotion and first contact; **B · Detail engraving** (incisione-facciata, incisione-spaccato) for explaining.
- Rules: Corallo only on light or threshold; one family per block (not side by side in the same row); headings in cream labels; same Ligurian subjects.
- Excluded: continuous line and pencil (too delicate), collage, ceramic and gouache (incompatible grounds and accents).
- Guide page: `channels/site/illustrations.html`.

## Photography

- Only real photos of the pilot house to represent houses. The interior set at the opening is generated and declared in the caption.

## Site and interface

- Home: opening, manifesto on Corallo, method in four cards, three illustrated gestures (Aprire, Preparare, Accogliere), pilot house, FAQ and contact.
- Header: transparent at the opening, transforms continuously with scroll (12–232 px) into a cream pill up to 1100 px, radius 48, 14 px blur; the symbol shifts gradually from cream to Prugna.
- Method: four cards (Crema, Corallo, Pesca, Vino). Stepped component: one gesture = one card, slide 0.8 s cubic-bezier(.7,0,.2,1); inertia absorbed on entry; exit at the first/last card; arrows, space, swipe, buttons; list below 800 px and with reduced motion. It replaces the continuous-scroll version and the scroll-snap one, both discarded.
- House page: request with dates and guests and local summary; availability and price confirmed by stella.casa (flow taken from a direct-booking site). No simulated price or calendar.
- Study button «Esplora il progetto»: for the presentation only, not part of the brand. On mobile it is a circle with the symbol.

## Physical materials

- Entrance sign as in v4: Prugna, cream signature, house name and «Una casa seguita da stella.casa».
- 150 × 100 mm name plate next to the front door: Crema, symbol and house name in Vino.
- Textiles in two versions: light (Crema, Vino embroidery) and dark (Vino, Crema embroidery). Only the symbol is embroidered, in satin stitch: on the towel band, in the corner of the Oxford edge of the pillowcases, at the center of the sheet turndown. Corallo only as a thin outline. Key ring in Vino or Corallo leather, brass ring.
- The photographic mockups of textiles and key ring are generated images, used as an intent visualization. The spec sheets (`print/spec-sheets/`) remain the production specification.
- The entrance mockup is the v4 photo with the new sign and card; the name plate is on the real photo of the facade.

## Channels

- Instagram: 3×3 grid with five formats (house photo, phrase on a field, list on Crema, illustration A, gradient). Signatures in the tiles do not scale up with the photos.
- Facebook: must be recognizable as a Facebook page; cover illustration A.
- Substack «Lettere da casa»: masthead with logo, illustration B banner, featured article, archive, subscription.
- Journal and article on the quote: illustration B at the opening.

## Technical choices of the presentation

- No invented data: examples and placeholders are declared.
- Forms and subscriptions only return a local summary.
