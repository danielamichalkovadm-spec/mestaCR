// Inicializace mapy – pohled na celou ČR
const mapa = L.map('mapa').setView([49.8, 15.5], 7);

// Podkladová mapa (OpenStreetMap)
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  maxZoom: 20,
  subdomains: 'abcd',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(mapa);

// Ochrana proti vložení HTML z dat do popupu
function escapeHtml(text) {
  const el = document.createElement('div');
  el.textContent = text ?? '';
  return el.innerHTML;
}

// Načtení GeoJSONu s městy
fetch('body.geojson')
  .then(odpoved => {
    if (!odpoved.ok) {
      throw new Error('HTTP ' + odpoved.status);
    }
    return odpoved.json();
  })
  .then(data => {
    const vrstva = L.geoJSON(data, {
      onEachFeature: (feature, layer) => {
        const p = feature.properties;
        layer.bindPopup(
          `<h3 class="popup-nazev">${escapeHtml(p.nazev)}</h3>` +
          `<p class="popup-popisek">${escapeHtml(p.popisek)}</p>` +
          `<p class="popup-id">ID: ${escapeHtml(String(p.id))}</p>`
        );
        layer.bindTooltip(escapeHtml(p.nazev));
      }
    }).addTo(mapa);

    // Přiblížení mapy na všechna načtená města
    mapa.fitBounds(vrstva.getBounds(), { padding: [50, 50] });
  })
  .catch(chyba => {
    console.error('Nepodařilo se načíst body.geojson:', chyba);
    alert('Nepodařilo se načíst data (body.geojson). Spusťte stránku přes lokální server, viz readme.');
  });
