const LocationAPI = {
  isSupported() {
    return !!navigator.geolocation;
  },
  showPosition(position) {
    return {
      latitude: position?.coords?.latitude,
      longitude: position?.coords?.longitude,
    };
  },
  // eslint-disable-next-line consistent-return
  getLocation() {
    return new Promise((resolve) => {
      if (this.isSupported()) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve({
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
          });
        });
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    });
  },
};

export default LocationAPI;
