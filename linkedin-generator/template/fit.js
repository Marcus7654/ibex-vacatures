// Passt Schriftgrössen und Blockhöhen automatisch an die Inhalte an
// und prüft danach alle Layout-Regeln. Wird von render.js aufgerufen.

const CFG = {
  titelMax: 112, titelMin: 60, titelZeilenhoehe: 1.08,
  zeile1Max: 40, zeile2Max: 35, zeilenSkalaMin: 0.6, // beide Zeilen werden gemeinsam skaliert
  abstandKopfMitte: 48, mitteUnten: 1205, mitteMinHoehe: 600, mitteMaxHoehe: 780,
  vorteilTitel: 31, vorteilText: 28, vorteilSkalaMin: 0.75, vorteilAbstandMin: 26,
  vorteilTitelMaxZeilen: 2, vorteilTextMaxZeilen: 4,
  ctaMax: 68, ctaSubMax: 34, ctaSubEinzeiligMin: 27, ctaSubZweizeiligMax: 32, ctaSubMin: 24, ctaSubRandabstand: 24,
  verhaeltnis: 1.25,      // Titel ist mindestens 1,25× so gross wie jede andere Schrift
  iconGroesse: 104,
  minZeilenAnteil: 0.35, // kürzeste Titelzeile im Verhältnis zur längsten
  // Bewertung der Varianten: grösserer Titel ist besser, Abzüge für mehr Zeilen,
  // für Titel unter der Tagline und für stark verkleinerte Vorteile
  abzugProZeile: 4, abzugUnterTagline: 6, abzugVorteilSkala: 20,
};

const $ = (id) => document.getElementById(id);
const px = (el) => parseFloat(getComputedStyle(el).fontSize);

// Liefert die tatsächlich gerenderten Textzeilen eines Elements
function zeilen(el) {
  const r = document.createRange();
  r.selectNodeContents(el);
  const rects = [...r.getClientRects()].filter((x) => x.width > 0 && x.height > 0);
  const out = [];
  for (const rc of rects) {
    const l = out.find((z) => Math.abs(z.top - rc.top) < rc.height * 0.5);
    if (l) { l.left = Math.min(l.left, rc.left); l.right = Math.max(l.right, rc.right); l.bottom = Math.max(l.bottom, rc.bottom); }
    else out.push({ top: rc.top, bottom: rc.bottom, left: rc.left, right: rc.right });
  }
  return out.sort((a, b) => a.top - b.top);
}

const inForm = (id, x, y) => $(id).isPointInFill(new DOMPoint(x, y));

// Berührt eine Textzeile das rosa Band?
function trifftBand(lines) {
  return lines.some((l) => {
    const h = l.bottom - l.top;
    return [0.2, 0.5, 0.8].some((f) => inForm('band', l.right - 2, l.top + h * f));
  });
}

function titelVersuch(size, maxZeilen) {
  const t = $('titel');
  t.style.fontSize = size + 'px';
  const L = zeilen(t);
  if (!L.length || L.length > maxZeilen) return null;
  const tr = t.getBoundingClientRect();
  if (L[0].top - tr.top > size * 0.4) return null;            // erste Zeile unter die Tagline gerutscht
  if (t.scrollWidth > t.clientWidth + 1) return null;          // ein Wort ist breiter als der Platz
  const kopf = $('kopf').getBoundingClientRect();
  const a = $('aussparung').getBoundingClientRect();
  for (const l of L) {
    if (l.right > kopf.right + 1) return null;
    if (a.width > 0 && l.top < a.bottom && l.bottom > a.top && l.right > a.left + 1) return null;
  }
  if (trifftBand(L)) return null;
  // Keine verwaiste kurze Zeile (z. B. „Dipl.“ allein): jede Zeile mind. 35 % der längsten
  if (L.length > 1) {
    const maxB = Math.max(...L.map((l) => l.right - l.left));
    if (L.some((l) => (l.right - l.left) < CFG.minZeilenAnteil * maxB)) return null;
  }
  return L;
}

