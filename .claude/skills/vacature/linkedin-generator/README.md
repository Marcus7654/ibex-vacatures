# Ibex Medics – LinkedIn-afbeeldingen

Maakt per vacature automatisch een LinkedIn-afbeelding (1200 × 1500 px) in de Ibex-huisstijl.

## Gebruik

```bash
node render.js <vacature>.json --out <map>        # één afbeelding naar <map>
node render.js data/*.json --out /tmp/test        # alle voorbeelden
node render.js <vacature>.json --scale 2          # extra scherp (2400 × 3000 px)
```

Zonder `--out` komt het resultaat in `output/`. Is er een opmaakfout, dan komt er **geen** afbeelding. Je krijgt dan een foutmelding en een voorbeeld in `<map>/_fehler/`.

Het lettertype Poppins zit in `assets/fonts/`, dus `npm install` is niet nodig. Alleen Playwright met Chromium moet beschikbaar zijn.

## Invoer per vacature (`data/*.json`)

| Veld | Inhoud |
|---|---|
| `titel` | Functie, bijv. „Dipl. Pflegefachperson HF mit Fallführung“ |
| `zeile1` | Setting en kanton, bijv. „Spitex Somatik \| Kanton Zürich“ |
| `zeile2` | Pensum en start, bijv. „Pensum 80–100 % · Start per sofort“ |
| `vorteile` | Precies 3 voordelen: `icon`, `titel` (kort) en `text` (één korte zin) |
| `foto` | `datei` (pad) en `fokus` (uitsnede, bijv. „50% 30%“) |

Beschikbare icons: `uhr`, `medaille`, `wachstum`, `wechsel`, `klemmbrett`, `mond`, `team`, `herz`, `kalender`, `standort`.

Vaste teksten onderaan: „Jetzt bewerben!“ en „Link zum Inserat in den Kommentaren · Lebenslauf genügt“. Past de tweede zin niet op één regel, dan wordt hij automatisch bij het puntje over twee regels verdeeld.

## Vaste opmaakregels (automatisch afgedwongen en gecontroleerd)

- De titel is altijd de grootste tekst: minstens 1,25× groter dan alle andere tekst.
- De titel heeft maximaal 3 regels en geen los weesregeltje zoals „Dipl.“ alleen op een regel.
- Bij lange titels kiest de generator automatisch de beste variant: naast of onder „Zusammen. Für die Pflege.“.
- De icons zijn altijd 104 px groot. De drie voordelen hebben altijd dezelfde lettergrootte.
- Regel 1 en regel 2 krimpen samen mee en houden dezelfde verhouding.
- Geen tekst over de rand, het roze lint of de grijze golf, en geen overlap tussen blokken.
- Past iets echt niet, dan stopt de generator met een melding om de tekst in te korten.

## Foto's

Alle foto's staan in `assets/fotos/bibliothek/`. Per foto staat in `assets/fotos/bibliothek.json` waar hij wel en niet bij past.

## Testen

`data/tests/` bevat stresstests:
- een extreem lange titel en lange teksten;
- een heel korte titel;
- een vacature die bewust niet past en dus geweigerd moet worden.
