# Projekt-Tagebuch: Perfusor Laufratenrechner (React Refactoring)

## Projektziele
- Überführung des bestehenden Vanilla-HTML/JS Perfusor-Rechners in eine saubere, skalierbare React-Appliance.
- Bereitstellung über Vercel.
- Vorbereitung für weitere Features (z. B. Medikamenten-Datenbank, PWA-Support).

## Aktueller Architektur-Status
- [x] Vite React Setup abgeschlossen.
- [ ] UI-Komponenten (BaseInputs, RateInputs) extrahiert.
- [ ] Logik in `usePerfusor.js` und `mathUtils.js` separiert.
- [ ] Styling (CSS Modules / Tailwind) implementiert.

## Offene Probleme / Nächste Schritte
- Übertragung der synchronen `syncValues`-Logik in den React-State.
- Umwandlung der HTML-Inputs (Wirkstoff, Volumen, Gewicht) in kontrollierte React-Komponenten.

## Changelog
- **YYYY-MM-DD**: Projekt initialisiert. Ordnerstruktur festgelegt.