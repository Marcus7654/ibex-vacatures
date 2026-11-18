---
name: vacature
description: Ibex Medics vacature-workflow. Gebruik dit ZODRA de gebruiker een screenshot of tekst van een vacature uit het vacaturesysteem plakt (velden zoals Kunde, Vakanz, Datum ab, Einsatzbereich, Qualifikation, Temp/Perm, Pensum), of /vacature typt. Maakt de website-vacature, plaatst die op ibexmedics.ch, maakt de LinkedIn-afbeelding en -posttekst en zet de post als concept klaar.
---

# Vacature-workflow Ibex Medics

Voer alle stappen achter elkaar uit, zonder tussendoor te vragen, behalve waar dat hieronder staat. Antwoord de gebruiker in het Nederlands. Alle teksten voor publicatie zijn Duits (Zwitserland).

## Bestanden
Alle paden zijn relatief aan de root van deze repository. Eenmalig per sessie: `cd linkedin-generator && npm install` (installeert het lettertype Poppins).

- Website-template: `templates/vacature-template.md` (regels en mapping in de HTML-commentaar bovenaan)
- Voorbeelden: `voorbeelden/vacature-*.md`, `voorbeelden/linkedin-post-*.txt`
- LinkedIn-posttemplate: `templates/linkedin-post-template.md`
- Afbeeldingsgenerator: `linkedin-generator/` (zie README.md)
- Fotobank: `linkedin-generator/assets/fotos/bibliothek.json` + `verwendet.json`

## Stap 1. Screenshot uitlezen
Lees: Kunde, Vakanz, Datum ab/bis, Kontakt, Einsatzbereich, Qualifikation, Temp/Perm, Pensum von/bis, Bemerkung.
- **Kunde, Kontakt en Bemerkung NOOIT publiceren.** Kunde gebruik je alleen om het type instelling (Spitex, Klinik …) en het **kanton** te bepalen (plaats → kanton opzoeken, bijv. Schlieren → Zürich).
- Datum ab ≤ vandaag → „per sofort“.
- Try and Hire → „Temporär oder Festanstellung“. Het woord „Try & Hire“ mag nooit in een tekst staan.
- Ontbreekt een verplicht veld of is iets onleesbaar → kort navragen, niets verzinnen.

## Stap 2. Website-vacature maken
Volg `vacature-template.md` exact (sectievolgorde, vaste teksten „Über Ibex Medics“ en „Interessiert?“ letterlijk overnemen). Kernregels:
- titel met „|“; „du“; „ss“; geen streepjes in „Das bieten wir dir“, formaat „**Vorteil.** Zin.“;
- opleidingsregel met „…oder ein gleichwertiger ausländischer Abschluss mit mind. einem positiven Pre-Check / SRK-Anerkennung“;
- temp of Try and Hire → ervaring in het Einsatzbereich als eis; alleen fest → „idealerweise“;
- „Aufgaben“ en „Das bieten wir dir“ algemeen houden; zoek indien nodig kort op wat typische taken van deze functie zijn.
Sla op als `voorbeelden/vacature-<slug>.md`.
Controle: `grep -iE "try|<klantnaam>|<plaats van klant>|<contactpersoon>|ß"` levert niets op.

## Stap 3. Plaatsen op de website (zonder controle vooraf, direct publiceren)
Login: `https://www.ibexmedics.ch/wp-admin`, inloggegevens uit de omgevingsvariabelen `IBEX_WP_USER` en `IBEX_WP_PASSWORD` (nooit in chat of bestanden zetten). Gebruik Playwright (Chromium).
1. Menu links **Job Openings** → **Add New Job**.
2. **Job Title**: de titel. Daaronder de vacaturetekst (zonder de titelregel en zonder de kenmerkregels Jobkategorie/Anstellungsart/Arbeitsplatz/Pensum, die gaan via de specificaties).
3. Helemaal naar beneden: meta box **Job specifications**:
   - Jobkategorie: Pflege / FaGe / Arzt/Arztin / Physiotherapie / Hebamme
   - Anstellungsart: meerdere mogelijk (Try and Hire → Temporär + Festanstellung; eventueel Teilzeit/Vollzeit)
   - Arbeitsplatz: het **kanton**
   - Pensum: alle opties binnen het bereik (bijv. 50–100 % → 60 %, 80 %, 100 %)
4. Rechtsboven **Veröffentlichen**.
5. Noteer de publieke URL van de vacature en open die ter controle (titel, tekst, specificaties zichtbaar).

## Stap 4. LinkedIn-afbeelding
1. Kies een foto uit `bibliothek.json`. **Interpreteer de context**: de foto moet echt bij de functie passen (`passt_zu`/`passt_nicht_zu`), bijv. Röntgen-/CT-foto's alleen voor radiologie, een arts in een witte jas niet voor de verpleging. Bekijk de foto zelf (Read). Kies bij voorkeur een foto die nog niet of al lang niet meer in `verwendet.json` staat. Past er geen enkele foto → vraag de gebruiker om een passende foto, gebruik geen foto die niet past.
2. Maak `linkedin-generator/data/<slug>.json`: titel (functie), zeile1 „Setting | Kanton X“, zeile2 „Pensum X–Y % · Start per sofort“, 3 korte voordelen met passend icon, foto + fokus.
3. `cd linkedin-generator && node render.js data/<slug>.json`. Bij ✗ of hints: teksten inkorten en opnieuw renderen. Bekijk de PNG zelf.
4. Voeg de foto met vacature en datum toe aan `verwendet.json`.

## Stap 5. LinkedIn-posttekst
Volg `linkedin-post-template.md`: max ~900 tekens, gangbare emoji's, kenmerken/USP's **onder elkaar**, **geen streepjes**, „Ibex Medics“ (niet IBEX), geen link/e-mail, afsluiting „👉 Link zum Inserat in den Kommentaren · Lebenslauf genügt“, precies ≤ 5 hashtags met `#IbexMedics`. Wissel de opening af: kijk naar de laatst gemaakte post in `voorbeelden/` en kies de andere variant (hoofdletters ↔ vraag). Sla op als `voorbeelden/linkedin-post-<slug>.txt`.

## Stap 6. LinkedIn-concept
- Altijd op de **bedrijfspagina van Ibex Medics**, nooit op het persoonlijke account van Marc.
- Plaats als **concept** (niet publiceren) met afbeelding en posttekst. De vacature-URL van stap 3 is bedoeld voor de eerste reactie, die plaatst Marc na publicatie (of ik, als hij dat vraagt).
- Lukt opslaan als concept niet → niet publiceren, maar afbeelding, tekst en URL opleveren en melden.

## Stap 7. Terugmelden (kort)
- Link naar de vacature op de website
- Status van het LinkedIn-concept
- Afbeelding (SendUserFile) en posttekst (in een codeblok, klaar om te kopiëren)
- De reactietekst met de link: „Hier geht's zum Inserat 👉 <URL>“
