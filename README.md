# Ibex Medics – vacatures

Alles voor de vacatureworkflow van Ibex Medics:

- `.claude/skills/vacature/` – de skill `/vacature`: screenshot uit het vacaturesysteem → website-vacature → LinkedIn-afbeelding en -posttekst
- `templates/` – template voor de website-vacature en de LinkedIn-posttekst
- `voorbeelden/` – goedgekeurde voorbeeldvacatures en -posts
- `linkedin-generator/` – generator voor de LinkedIn-afbeelding en de fotobank (`assets/fotos/bibliothek.json`)

## Installatie in Cowork (eenmalig)

1. Op GitHub: **Code → Download ZIP**. Pak het bestand uit naar een map, bijvoorbeeld `Ibex Vacatures`.
2. Zip de map `.claude/skills/vacature` en upload die in de Claude-app bij **Skills** in de instellingen.
3. Koppel in Cowork de map `Ibex Vacatures` en zet de Chrome-extensie **Claude in Chrome** aan.
4. Zorg dat je in Chrome bent ingelogd bij WordPress (ibexmedics.ch/wp-admin) en LinkedIn.

## Gebruik

Start een Cowork-taak in de map en plak een screenshot van een vacature, of typ `/vacature`.

Claude plaatst de vacature direct op de website. De LinkedIn-post zet hij klaar in een open tabblad. Jij klikt alleen nog op **Posten** en zet de link uit het antwoord in de eerste reactie.

Nieuwe foto's of gewijzigde templates? Download de ZIP opnieuw, of gebruik `git pull` als je de repository hebt gecloned.
