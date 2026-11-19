---
name: vacature
description: Ibex Medics vacature-workflow. Gebruik dit ZODRA de gebruiker een screenshot of tekst van een vacature uit het vacaturesysteem plakt (velden zoals Kunde, Vakanz, Datum ab, Einsatzbereich, Qualifikation, Temp/Perm, Pensum), of /vacature typt. Maakt de website-vacature en plaatst die op ibexmedics.ch, maakt de LinkedIn-afbeelding en -posttekst en zet de post klaar in Chrome op de bedrijfspagina (Marc klikt zelf op Posten).
---

# Vacature-workflow Ibex Medics

Voer alle stappen achter elkaar uit, zonder tussendoor te vragen, behalve waar dat hieronder staat. Antwoord Marc in het Nederlands. Alle teksten voor publicatie zijn Duits (Zwitserland).

## Omgeving en opslag (belangrijk)
- Deze skill draait in **Cowork** met de Chrome-extensie **Claude in Chrome**. Marc is in zijn eigen Chrome al ingelogd bij WordPress en LinkedIn: gebruik die sessies, vraag nooit om wachtwoorden en vul er nooit zelf een in.
- **Niets opslaan in de gekoppelde map van Marc.** Teksten houd je alleen in het gesprek en plak je direct in WordPress/LinkedIn. Werkbestanden (vacature-JSON, PNG) komen in een **tijdelijke map buiten Marcs map**: `WERK=$(mktemp -d)`. Enige uitzondering staat in stap 6, en dan meteen weer verwijderen.
- `SKILL_DIR` = de map waarin dit bestand staat. Alle paden hieronder zijn relatief aan `SKILL_DIR`. De skillmap zelf niet wijzigen.

## Bestanden in de skill
- Website-template: `templates/vacature-template.md` (regels en mapping in de HTML-commentaar bovenaan)
- LinkedIn-posttemplate: `templates/linkedin-post-template.md`
- Goedgekeurde voorbeelden: `voorbeelden/`
- Afbeeldingsgenerator: `linkedin-generator/` (`render.js`; lettertype en logo zitten erin)
- Fotobank: `linkedin-generator/assets/fotos/bibliothek.json` + map `bibliothek/`

## Stap 1. Screenshot uitlezen
Lees: Kunde, Vakanz, Datum ab/bis, Kontakt, Einsatzbereich, Qualifikation, Temp/Perm, Pensum von/bis, Bemerkung.
- **Kunde, Kontakt en Bemerkung NOOIT publiceren.** Kunde gebruik je alleen om het type instelling (Spitex, Klinik …) en het **kanton** te bepalen (plaats → kanton, bijv. Schlieren → Zürich).
- Datum ab ≤ vandaag → „per sofort“.
- Try and Hire → „Temporär oder Festanstellung“. Het woord „Try & Hire“ mag nooit in een tekst staan.
- Ontbreekt een verplicht veld of is iets onleesbaar → kort navragen, niets verzinnen.

## Stap 2. Website-vacature schrijven (niet opslaan)
Volg `templates/vacature-template.md` exact; vergelijk met `voorbeelden/vacature-*.md`. Kernregels:
- titel met „|“; „du“; „ss“ (nooit „ß“); vaste teksten „Über Ibex Medics“ en „Interessiert?“ letterlijk;
- „Das bieten wir dir“ zonder streepjes, formaat „**Vorteil.** Zin.“;
- opleidingsregel met „…oder ein gleichwertiger ausländischer Abschluss mit mind. einem positiven Pre-Check / SRK-Anerkennung“;
- temp of Try and Hire → ervaring in het Einsatzbereich als eis; alleen fest → „idealerweise“;
- „Aufgaben“ en „Das bieten wir dir“ algemeen houden.
Controleer de tekst zelf: geen klantnaam, geen plaatsnaam van de klant, geen contactpersoon, geen „Try“, geen „ß“.

