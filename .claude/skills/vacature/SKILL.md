---
name: vacature
description: Ibex Medics vacature-workflow. Gebruik dit ZODRA de gebruiker een screenshot of tekst van een vacature uit het vacaturesysteem plakt (velden zoals Kunde, Vakanz, Datum ab, Einsatzbereich, Qualifikation, Temp/Perm, Pensum), of /vacature typt. Maakt de website-vacature, plaatst die op ibexmedics.ch, maakt de LinkedIn-afbeelding en -posttekst en zet de post klaar in Chrome op de bedrijfspagina (Marc klikt zelf op Posten).
---

# Vacature-workflow Ibex Medics

Voer alle stappen achter elkaar uit, zonder tussendoor te vragen, behalve waar dat hieronder staat. Antwoord de gebruiker in het Nederlands. Alle teksten voor publicatie zijn Duits (Zwitserland).

## Omgeving
Deze skill draait lokaal in **Cowork** op Marcs computer, met de gekoppelde map „Ibex Vacatures“ (inhoud van de GitHub-repository `Marcus7654/ibex-vacatures`) en de Chrome-extensie **Claude in Chrome**. Marc is in zijn eigen Chrome al ingelogd bij WordPress en LinkedIn: gebruik die sessies, vraag nooit om wachtwoorden en sla geen inloggegevens op.

## Bestanden
Alle paden zijn relatief aan de gekoppelde map. Eenmalig: `cd linkedin-generator && npm install` (installeert het lettertype Poppins).

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
Gebruik **Claude in Chrome** en open `https://www.ibexmedics.ch/wp-admin` (Marc is daar al ingelogd). Is hij niet ingelogd → vraag Marc om in te loggen in dat tabblad en ga daarna verder; vul nooit zelf een wachtwoord in.
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
   Werkt `render.js` niet (bijv. Playwright of Chromium ontbreekt): eenmalig `npm install playwright && npx playwright install chromium` proberen. Lukt ook dat niet → meld het Marc en ga verder met stap 5; de afbeelding kan dan in een cloudsessie met dezelfde repository gemaakt worden.
4. Voeg de foto met vacature en datum toe aan `verwendet.json`.

## Stap 5. LinkedIn-posttekst
Volg `linkedin-post-template.md`: max ~900 tekens, gangbare emoji's, kenmerken/USP's **onder elkaar**, **geen streepjes**, „Ibex Medics“ (niet IBEX), geen link/e-mail, afsluiting „👉 Link zum Inserat in den Kommentaren · Lebenslauf genügt“, precies ≤ 5 hashtags met `#IbexMedics`. Wissel de opening af: kijk naar de laatst gemaakte post in `voorbeelden/` en kies de andere variant (hoofdletters ↔ vraag). Sla op als `voorbeelden/linkedin-post-<slug>.txt`.

## Stap 6. LinkedIn-post klaarzetten in Chrome (niet zelf plaatsen)
1. Open met **Claude in Chrome** de beheerpagina van de **bedrijfspagina Ibex Medics** (LinkedIn → Ich/Me → Seiten verwalten/Manage pages → Ibex Medics AG). **Nooit** posten vanaf het persoonlijke profiel van Marc ter Steeg: controleer vóór het schrijven dat bovenaan in het postvenster „Ibex Medics“ als afzender staat.
2. Klik „Beitrag erstellen / Start a post“, plak de posttekst uit stap 5 exact (regelafbrekingen behouden) en voeg de afbeelding uit `linkedin-generator/output/<slug>.png` toe.
3. **Stop vóór „Posten“** en laat het tabblad open. Marc controleert en klikt zelf op Posten.
4. Na het plaatsen hoort de vacature-URL in de eerste reactie; lever die reactietekst aan (stap 7).

## Stap 7. Terugmelden (kort)
- Link naar de vacature op de website
- Dat de LinkedIn-post klaarstaat in het open tabblad (of wat niet lukte)
- Afbeelding (SendUserFile) en posttekst (in een codeblok, klaar om te kopiëren)
- De reactietekst met de link: „Hier geht's zum Inserat 👉 <URL>“
