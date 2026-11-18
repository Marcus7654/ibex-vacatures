<!--
==========================================================================
IBEX MEDICS – STELLENINSERAT-TEMPLATE (Website)            Version 0.3 (Entwurf)
==========================================================================
Grundregeln (gelten für jede Vakanz):
- Sprache: Deutsch (Schweiz) → immer "ss", nie "ß".
- Ansprache: durchgehend "du" (nie mischen mit "Sie"/"Ihr").
- Geschlechtergerecht: neutrale Form ("Pflegefachperson", "Fachperson
  Gesundheit", "Patientinnen und Patienten").
- Name der Einrichtung (Kunde) NIE nennen → nur Typ umschreiben
  ("eine Spitex-Organisation", "eine Klinik").
- Region = KANTON, nie der Ort der Einrichtung (Schlieren → Zürich).
- Interne Felder "Kontakt" und "Bemerkung" NIE publizieren.
- Nichts erfinden: fehlende Angaben → "Nach Absprache" oder Zeile weglassen.
- Aufgaben und Vorteile allgemein halten, passend zu Qualifikation und
  Einsatzbereich (typische Aufgaben dieser Funktion in der Schweiz).
- Länge wie Version 0.1 (je 5–7 Aufgaben/Profilpunkte, 5 Vorteile).
==========================================================================

MAPPING DER EINGABEFELDER (Vakanzensystem → Inserat)
- Kunde ............ nie publizieren; nur für Kanton + Typ der Einrichtung
- Vakanz ........... Basis für den Titel (umschreiben nach Titelformel)
- Datum ab ......... Datum ≤ heute → "Per sofort"; sonst "Ab TT. Monat JJJJ"
- Datum bis ........ falls ausgefüllt (nur Temp) → Zeile "Anstellung": "Temporär bis TT. Monat JJJJ"
- Temp/Perm ........ Temp → Anstellungsart "Temporär"; Anstellung: "Temporär"
                     Perm → Anstellungsart "Festanstellung"; Anstellung: "Festanstellung"
                     Try and Hire → Anstellungsart "Temporär, Festanstellung";
                       Anstellung: "Temporär oder Festanstellung möglich";
                       in "In Kürze" ergänzen: "…, temporär oder in Festanstellung."
                     Das Wort "Try & Hire" / "Try and Hire" NIE im Inserat verwenden.
- Erfahrung ........ Temp oder Try and Hire → Erfahrung im Einsatzbereich ist Pflicht:
                       "Berufserfahrung in der/im {{EINSATZBEREICH}}" (ohne "idealerweise")
                     Nur Perm → "Berufserfahrung in der Pflege, idealerweise in der/im {{EINSATZBEREICH}}"
                     Spezialerfahrung (z. B. Fallführung) als separater Punkt; keine Doppelungen
                     (Fallführung gibt es nur in der Spitex → nicht "Spitex oder Fallführung").
- Qualifikation .... Ausbildungszeile + Jobkategorie
                     (Pflegefachperson HF/FH → Pflege; FaGe → FaGe; Arzt → Arzt/Ärztin)
- Einsatzbereich ... Setting in Titel, Einleitung und Aufgaben
- Pensum von/bis ... "80–100 %" (bei gleichen Werten nur ein Wert)
- Dienste .......... nur wenn aus Vakanz ersichtlich (z. B. "Nachtdienst"),
                     sonst "Nach Absprache"
- Kontakt/Bemerkung  NIE publizieren
-->

# {{BERUFSBEZEICHNUNG}} | {{FACHBEREICH_ODER_SETTING}}, {{KANTON}}

<!-- Titelformel: Beruf + Qualifikation | Fachbereich/Setting, Kanton.
     Max. ca. 70 Zeichen, kein Fragesatz, keine Emojis. -->

**Jobkategorie:** {{JOBKATEGORIE}}
**Anstellungsart:** {{ANSTELLUNGSART}}
**Arbeitsplatz:** {{KANTON}}
**Pensum:** {{PENSUM}}

---

## In Kürze

Für {{UMSCHREIBUNG_EINRICHTUNG}} im Kanton {{KANTON}} suchen wir {{START_FORMULIERT}} eine engagierte {{BERUFSBEZEICHNUNG}} für {{EINSATZART_UND_BEREICH}}.

{{HOOK_FRAGEN}}
<!-- 1–2 kurze Fragen an die Zielperson, danach:
     "Dann freuen wir uns darauf, dich kennenzulernen!"  Max. 4 Sätze total. -->

### Auf einen Blick

| | |
|---|---|
| **Start** | {{START}} |
| **Anstellung** | {{ANSTELLUNG}} |
| **Pensum** | {{PENSUM}} |
| **Dienste** | {{DIENSTE}} |
| **Einsatzort** | Kanton {{KANTON}} |

## Deine Aufgaben

<!-- 5–7 Punkte, allgemein gehalten, typisch für Funktion + Einsatzbereich. -->
- {{AUFGABE_1}}
- {{AUFGABE_2}}
- {{AUFGABE_3}}
- {{AUFGABE_4}}
- {{AUFGABE_5}}

## Dein Profil

<!-- 5–7 Punkte. Reihenfolge: Ausbildung, Erfahrung, Fachliches,
     Persönliches, Deutsch / ggf. Führerausweis / Dienstbereitschaft. -->
- Abgeschlossene Ausbildung als {{QUALIFIKATION}} oder ein gleichwertiger ausländischer Abschluss mit mind. einem positiven Pre-Check / SRK-Anerkennung
- {{ERFAHRUNG}} <!-- siehe Regel "Erfahrung" oben -->
- {{PROFIL_3}}
- {{PROFIL_4}}
- Gute Deutschkenntnisse in Wort und Schrift

## Das bieten wir dir

<!-- Format: "- **Vorteil.** Erklärender Satz."  Keine Gedankenstriche.
     5 Punkte, allgemein und passend zur Stelle (bei Try and Hire: "**Temporär oder fest.** Du entscheidest, ob du die Stelle temporär oder in einer Festanstellung antreten möchtest."). -->
- **{{VORTEIL_1}}.** {{ERKLAERUNG_1}}
- **{{VORTEIL_2}}.** {{ERKLAERUNG_2}}
- **{{VORTEIL_3}}.** {{ERKLAERUNG_3}}
- **{{VORTEIL_4}}.** {{ERKLAERUNG_4}}
- **{{VORTEIL_5}}.** {{ERKLAERUNG_5}}

## Über Ibex Medics

<!-- Fester Textbaustein – wörtlich, nicht ändern. -->
Ibex Medics AG ist ein Personaldienstleister im Gesundheitswesen. Wir vermitteln qualifiziertes Gesundheitspersonal an führende Einrichtungen in der gesamten Deutschschweiz. Ob temporärer Einsatz oder Festanstellung, wir eröffnen dir attraktive Karriereperspektiven.

Mit persönlicher Betreuung, Transparenz und überdurchschnittlichen Arbeitgeberleistungen begleiten wir dich auf deinem beruflichen Weg.

## Interessiert?

<!-- Fester Textbaustein – wörtlich, nicht ändern. Danach folgt das Formular. -->
Dann freuen wir uns auf deine Bewerbung!

**Bewirb dich ganz einfach direkt unten. Wir benötigen dafür nur deinen Namen, deine E-Mail-Adresse, deine Telefonnummer und deinen Lebenslauf (CV).**

**Wir melden uns innerhalb eines Werktages persönlich bei dir!**