## Stap 3. Plaatsen op de website (direct publiceren, zonder controle vooraf)
Met **Claude in Chrome**: open `https://www.ibexmedics.ch/wp-admin`. Niet ingelogd → vraag Marc om in dat tabblad in te loggen en ga daarna verder.
1. Menu links **Job Openings** → **Add New Job**.
2. **Job Title**: de titel. Daaronder de vacaturetekst (zonder titelregel en zonder de kenmerkregels Jobkategorie/Anstellungsart/Arbeitsplatz/Pensum; die gaan via de specificaties). Opmaak (koppen, opsommingen, vet) overnemen.
3. Helemaal naar beneden, meta box **Job specifications**:
   - Jobkategorie: Pflege / FaGe / Arzt/Arztin / Physiotherapie / Hebamme
   - Anstellungsart: meerdere mogelijk (Try and Hire → Temporär + Festanstellung; eventueel Teilzeit/Vollzeit)
   - Arbeitsplatz: het **kanton**
   - Pensum: alle opties binnen het bereik (bijv. 50–100 % → 60 %, 80 %, 100 %)
4. Rechtsboven **Veröffentlichen**.
5. Open de publieke vacaturepagina en controleer titel, tekst en specificaties. Onthoud de URL.

## Stap 4. LinkedIn-afbeelding (in de tijdelijke map)
1. **Foto kiezen** uit `bibliothek.json`. Interpreteer de context: de foto moet echt bij de functie passen (`passt_zu`/`passt_nicht_zu`), bijv. Röntgen-/CT-foto's alleen voor radiologie, een arts in een witte jas niet voor de verpleging. Bekijk de foto zelf. **Herhaling vermijden:** bekijk in Chrome de laatste ±8 posts op de LinkedIn-bedrijfspagina van Ibex Medics en kies geen foto die daar al in staat, tenzij er geen andere passende is. Past er geen enkele foto → vraag Marc om een passende foto.
2. Schrijf `$WERK/<slug>.json` (voorbeeld: `linkedin-generator/data/*.json`): titel (functie), zeile1 „Setting | Kanton X“, zeile2 „Pensum X–Y % · Start per sofort“, 3 korte voordelen met passend icon, `foto.datei` als **absoluut pad** naar de foto in de skill + fokus.
3. Render: `node linkedin-generator/render.js $WERK/<slug>.json --out $WERK`. Bij ✗ of hints: teksten inkorten en opnieuw renderen. Bekijk de PNG zelf.
   - Ontbreekt Playwright: `npm install --prefix "$WERK/pw" playwright && npx --prefix "$WERK/pw" playwright install chromium`, daarna renderen met `NODE_PATH="$WERK/pw/node_modules"`. Lukt dat niet → meld het Marc en ga verder met stap 5.

## Stap 5. LinkedIn-posttekst (niet opslaan)
Volg `templates/linkedin-post-template.md` en `voorbeelden/linkedin-post-*.txt`: max ~900 tekens, gangbare emoji's, kenmerken/USP's **onder elkaar**, **geen streepjes**, „Ibex Medics“ (niet IBEX), geen link/e-mail, afsluiting „👉 Link zum Inserat in den Kommentaren · Lebenslauf genügt“, max. 5 hashtags met `#IbexMedics`. Wissel de opening af: kijk naar de laatste post op de bedrijfspagina en kies de andere variant (hoofdletters ↔ vraag).

## Stap 6. LinkedIn-post klaarzetten in Chrome (NIET zelf plaatsen)
1. Open met **Claude in Chrome** de beheerpagina van de **bedrijfspagina Ibex Medics** (LinkedIn → Ich/Me → Seiten verwalten/Manage pages → Ibex Medics AG). **Nooit** vanaf het persoonlijke profiel van Marc ter Steeg: controleer vóór het schrijven dat bovenaan in het postvenster „Ibex Medics“ als afzender staat.
2. „Beitrag erstellen / Start a post“ → posttekst exact plakken (regelafbrekingen behouden).
3. Afbeelding toevoegen: eerst rechtstreeks vanuit `$WERK/<slug>.png` proberen. Kan Chrome daar niet bij → kopieer de PNG tijdelijk naar Marcs gekoppelde map, upload hem en **verwijder het bestand meteen** zodra de afbeelding zichtbaar in de post staat.
4. **Stop vóór „Posten“** en laat het tabblad open. Marc controleert en klikt zelf op Posten.

## Stap 7. Opruimen en terugmelden (kort)
- `rm -rf "$WERK"` en controleer dat er niets van deze skill in Marcs gekoppelde map staat.
- Meld: link naar de vacature op de website; dat de LinkedIn-post klaarstaat in het open tabblad (of wat niet lukte); de reactietekst voor onder de post in een codeblok: „Hier geht's zum Inserat 👉 <URL>“.