// Zeile 1 und 2 gemeinsam verkleinern, damit das Grössenverhältnis immer gleich bleibt
function zeilenEinpassen(titelPx) {
  const z1 = $('zeile1'), z2 = $('zeile2');
  const start = Math.min(1, titelPx / CFG.verhaeltnis / CFG.zeile1Max);
  for (let s = start; s >= CFG.zeilenSkalaMin - 1e-9; s -= 0.02) {
    z1.style.fontSize = (CFG.zeile1Max * s).toFixed(1) + 'px';
    z2.style.fontSize = (CFG.zeile2Max * s).toFixed(1) + 'px';
    const passt = [z1, z2].every((el) => el.scrollWidth <= el.clientWidth + 1 && !trifftBand(zeilen(el)));
    if (passt) return s;
  }
  return null;
}

// Text unter „Jetzt bewerben!“: einzeilig so gross wie möglich (mind. ctaSubEinzeiligMin),
// sonst zweizeilig am Punkt umbrechen. Muss ganz auf der grauen Welle liegen und Abstand zum Logo halten.
function ctaSubEinpassen(titelPx) {
  const el = $('cta-sub');
  const max = Math.min(CFG.ctaSubMax, Math.floor(titelPx / CFG.verhaeltnis));
  const passt = () => {
    const r = el.getBoundingClientRect();
    const m = CFG.ctaSubRandabstand; // Luft zum Rand der Welle
    const aufWelle = [[r.left + 2, r.top + 2], [r.right + m, r.top + 2], [r.right + m, r.bottom - 2], [r.left + 2, r.bottom - 2]]
      .every(([x, y]) => inForm('welle', x, y));
    return aufWelle && $('logo').getBoundingClientRect().left >= r.right + 20;
  };
  el.classList.remove('zweizeilig');
  el.style.top = '1396px';
  for (let s = max; s >= CFG.ctaSubEinzeiligMin; s--) { el.style.fontSize = s + 'px'; if (passt()) return true; }
  el.classList.add('zweizeilig');
  el.style.top = '1384px';
  for (let s = Math.min(CFG.ctaSubZweizeiligMax, max); s >= CFG.ctaSubMin; s--) { el.style.fontSize = s + 'px'; if (passt()) return true; }
  return false;
}

function vorteileGroesse(skala) {
  for (const h of document.querySelectorAll('.vorteil h3')) h.style.fontSize = (CFG.vorteilTitel * skala).toFixed(1) + 'px';
  for (const p of document.querySelectorAll('.vorteil p')) p.style.fontSize = (CFG.vorteilText * skala).toFixed(1) + 'px';
}

function vorteileEinpassen(H, titelPx) {
  const items = [...$('vorteile').children];
  const obergrenze = Math.min(1, titelPx / CFG.verhaeltnis / CFG.vorteilTitel);
  for (let s = obergrenze; s >= CFG.vorteilSkalaMin - 1e-9; s -= 0.025) {
    vorteileGroesse(s);
    const summe = items.reduce((a, it) => a + it.getBoundingClientRect().height, 0);
    if (summe + CFG.vorteilAbstandMin * (items.length + 1) > H) continue;
    const ueberlauf = items.some((it) => [...it.querySelectorAll('h3,p')].some((e) => e.scrollWidth > e.clientWidth + 1));
    if (!ueberlauf) return s;
  }
  return null;
}

