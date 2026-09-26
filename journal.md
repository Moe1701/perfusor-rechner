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
# Projekt-Tagebuch: Moe's Perfusor Rechner (React PWA)

## Projektziele & Status
- **Ziel:** Ein medizinischer Offline-Rechner (PWA) für Laufraten und Dosierungen.
- **Architektur:** React (Vite), reines CSS, Vercel-Deployment. Strikte Trennung von UI und Logik.
- **Aktueller Status:** App wurde in "Moe's Perfusor Rechner" umbenannt. Die Logik ist zu 100 % funktional. Das Layout nutzt nun die volle Bildschirmhöhe (`100dvh`) für eine 50/50-Aufteilung zwischen Basisdaten und Raten-Grid.

## Abgeschlossene Meilensteine (Erreicht)
- [x] Migration zu React/Vite und PWA-Offline-Support via Vercel.
- [x] Bidirektionale Synchronisierung von Wirkstoff und Konzentration.
- [x] Kompakte Layout-Basis wiederhergestellt (18px / 16px Eingabefelder für maximale Datendichte).
- [x] Nummern aus den Überschriften entfernt und diese zentriert.
- [x] Dynamische Höhenanpassung (`flex-grow`) implementiert, damit kein leerer Raum am unteren Bildschirmrand entsteht.
- [x] **Developer-Features integriert:** 
  - 3-Klick auf den Titel: Aktiviert ein x/y-Fadenkreuz zur Layout-Diagnose.
  - 5-Klick auf den Titel: Führt einen Hard Reset durch (leert LocalStorage, löscht PWA-Caches, meldet Service Worker ab und lädt neu).

## Nächste Schritte / Offene Todos
- **Layout-Feinschliff:** Die 50/50-Aufteilung und Skalierung im Detail prüfen.
- **Workflow-Optimierung:** Ab sofort werden bei kleinen Anpassungen nur noch "Suchen & Ersetzen"-Snippets verwendet, um die Dateien übersichtlich zu halten und Fehler beim Kopieren zu vermeiden.
## Meilenstein: Layout-Perfektionierung & Grid-Optimierung (26.09.2026)
- **100dvh Bugfix:** Der `#root`-Container von React wurde auf `flex-grow: 1` gesetzt. Dadurch füllt die `.calculator-card` nun endlich den kompletten Bildschirm nach unten hin aus.
- **50/50 Layout etabliert:** Die Basisdaten nehmen nun ihren natürlichen Platz ein, während das untere Raten-Grid (`.rates-grid`) den gesamten restlichen Platz der unteren Bildschirmhälfte dynamisch ausfüllt.
- **Grid-Verteilung:** Die 3 Input-Groups innerhalb der unteren Kacheln dritteln sich den Platz nun exakt (`flex: 1`), wodurch keine unschönen Lücken mehr entstehen.
- **Basisdaten optimiert:** Die Eingabefelder der Basisdaten wurden verkürzt (`max-width: 130px`) und rechtsbündig an die Einheiten herangerückt, um die Lesbarkeit zu verbessern.
- **CSS-Magie im Raten-Grid:** Ohne die React-Struktur zu ändern, wurden die Einheiten (z.B. "mg/kg/h") über `flex-direction: column-reverse` optisch *über* die Eingabefelder gehoben. Gleichzeitig wurde ihre Schriftgröße auf `0.95rem` (bold) erhöht, sodass sie nun als klare, kleine Überschriften fungieren.
- **Developer Tools Update:** Das Fadenkreuz (3-Klick) zeigt nun nicht nur die Mitte (0/0), sondern live die exakte Pixel-Auflösung (Breite x Höhe) des Bildschirms an.
- **Workflow:** Strikter Git-Workflow (`add`, `commit`, `push`) bei jedem Snippet eingeführt.

## Nächste Schritte / Offene Todos
- Farb-Tuning (Kontraste prüfen, ggf. dezente Hervorhebungen für die wichtigsten Felder).
- Testen auf verschiedenen realen Endgeräten (iOS/Android) via PWA.