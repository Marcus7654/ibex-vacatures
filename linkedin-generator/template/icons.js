// Icon-Bibliothek: einheitlicher Linienstil, 64×64 viewBox, Farbe über currentColor.
// Jedes Icon wird im Template in einem Kreis mit fester Grösse dargestellt.
window.ICONS = {
  // Flexibilität, Pensum, Arbeitszeiten
  uhr: `<circle cx="32" cy="32" r="22"/><path d="M32 18v14l9 7"/>`,

  // Entlöhnung, Anstellungsbedingungen
  medaille: `<circle cx="32" cy="26" r="17"/><circle cx="32" cy="26" r="12.5"/>
    <path d="M32 18.5l2.3 4.8 5.2.7-3.8 3.6.9 5.2-4.6-2.5-4.6 2.5.9-5.2-3.8-3.6 5.2-.7z"/>
    <path d="M23 40l-6 15 6-2.5 3.5 5 5-13.5M41 40l6 15-6-2.5-3.5 5-5-13.5"/>`,

  // Weiterentwicklung, Erfahrung sammeln
  wachstum: `<path d="M12 50l12-12 9 7 17-20"/><path d="M41 25h9v9"/>
    <rect x="15" y="40" width="7" height="12" fill="currentColor" stroke="none"/>
    <rect x="29" y="44" width="7" height="8" fill="currentColor" stroke="none"/>
    <rect x="43" y="34" width="7" height="18" fill="currentColor" stroke="none"/>`,

  // Temporär oder Festanstellung (Wahlfreiheit)
  wechsel: `<path d="M14 24h34"/><path d="M40 16l8 8-8 8"/><path d="M50 42H16"/><path d="M24 34l-8 8 8 8"/>`,

  // Verantwortung, Fallführung, Pflegeplanung
  klemmbrett: `<rect x="16" y="14" width="32" height="40" rx="4"/><path d="M25 14v-3h14v3"/>
    <path d="M24 30l5 5 11-11"/><path d="M24 44h16"/>`,

  // Nachtdienst
  mond: `<path d="M40 12a20 20 0 1 0 12 28A16 16 0 0 1 40 12z"/><path d="M47 16l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z"/>`,

  // Persönliche Betreuung, Team
  team: `<circle cx="24" cy="24" r="7"/><circle cx="42" cy="26" r="6"/>
    <path d="M11 50c0-8 6-14 13-14s13 6 13 14"/><path d="M36 37c2-1 4-1.5 6-1.5 6 0 11 5 11 12"/>`,

  // Herz / sinnstiftende Arbeit
  herz: `<path d="M32 52S12 40 12 25c0-7 5-12 11-12 4 0 7 2 9 5 2-3 5-5 9-5 6 0 11 5 11 12 0 15-20 27-20 27z"/>`,

  // Startdatum, Planung
  kalender: `<rect x="12" y="16" width="40" height="36" rx="4"/><path d="M12 26h40M22 11v9M42 11v9"/>
    <path d="M24 39l5 5 11-11"/>`,

  // Region, Standort
  standort: `<path d="M32 54S16 38 16 26a16 16 0 0 1 32 0c0 12-16 28-16 28z"/><circle cx="32" cy="26" r="6"/>`
};