function pruefen(meta) {
  const fehler = [], hinweise = [];
  const titel = $('titel');
  const titelPx = px(titel);
  const texte = [
    ['Tagline', $('tagline')], ['Titel', titel], ['Zeile 1', $('zeile1')], ['Zeile 2', $('zeile2')],
    ['Jetzt bewerben', $('cta')], ['Bewerben-Text', $('cta-sub')],
    ...[...document.querySelectorAll('.vorteil')].flatMap((v, i) => [
      [`Vorteil ${i + 1} Titel`, v.querySelector('h3')], [`Vorteil ${i + 1} Text`, v.querySelector('p')]]),
  ];

  if (!document.fonts.check('600 50px Poppins') || !document.fonts.check('400 30px Poppins')) fehler.push('Schrift Poppins wurde nicht geladen.');
  const img = $('foto-img');
  if (!img.complete || img.naturalWidth === 0) fehler.push('Foto konnte nicht geladen werden.');
  const logo = $('logo');
  if (!logo.complete || logo.naturalWidth === 0) fehler.push('Logo konnte nicht geladen werden.');

  for (const [name, el] of texte) {
    if (el.scrollWidth > el.clientWidth + 1) fehler.push(`Text läuft über: ${name}.`);
    const r = el.getBoundingClientRect();
    if (r.left < 0 || r.top < 0 || r.right > 1200 || r.bottom > 1500) fehler.push(`Ausserhalb des Bildes: ${name}.`);
    if (el !== titel && px(el) * CFG.verhaeltnis > titelPx + 0.01) fehler.push(`Titel ist nicht deutlich die grösste Schrift (${name}: ${px(el)}px, Titel: ${titelPx}px).`);
  }

  for (const ic of document.querySelectorAll('.icon')) {
    const r = ic.getBoundingClientRect();
    if (Math.round(r.width) !== CFG.iconGroesse || Math.round(r.height) !== CFG.iconGroesse) fehler.push('Icons haben nicht alle dieselbe Grösse.');
  }

  const kopfUnten = $('strich').getBoundingClientRect().bottom;
  const mitte = $('mitte').getBoundingClientRect();
  if (kopfUnten > mitte.top - 30) fehler.push('Kopfbereich und Mittelteil überlappen.');
  if (mitte.bottom > CFG.mitteUnten + 1) fehler.push('Mittelteil ragt in den Fussbereich.');
  for (const v of document.querySelectorAll('.vorteil')) {
    const r = v.getBoundingClientRect();
    if (r.top < mitte.top - 1 || r.bottom > mitte.bottom + 1) fehler.push('Ein Vorteil ragt aus dem Mittelteil.');
    for (const l of zeilen(v.querySelector('p')).concat(zeilen(v.querySelector('h3'))))
      if (inForm('welle', l.right - 2, l.bottom - 2) || inForm('welle', l.left + 2, l.bottom - 2)) fehler.push('Vorteil-Text berührt die graue Welle.');
  }
  for (const [x, y] of [[mitte.left + 1, mitte.bottom - 1], [mitte.left + 492 - 1, mitte.bottom - 1]])
    if (inForm('welle', x, y)) fehler.push('Foto berührt die graue Welle.');
  if (trifftBand(zeilen(titel))) fehler.push('Titel berührt das rosa Band.');
  for (const id of ['cta', 'cta-sub']) {
    const r = $(id).getBoundingClientRect();
    if (![[r.left + 2, r.top + 2], [r.right - 2, r.top + 2], [r.right - 2, r.bottom - 2], [r.left + 2, r.bottom - 2]].every(([x, y]) => inForm('welle', x, y)))
      fehler.push(`„${id === 'cta' ? 'Jetzt bewerben!' : 'Bewerben-Text'}“ liegt nicht vollständig auf der grauen Welle.`);
  }
  if ($('logo').getBoundingClientRect().left < $('cta-sub').getBoundingClientRect().right + 20) fehler.push('Bewerben-Text kommt dem Logo zu nahe.');

  const tz = zeilen(titel);
  document.querySelectorAll('.vorteil').forEach((v, i) => {
    const hz = zeilen(v.querySelector('h3')).length, pz = zeilen(v.querySelector('p')).length;
    if (hz > CFG.vorteilTitelMaxZeilen) hinweise.push(`Vorteil ${i + 1}: Titel hat ${hz} Zeilen – kürzer formulieren.`);
    if (pz > CFG.vorteilTextMaxZeilen) hinweise.push(`Vorteil ${i + 1}: Text hat ${pz} Zeilen – kürzer formulieren.`);
  });
  if (meta.zeilenSkala < 0.85) hinweise.push('Zeile 1/2 mussten stark verkleinert werden – kürzere Texte sehen besser aus.');
  if (meta.vorteilSkala < 0.9) hinweise.push('Vorteil-Texte mussten stark verkleinert werden – kürzere Texte sehen besser aus.');

  return {
    ok: fehler.length === 0, fehler: [...new Set(fehler)], hinweise,
    masse: {
      titelPx, titelZeilen: tz.length, titelModus: meta.modus,
      zeile1Px: px($('zeile1')), zeile2Px: px($('zeile2')),
      vorteilSkala: +meta.vorteilSkala.toFixed(3), vorteilTitelPx: px(document.querySelector('.vorteil h3')),
      vorteilTextPx: px(document.querySelector('.vorteil p')), ctaPx: px($('cta')),
      fotoHoehe: Math.round(mitte.height),
    },
  };
}

