# Ibex Medics – vacatures

Bron van de skill `/vacature`. De hele skill staat in `.claude/skills/vacature/`:

- `SKILL.md` – de workflow: screenshot uit het vacaturesysteem → vacature op de website → LinkedIn-post klaarzetten in Chrome
- `templates/` – template voor de website-vacature en de LinkedIn-posttekst
- `voorbeelden/` – goedgekeurde voorbeelden
- `linkedin-generator/` – generator voor de LinkedIn-afbeelding, met lettertype, logo en fotobank

## Skill-ZIP maken voor de Claude-app (Cowork)

```bash
./maak-skill-zip.sh
```

Dit maakt `dist/vacature.zip`. Upload dat bestand in de Claude-app bij **Skills** in de instellingen. Bestaat de skill al, vervang hem dan.

In Cowork koppel je alleen een lege map en zet je **Claude in Chrome** aan. De skill slaat niets op in die map.
