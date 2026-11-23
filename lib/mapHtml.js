export const MAP_HTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
  <link href="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css" rel="stylesheet"/>
  <script src="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js"></script>
  <style>
    * { -webkit-tap-highlight-color: transparent; margin: 0; padding: 0; box-sizing: border-box; }
    html, body, #map { width: 100%; height: 100%; overflow: hidden; background: #EBEBEB; }
    .maplibregl-ctrl { display: none !important; }
    .custom-pin { cursor: pointer; transition: transform 0.15s ease; }
    .custom-pin:active { transform: scale(1.15); }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    const RECYCLE_PATH = '<g transform="translate(10, 8) scale(0.5)"><path d="M12 17l-2 2l2 2" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 19h9a2 2 0 0 0 1.75 -2.75l-.55 -1" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M8.536 11l-.732 -2.732l-2.732 .732" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.804 8.268l-4.5 7.794a2 2 0 0 0 1.506 2.89l1.141 .024" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M15.464 11l2.732 .732l.732 -2.732" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.196 11.732l-4.5 -7.794a2 2 0 0 0 -3.256 -.14l-.591 .976" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/></g>';

    function createPin(color, isSelected) {
      const w = isSelected ? 38 : 30;
      const h = isSelected ? 48 : 38;
      const shadow = isSelected ? '<ellipse cx="16" cy="39" rx="10" ry="2.5" fill="rgba(0,0,0,0.25)"/>' : '';
      return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 32 42">' + shadow +
        '<path d="M16 2 C8.8 2 3 7.8 3 15 C3 23.5 14.5 36.8 15.4 37.8 C15.7 38.1 16.3 38.1 16.6 37.8 C17.5 36.8 29 23.5 29 15 C29 7.8 23.2 2 16 2 Z" fill="' + color + '" stroke="#FFFFFF" stroke-width="' + (isSelected ? 2.5 : 1.5) + '"/>' +
        RECYCLE_PATH + '</svg>';
    }

    const map = new maplibregl.Map({
      container: 'map',
      style: 'https://tiles.openfreemap.org/styles/positron',
      center: [77.5946, 12.9716],
      zoom: 11,
      attributionControl: false
    });

    let markers = {};
    let userMarker = null;
    let isReady = false;
    let pending = null;

    map.on('load', () => {
      map.addSource('route', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
      map.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        paint: { 'line-color': '#000000', 'line-width': 3, 'line-dasharray': [2, 2] }
      });
      isReady = true;
      if (pending) updateMap(pending);
    });

    map.on('click', () => {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'DESELECT' }));
      }
    });

    window.updateMap = function(data) {
      if (!isReady) { pending = data; return; }
      if (data.userPoint) {
        const ucoords = [data.userPoint.longitude, data.userPoint.latitude];
        if (!userMarker) {
          const el = document.createElement('div');
          el.innerHTML = '<div style="width:20px;height:20px;border-radius:50%;background:#ffffff;border:2px solid #000000;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 4px rgba(0,0,0,0.25);"><div style="width:8px;height:8px;border-radius:50%;background:#000000;"></div></div>';
          userMarker = new maplibregl.Marker({ element: el, anchor: 'center' }).setLngLat(ucoords).addTo(map);
        } else {
          userMarker.setLngLat(ucoords);
        }
      }

      const activeIds = new Set((data.facilities || []).map(f => f.id));
      Object.keys(markers).forEach(id => {
        if (!activeIds.has(id)) { markers[id].remove(); delete markers[id]; }
      });

      (data.facilities || []).forEach(f => {
        const isSelected = f.id === data.selectedId;
        const color = f.status === 'closed' ? '#8E8E93' : f.status === 'nearly_full' ? '#F58220' : '#00A859';
        if (markers[f.id]) {
          markers[f.id].getElement().innerHTML = createPin(color, isSelected);
        } else {
          const el = document.createElement('div');
          el.className = 'custom-pin';
          el.innerHTML = createPin(color, isSelected);
          el.onclick = (e) => {
            e.stopPropagation();
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'SELECT_FACILITY', id: f.id }));
            }
          };
          markers[f.id] = new maplibregl.Marker({ element: el, anchor: 'bottom' }).setLngLat([f.lng, f.lat]).addTo(map);
        }
      });

      if (data.selectedFacility && data.userPoint) {
        const u = [data.userPoint.longitude, data.userPoint.latitude];
        const f = [data.selectedFacility.lng, data.selectedFacility.lat];
        map.getSource('route')?.setData({ type: 'Feature', geometry: { type: 'LineString', coordinates: [u, f] } });
        map.fitBounds([[Math.min(u[0], f[0]), Math.min(u[1], f[1])], [Math.max(u[0], f[0]), Math.max(u[1], f[1])]], {
          padding: { top: 120, bottom: 260, left: 60, right: 60 }, maxZoom: 15, duration: 600
        });
      } else {
        map.getSource('route')?.setData({ type: 'FeatureCollection', features: [] });
      }
    };

    window.flyTo = function(lng, lat, zoom) {
      if (map) map.flyTo({ center: [lng, lat], zoom: zoom || 12, duration: 600 });
    };
  </script>
</body>
</html>`;