#!/usr/bin/env node
// Foto-Suche über die Pexels-API (echte Fotos, kostenlos für kommerzielle Nutzung).
//
// 1) Kandidaten suchen und herunterladen:
//      node fotos.js suche "<Suchbegriff auf Englisch>" --id <vakanz-id> [--anzahl 6]
//    → speichert Kandidaten in assets/fotos/kandidaten/<vakanz-id>/
//
// 2) Ein Foto auswählen (wird als verwendet markiert, damit es nicht wiederholt wird):
//      node fotos.js waehle <pexels-id> --id <vakanz-id>
//    → kopiert das Foto nach assets/fotos/<vakanz-id>.jpg und trägt es in data/<vakanz-id>.json ein
//
// Voraussetzungen: Umgebungsvariable PEXELS_API_KEY und Netzwerkzugriff auf
// api.pexels.com und images.pexels.com. In der Cloud-Sitzung mit NODE_USE_ENV_PROXY=1 starten.

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const VERWENDET = path.join(ROOT, 'assets', 'fotos', 'verwendet.json');

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : fallback;
}
const ladeVerwendet = () => (fs.existsSync(VERWENDET) ? JSON.parse(fs.readFileSync(VERWENDET, 'utf8')) : []);

async function suche(begriff, id, anzahl) {
  const key = process.env.PEXELS_API_KEY;
  if (!key) throw new Error('PEXELS_API_KEY ist nicht gesetzt.');
  const verwendet = new Set(ladeVerwendet().map((v) => String(v.pexelsId)));
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(begriff)}&orientation=portrait&size=large&per_page=40`;
  const res = await fetch(url, { headers: { Authorization: key } });
  if (!res.ok) throw new Error(`Pexels antwortet mit ${res.status}: ${await res.text()}`);
  const { photos = [] } = await res.json();
  const frisch = photos.filter((p) => !verwendet.has(String(p.id))).slice(0, anzahl);
  if (!frisch.length) throw new Error('Keine neuen Fotos gefunden – anderen Suchbegriff versuchen.');

  const ordner = path.join(ROOT, 'assets', 'fotos', 'kandidaten', id);
  fs.mkdirSync(ordner, { recursive: true });
  const liste = [];
  for (const p of frisch) {
    const bild = await fetch(p.src.large2x);
    if (!bild.ok) continue;
    const datei = path.join(ordner, `${p.id}.jpg`);
    fs.writeFileSync(datei, Buffer.from(await bild.arrayBuffer()));
    liste.push({ pexelsId: p.id, datei: path.relative(ROOT, datei), fotograf: p.photographer, quelle: p.url, beschreibung: p.alt });
  }
  fs.writeFileSync(path.join(ordner, 'kandidaten.json'), JSON.stringify(liste, null, 2));
  for (const k of liste) console.log(`${k.pexelsId}  ${k.datei}  (${k.fotograf}) ${k.beschreibung || ''}`);
}

function waehle(pexelsId, id, fokus) {
  const ordner = path.join(ROOT, 'assets', 'fotos', 'kandidaten', id);
  const liste = JSON.parse(fs.readFileSync(path.join(ordner, 'kandidaten.json'), 'utf8'));
  const k = liste.find((x) => String(x.pexelsId) === String(pexelsId));
  if (!k) throw new Error(`Foto ${pexelsId} ist kein Kandidat für ${id}.`);
  const ziel = path.join('assets', 'fotos', `${id}.jpg`);
  fs.copyFileSync(path.join(ROOT, k.datei), path.join(ROOT, ziel));

  const verwendet = ladeVerwendet();
  verwendet.push({ ...k, vakanz: id, datum: new Date().toISOString().slice(0, 10) });
  fs.writeFileSync(VERWENDET, JSON.stringify(verwendet, null, 2));

  const dataDatei = path.join(ROOT, 'data', `${id}.json`);
  if (fs.existsSync(dataDatei)) {
    const d = JSON.parse(fs.readFileSync(dataDatei, 'utf8'));
    d.foto = { datei: ziel, fokus: fokus || d.foto?.fokus || '50% 30%', fotograf: k.fotograf, quelle: k.quelle };
    fs.writeFileSync(dataDatei, JSON.stringify(d, null, 2) + '\n');
  }
  console.log(`✓ ${ziel} (Foto: ${k.fotograf} auf Pexels)`);
}

(async () => {
  const [befehl, wert] = process.argv.slice(2);
  const id = arg('--id');
  try {
    if (befehl === 'suche' && wert && id) await suche(wert, id, Number(arg('--anzahl', 6)));
    else if (befehl === 'waehle' && wert && id) waehle(wert, id, arg('--fokus'));
    else {
      console.error('Aufruf:\n  node fotos.js suche "<Suchbegriff>" --id <vakanz-id> [--anzahl 6]\n  node fotos.js waehle <pexels-id> --id <vakanz-id> [--fokus "50% 30%"]');
      process.exit(2);
    }
  } catch (e) {
    console.error('Fehler:', e.message);
    process.exit(1);
  }
})();
