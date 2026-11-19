#!/usr/bin/env node
// Erzeugt aus einer oder mehreren Vakanz-Dateien (data/*.json) je ein LinkedIn-Bild (PNG).
// Aufruf:  node render.js data/beispiel.json [weitere.json ...] [--scale 2]
// Bei einem Layoutfehler wird KEIN fertiges Bild erzeugt, sondern eine Vorschau in output/_fehler/.

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');

const ROOT = __dirname;
const args = process.argv.slice(2);
const optWert = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const scale = Number(optWert('--scale') || 1);
// --out <map>: uitvoer naar een (tijdelijke) map buiten de skill, standaard ./output
const OUT = path.resolve(optWert('--out') || path.join(ROOT, 'output'));
const optIdx = new Set(['--scale', '--out'].flatMap((n) => { const i = args.indexOf(n); return i >= 0 ? [i, i + 1] : []; }));
const dateien = args.filter((a, i) => !optIdx.has(i));

if (!dateien.length) {
  console.error('Aufruf: node render.js data/<vakanz>.json [weitere ...] [--scale 2]');
  process.exit(2);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 1500 }, deviceScaleFactor: scale });
  page.on('pageerror', (e) => console.error('Seitenfehler:', e.message));
  let fehlerAnzahl = 0;

  for (const datei of dateien) {
    const d = JSON.parse(fs.readFileSync(datei, 'utf8'));
    const id = d.id || path.basename(datei, '.json');
    const fotoPfad = path.resolve(ROOT, d.foto.datei);
    if (!fs.existsSync(fotoPfad)) {
      console.error(`✗ ${id}: Foto nicht gefunden (${d.foto.datei})`);
      fehlerAnzahl++;
      continue;
    }
    const daten = { ...d, foto: { ...d.foto, src: pathToFileURL(fotoPfad).href } };

    await page.goto(pathToFileURL(path.join(ROOT, 'template', 'post.html')).href);
    const bericht = await page.evaluate((x) => window.renderPost(x), daten);

    const ziel = bericht.ok
      ? path.join(OUT, `${id}.png`)
      : path.join(OUT, '_fehler', `${id}.png`);
    fs.mkdirSync(path.dirname(ziel), { recursive: true });
    await page.locator('#canvas').screenshot({ path: ziel });

    if (bericht.ok) {
      fs.rmSync(path.join(OUT, '_fehler', `${id}.png`), { force: true });
      console.log(`✓ ${id}  →  ${ziel}`);
    } else {
      fehlerAnzahl++;
      console.log(`✗ ${id}  (Vorschau zur Fehlersuche: ${ziel})`);
      for (const f of bericht.fehler) console.log(`    Fehler:  ${f}`);
    }
    for (const h of bericht.hinweise || []) console.log(`    Hinweis: ${h}`);
    if (bericht.masse) console.log('    Masse:  ', JSON.stringify(bericht.masse));
  }

  await browser.close();
  process.exit(fehlerAnzahl ? 1 : 0);
})();
