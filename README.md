# Soundaffair – OnePager

Neue Website für **Soundaffair**, die Liveband aus Karlsruhe, als
statischer OnePager: dunkles Design, Akzentfarbe aus dem Logo, minimalistisch.

## Aufbau

```
index.html                 komplette Seite (alle Sektionen)
assets/css/style.css       Layout, Theme, Responsive
assets/css/fonts.css       @font-face für die lokal gehosteten Schriften
assets/js/main.js          Navigation, Scroll-Reveal, Formular
assets/fonts/*.woff2       Inter & Space Grotesk (SIL OFL 1.1)
assets/img/logo.svg        Wortbildmarke als SVG
```

Kein Build, kein Framework, keine Abhängigkeiten. `index.html` im Browser
öffnen genügt – für die lokale Entwicklung besser über einen kleinen Server,
damit die Schriften sauber geladen werden:

```bash
python3 -m http.server 8000
```

## Sektionen

1. **Hero** – Bandname, Genres, Booking-CTA
2. **Die Band** – Selbstbeschreibung, Eckdaten
3. **Besetzung** – Vocals, Bläsersatz, Rhythmusgruppe + Namen
4. **Setlist** – Auszug aus dem Repertoire
5. **Live & Referenzen** – Bühnen, Anlässe, Veranstalter-Infos
6. **Booking** – Anfrageformular und Kontaktdaten

## Design

| Rolle             | Wert      |
|-------------------|-----------|
| Hintergrund       | `#070b12` |
| Fläche / Karten   | `#101827` |
| Akzent (Logo-Blau)| `#3d90cf` |
| Akzent hell       | `#6ab4ea` |
| Text              | `#e9eef7` |

Schriften: **Space Grotesk** für Headlines, **Inter** für Fließtext.
Beide werden lokal ausgeliefert – beim Seitenaufruf gehen damit keine
Besucherdaten an die Google-Fonts-CDN.

`prefers-reduced-motion` wird respektiert, Fokuszustände sind sichtbar,
das mobile Menü ist über `aria-expanded` ausgezeichnet.

## Offene Punkte

Diese Stellen sind im Code mit `TODO` markiert und brauchen noch echte Daten:

- [ ] **Kontaktdaten** – E-Mail, Telefon und Social-Media-Links in der
      Booking-Sektion (`index.html`, `.contact-side`)
- [ ] **Formular-Endpoint** – `action` am Buchungsformular setzen
      (z. B. Formspree) und in `assets/js/main.js` das `preventDefault` entfernen
- [ ] **Impressum & Datenschutz** – Seiten anlegen und im Footer verlinken
      (für eine deutsche Bandseite rechtlich erforderlich)
- [ ] **Instrumente je Bandmitglied** – aktuell sind nur die Namen gelistet
- [ ] **Bilder** – Band- und Livefotos für Hero und Mediabereich
- [ ] **Logo** – `assets/img/logo.svg` ist eine SVG-Nachzeichnung der
      Wortbildmarke. Liegt die Originaldatei vor, diese ersetzen; die
      Farbspritzer der Originalgrafik sind bewusst nicht übernommen,
      damit die Marke auch bei 32 px lesbar bleibt.

## Inhalte

Die Texte wurden aus den Inhalten des bisherigen Auftritts
`soundaffair-band.de` übernommen. Die Domain war aus der Build-Umgebung
heraus nicht direkt erreichbar, die Inhalte stammen daher aus
Suchmaschinen-Indexdaten. **Vor dem Livegang gegen die Originalseite
prüfen** – insbesondere Setlist, Referenzen und Besetzung.
