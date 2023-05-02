import { Feature, Map, Overlay, View } from 'ol/index';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Point } from 'ol/geom';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { useGeographic } from 'ol/proj';

import LocationAPI from '../../utils/LocationAPI';

import Lines from './Lines';

const CurrentTime = async () => {
  const { latitude, longitude } = await LocationAPI.getLocation();

  useGeographic();
  const place = [longitude, latitude];

  const point = new Point(place);

  const map = new Map({
    target: 'map',
    view: new View({
      center: place,
      zoom: 8,
    }),
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      new VectorLayer({
        source: new VectorSource({
          features: [new Feature(point)],
        }),
        style: {
          'circle-radius': 9,
          'circle-fill-color': 'red',
        },
      }),
    ],
  });

  const element = document.getElementById('popup');

  const popup = new Overlay({
    element,
    stopEvent: false,
  });
  map.addOverlay(popup);

  map.on('moveend', () => {
    const view = map.getView();
    view.getCenter();
  });

  let popover;
  map.on('click', (event) => {
    if (popover) {
      popover.dispose();
      popover = undefined;
    }
    const feature = map.getFeaturesAtPixel(event.pixel)[0];
    if (!feature) {
      return;
    }
    const coordinate = feature.getGeometry().getCoordinates();
    popup.setPosition([
      coordinate[0] + Math.round(event.coordinate[0] / 360) * 360,
      coordinate[1],
    ]);
  });

  map.on('pointermove', (event) => {
    const type = map.hasFeatureAtPixel(event.pixel) ? 'pointer' : 'inherit';
    map.getViewport().style.cursor = type;
  });

  return `
    <h2>18 March 2023, 03:11 PM</h2>
    <p>Batulicin, Tanah Bumbu, Kalimantan Selatan UTC +08:00, Makassar</p>
    ${Lines()}
  `;
};

export default CurrentTime;
