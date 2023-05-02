import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import LocationAPI from '../../utils/LocationAPI';

import Lines from './Lines';

const CurrentTime = async () => {
  const { latitude, longitude } = await LocationAPI.getLocation();
  console.log(latitude, longitude);

  const iconFeature = new Feature({
    geometry: new Point([longitude, latitude]),
  });

  const iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: 'https://openlayers.org/en/latest/examples/data/icon.png',
      imgSize: [100, 100],
    }),
  });

  iconFeature.setStyle(iconStyle);

  const map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      new VectorLayer({
        source: new VectorSource({
          features: [iconFeature],
        }),
      }),
    ],
    view: new View({
      center: [longitude, latitude],
      zoom: 10,
    }),
  });

  return `
    <h2>18 March 2023, 03:11 PM</h2>
    <p>Batulicin, Tanah Bumbu, Kalimantan Selatan UTC +08:00, Makassar</p>
    ${Lines()}
  `;
};

export default CurrentTime;
