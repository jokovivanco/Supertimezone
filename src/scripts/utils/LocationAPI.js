import axios from 'axios';

const LocationAPI = {
  isSupported() {
    return !!navigator.geolocation;
  },
  getCoords() {
    return new Promise((resolve) => {
      if (this.isSupported()) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        });
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    });
  },
  getKey() {
    return process.env.OPENCAGE_API;
  },
  // eslint-disable-next-line consistent-return
  async getAddress() {
    const { longitude, latitude } = await this.getCoords();
    try {
      const { data } = await axios(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${this.getKey()}`
      );
      return data.results[0];
    } catch (error) {
      console.log(error);
    }
  },
  // getMap({ longitude = 0, latitude = 0 }) {
  //   useGeographic();
  //   const place = [longitude, latitude];

  //   const point = new Point(place);

  //   const map = new Map({
  //     target: 'map',
  //     view: new View({
  //       center: place,
  //       zoom: 8,
  //     }),
  //     layers: [
  //       new TileLayer({
  //         source: new OSM(),
  //       }),
  //       new VectorLayer({
  //         source: new VectorSource({
  //           features: [new Feature(point)],
  //         }),
  //         style: {
  //           'circle-radius': 9,
  //           'circle-fill-color': 'red',
  //         },
  //       }),
  //     ],
  //   });

  //   const element = document.getElementById('popup');

  //   const popup = new Overlay({
  //     element,
  //     stopEvent: false,
  //   });
  //   map.addOverlay(popup);

  //   map.on('moveend', () => {
  //     const view = map.getView();
  //     view.getCenter();
  //   });

  //   let popover;
  //   map.on('click', (event) => {
  //     if (popover) {
  //       popover.dispose();
  //       popover = undefined;
  //     }
  //     const feature = map.getFeaturesAtPixel(event.pixel)[0];
  //     if (!feature) {
  //       return;
  //     }
  //     const coordinate = feature.getGeometry().getCoordinates();
  //     popup.setPosition([
  //       coordinate[0] + Math.round(event.coordinate[0] / 360) * 360,
  //       coordinate[1],
  //     ]);
  //   });

  //   map.on('pointermove', (event) => {
  //     const type = map.hasFeatureAtPixel(event.pixel) ? 'pointer' : 'inherit';
  //     map.getViewport().style.cursor = type;
  //   });

  //   return map;
  // },
};

export default LocationAPI;