window.renderPost = async function (d) {
  $('titel').textContent = d.titel;
  $('zeile1').textContent = d.zeile1;
  $('zeile2').textContent = d.zeile2;

  const fehlendeIcons = d.vorteile.filter((b) => !window.ICONS[b.icon]).map((b) => b.icon);
  if (fehlendeIcons.length) return { ok: false, fehler: [`Unbekanntes Icon: ${fehlendeIcons.join(', ')}. Verfügbar: ${Object.keys(window.ICONS).join(', ')}`], hinweise: [] };
  if (d.vorteile.length !== 3) return { ok: false, fehler: ['Es braucht genau 3 Vorteile.'], hinweise: [] };

  const v = $('vorteile');
  v.innerHTML = '';
  for (const b of d.vorteile) {
    const el = document.createElement('div');
    el.className = 'vorteil';
    el.innerHTML = `<div class="icon"><svg viewBox="0 0 64 64">${window.ICONS[b.icon]}</svg></div>
      <div class="vorteil-text"><h3></h3><p></p></div>`;
    el.querySelector('h3').textContent = b.titel;
    el.querySelector('p').textContent = b.text;
    v.appendChild(el);
  }

  const img = $('foto-img');
  img.style.objectPosition = d.foto.fokus || '50% 30%';
  img.src = d.foto.src;

  await Promise.all(['400', '500', '600'].map((w) => document.fonts.load(`${w} 40px Poppins`, 'Ääü')));
  await document.fonts.ready;
  await Promise.all([img.decode().catch(() => {}), $('logo').decode().catch(() => {})]);

  // Eine Variante (Modus + Titelgrösse) vollständig anwenden. Gibt null zurück, wenn sie nicht passt.
  function anwenden(modus, size) {
    $('kopf').classList.toggle('unter-tagline', modus === 'unter-tagline');
    const L = titelVersuch(size, 3);
    if (!L) return null;
    const zs = zeilenEinpassen(size);
    if (zs === null) return { zeileFehler: true };
    const kopfUnten = $('strich').getBoundingClientRect().bottom;
    let oben = kopfUnten + CFG.abstandKopfMitte;
    let H = CFG.mitteUnten - oben;
    if (H < CFG.mitteMinHoehe) return null;
    if (H > CFG.mitteMaxHoehe) { oben += (H - CFG.mitteMaxHoehe) / 2; H = CFG.mitteMaxHoehe; }
    const mitte = $('mitte');
    mitte.style.top = oben + 'px';
    mitte.style.height = H + 'px';
    const skala = vorteileEinpassen(H, size);
    if (skala === null) return null;
    $('cta').style.fontSize = Math.min(CFG.ctaMax, Math.floor(size / CFG.verhaeltnis)) + 'px';
    if (!ctaSubEinpassen(size)) return null;
    $('tagline').style.fontSize = Math.min(30, Math.floor(size / CFG.verhaeltnis)) + 'px';
    const punkte = size - CFG.abzugProZeile * (L.length - 1)
      - (modus === 'unter-tagline' ? CFG.abzugUnterTagline : 0)
      - CFG.abzugVorteilSkala * (1 - skala);
    return { modus, size, skala, zeilenSkala: zs, punkte };
  }

  // Alle Varianten bewerten und die beste wählen
  let beste = null, zeileFehler = null;
  for (const modus of ['neben-tagline', 'unter-tagline']) {
    for (let size = CFG.titelMax; size >= CFG.titelMin; size -= 2) {
      const v = anwenden(modus, size);
      if (!v) continue;
      if (v.zeileFehler) { zeileFehler = v.zeileFehler; continue; }
      if (!beste || v.punkte > beste.punkte) beste = v;
    }
  }
  if (beste) {
    anwenden(beste.modus, beste.size);
    return pruefen({ modus: beste.modus, vorteilSkala: beste.skala, zeilenSkala: beste.zeilenSkala });
  }
  if (zeileFehler) {
    return { ok: false, fehler: ['Zeile 1 oder Zeile 2 ist zu lang und passt auch stark verkleinert nicht auf eine Zeile. Bitte kürzen.'], hinweise: [] };
  }
  return { ok: false, fehler: ['Kein passendes Layout gefunden: Titel und/oder Vorteile sind zu lang. Bitte kürzen.'], hinweise: [] };
};
