# Mapa měst ČR (Leaflet)

Jednoduchá webová mapa měst České republiky postavená na knihovně [Leaflet](https://leafletjs.com/).
Data měst jsou uložena v samostatném souboru GeoJSON.

## Struktura projektu

| Soubor         | Popis                                              |
|----------------|----------------------------------------------------|
| `index.html`   | Hlavní stránka, načítá Leaflet, styl a skript      |
| `map.js`       | Inicializace mapy, načtení GeoJSONu, popupy        |
| `styl.css`     | Vzhled stránky a popupů                            |
| `body.geojson` | Data měst (body s atributy)                        |
| `readme.md`    | Tato dokumentace                                   |

## Spuštění

Prohlížeče blokují `fetch()` při otevření souboru přímo z disku (`file://`),
proto je nutné spustit lokální server. Ve složce projektu například:

```bash
python -m http.server 8000
```

a otevřít <http://localhost:8000>.
(Alternativy: rozšíření *Live Server* ve VS Code, nebo `npx serve`.)

## Datová struktura (`body.geojson`)

Každé město je jeden `Feature` typu `Point` s atributy:

| Atribut   | Typ    | Popis             |
|-----------|--------|-------------------|
| `id`      | číslo  | Unikátní ID města |
| `nazev`   | text   | Název města       |
| `popisek` | text   | Krátký popis      |

**Pozor:** v GeoJSONu je pořadí souřadnic `[délka (lon), šířka (lat)]`.

### Přidání nového města

Do pole `features` v `body.geojson` přidejte další objekt, např.:

```json
{
  "type": "Feature",
  "properties": { "id": 3, "nazev": "Brno", "popisek": "Druhé největší město ČR." },
  "geometry": { "type": "Point", "coordinates": [16.6068, 49.1951] }
}
```

Mapa se automaticky přiblíží tak, aby byla vidět všechna města.

## Použité technologie

- Leaflet 1.9.4
- Podkladová mapa © přispěvatelé OpenStreetMap
