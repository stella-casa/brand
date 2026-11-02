# stella.casa identity playground

Open `index.html` in a browser. The playground works locally and needs no server.

Select a proposal from the shortlist, a palette, a type system and an illustration direction. The mark is recolored with the chosen ink; the illustrations are adapted to the four color roles of the palette. The selection updates the landing page, blog, single post, Instagram feed, Facebook and physical card. An illustration can also be selected from the gallery, and the address can be copied to share the combination.

The original data and images (two logo plates, palette, fonts, illustrations I00–I09) are in `sources/`; photos and the house project are read from `../assets/` and `../channels/site/`; the logo masks and illustrated variants are derived for the playground. `I00 / La base v4` is included for comparison. The «Riparti da v4» button restores the entry combination (Incastro, palette C00, font T00 and illustration I00); it does not declare the logo approved.

To regenerate the page after changes to the sources, run from this folder:

```sh
node build.mjs
```

Generation requires Python 3 with Pillow and NumPy, used to create logo masks and recolored illustration images in WebP. The original plates stay unchanged.

## Landing page for owners

From [landing.html](landing.html) the draft for owners opens directly. Alternatively, add `?view=landing` to the address of `index.html`. The mode uses the same page and keeps the four selectors and the shareable URL; **Torna al confronto identità** reopens the full playground.

The page sequences promise and house image, what stays with the owner in co-hosting, method, pilot project report, sample statement, cost structure, local presence, FAQ and contact. The form only shows a summary on the page: it does not send or save data. The photographs come from the pilot house archive; they are not used as management results. Logo, palette and fonts remain open choices.
