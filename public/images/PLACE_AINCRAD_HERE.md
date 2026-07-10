Put the background image here as `Aincrad.png` (this exact filename, in this folder).

It is loaded at runtime via `THREE.TextureLoader` from `/images/Aincrad.png`, so the
site works fine without it (a gradient placeholder is shown instead) and picks up
the real image automatically once it's added — no code changes needed.

Optional upgrade: if you later have hand-separated transparent PNG layers, add
`Aincrad_sky.png`, `Aincrad_castle.png`, `Aincrad_foreground.png` here as well and
wire them into `src/components/background/useAincradTexture.ts` for a cleaner
parallax (see the comment in that file).
