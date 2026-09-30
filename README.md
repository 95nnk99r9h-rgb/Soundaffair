# BIM trifft Bahnsteig – OnePager

Website zum Fachvortrag **„BIM trifft Bahnsteig – BIM-Modell zur
Baufortschrittskontrolle in Roigheim“** (BIM-Fachtagung Berlin, 30.09.2026).
Die Inhalte stammen aus der Präsentation
`_quelle/260921_BIM-Fachtagung_Roigheim_oV.pptx`.

Statische Seite ohne Build, ohne Framework, ohne externe Abhängigkeiten.

## Aufbau

```
index.html                 OnePager mit allen Abschnitten
impressum.html             Platzhalter – vor Veröffentlichung ausfüllen
datenschutz.html           Platzhalter – vor Veröffentlichung ausfüllen
assets/css/style.css       Layout, Farben, Responsive
assets/css/fonts.css       @font-face für die lokal ausgelieferten Schriften
assets/js/main.js          Mobile Navigation, aktiver Abschnitt, Einblenden, Video-Flächen
assets/fonts/*.woff2       Archivo, IBM Plex Sans, IBM Plex Mono (SIL OFL 1.1)
assets/img/                Bilder aus der Präsentation (WebP), QR-Codes, Favicon, OG-Bild
_quelle/                   Original-PowerPoint (wird von GitHub Pages nicht veröffentlicht)
```

Lokal ansehen:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Abschnitte (entsprechen der Agenda der Präsentation)

| Nr. | Abschnitt              | Folien |
|-----|------------------------|--------|
| –   | Hero / Titel           | 1      |
| 01  | Vorstellung            | 3–7    |
| 02  | Projektgrundlagen      | 8–9    |
| 03  | BIM im Projekt         | 10     |
| 04  | Digitales Bauschild    | 11     |
| 05  | Baufortschrittsmodell  | 12–13  |
| 06  | OpenSpace              | 14     |
| –   | Kontakt / Vielen Dank  | 15     |

## Design

Beige als Grundton und Akzent, dunkles Petrol für Schrift und Kontrastflächen,
Türkis als zweiter Akzent. Blau und Orange der Präsentation sind bewusst
ersetzt, nur die Statusfarben der Baufortschritts-Legende (Grün/Rot/Orange)
bleiben, weil sie fachlich etwas bedeuten.

| Rolle                 | Token            | Wert      |
|-----------------------|------------------|-----------|
| Hintergrund           | `--paper`        | `#F7F6F2` |
| Sand (Flächen)        | `--sand`         | `#EDEBE3` |
| Linien                | `--stone`        | `#DCD9CF` |
| Beige-Akzent          | `--beige`        | `#E6DCC6` |
| Schrift / Petrol      | `--ink`          | `#17302C` |
| Dunkle Sektionen      | `--petrol`       | `#12302C` |
| Akzent Türkis         | `--accent`       | `#0F766E` |
| Türkis auf Dunkel     | `--accent-bright`| `#5FD3C3` |

Schriften: **Archivo** (Headlines, breit gestellt), **IBM Plex Sans**
(Fließtext), **IBM Plex Mono** (technische Labels wie „km 91,1+59“).
Alle Schriften liegen lokal – beim Seitenaufruf gehen keine Daten an Google.

Barrierearmut: semantische Überschriften, echte Tabelle für den
Bestand/Ziel-Vergleich, sichtbare Fokuszustände, Skip-Link,
`prefers-reduced-motion` wird respektiert.

## Videos einbinden

Die drei Videos der Präsentation (`Medien1.mp4`, `Medien2.mp4`,
`OpenSpace_Video.mp4`) waren zu groß für GitHub. Auf der Seite gibt es dafür
feste Video-Flächen mit dem Hinweis „Video folgt“. Jede Fläche kennt zwei
Attribute (`data-video-src`, `data-video-embed`). Zuordnung:

| Fläche                     | Original             |
|----------------------------|----------------------|
| Fortschrittskontrolle      | `Medien1.mp4`        |
| Integration Punktwolke     | `Medien2.mp4`        |
| OpenSpace-Rundgang         | `OpenSpace_Video.mp4`|

**Variante A – Datei komprimieren und ins Repo legen.**
GitHub nimmt im Browser max. 25 MB pro Datei an, per Git max. 100 MB.
Mit [ffmpeg](https://ffmpeg.org) auf 720p und Web-Codec bringen:

```bash
ffmpeg -i Medien1.mp4 -vf "scale=-2:720" -c:v libx264 -crf 28 -preset slow \
       -movflags +faststart -an assets/video/fortschrittskontrolle.mp4
```

(`-an` entfernt die Tonspur – bei Bildschirmaufnahmen meist ohne Verlust.
Wird es noch zu groß: `-crf 30` oder `scale=-2:540`.)
Alternativ geht das mit HandBrake, Preset „Web → Vimeo YouTube 720p30“.

Danach in `index.html` an der passenden Fläche eintragen:

```html
<figure class="video-slot" data-video-src="assets/video/fortschrittskontrolle.mp4" …>
```

**Variante B – extern hosten (YouTube „nicht gelistet“ oder Vimeo).**
Embed-Adresse eintragen, z. B.:

```html
<figure class="video-slot" data-video-embed="https://www.youtube-nocookie.com/embed/VIDEO-ID" …>
```

Das Video wird erst nach Klick geladen (Zwei-Klick-Lösung). Vorher werden
keine Daten an den Anbieter übertragen.

## Offene Punkte vor dem Livegang

- [ ] **Impressum & Datenschutz** ausfüllen (`impressum.html`, `datenschutz.html`)
- [ ] **Videos** einbinden (siehe oben)
- [ ] **Freigabe** der Porträtfotos und Kontaktdaten beider Personen für eine
      öffentliche Website (insbesondere Mobilnummer)
- [ ] **PLZ DB-Standort Karlsruhe prüfen:** Folie 4 nennt „Bahnhofsplatz 1,
      76131“, Folie 9 und das Bauschild „Bahnhofplatz 1, 76137“ – verwendet ist 76137
- [ ] **OpenSpace-Link** prüfen – der Projektlink erfordert vermutlich ein Login
