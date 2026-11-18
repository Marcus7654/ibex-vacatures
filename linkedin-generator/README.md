# Ibex Medics – LinkedIn-afbeeldingen

Maakt per vacature automatisch een LinkedIn-afbeelding (1200 × 1500 px) in de Ibex-huisstijl.

## Gebruik

```bash
node render.js data/<vacature>.json            # één afbeelding
node render.js data/*.json                      # alle vacatures
node render.js data/<vacature>.json --scale 2   # extra scherp (2400 × 3000 px)
```

Resultaat: `output/<vacature>.png`. Is er een opmaakfout, dan komt er **geen** afbeelding in `output/`. Je krijgt dan een foutmelding en een voorbeeld in `output/_fehler/`.

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

## Foto's (Pexels)

```bash
NODE_USE_ENV_PROXY=1 node fotos.js suche "home care nurse visit" --id <vacature>
NODE_USE_ENV_PROXY=1 node fotos.js waehle <pexels-id> --id <vacature> --fokus "50% 30%"
```

`suche` downloadt kandidaten naar `assets/fotos/kandidaten/<vacature>/`. `waehle` zet de gekozen foto in de vacature en houdt in `assets/fotos/verwendet.json` bij welke foto's al gebruikt zijn, zodat ze niet terugkomen.

Hiervoor moet `PEXELS_API_KEY` ingesteld zijn en moeten `api.pexels.com` en `images.pexels.com` bereikbaar zijn.

## Testen

`data/tests/` bevat stresstests:
- een extreem lange titel en lange teksten;
- een heel korte titel;
- een vacature die bewust niet past en dus geweigerd moet worden.
