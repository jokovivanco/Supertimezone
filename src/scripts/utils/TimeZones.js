import momentTimezone from 'moment-timezone/data/meta/latest.json';

const TimeZones = {
  uniqueByCountry(zones) {
    const key = 'country';
    const zonesUniqueByCountry = [
      ...new Map(zones.map((item) => [item[key], item])).values(),
    ];
    return zonesUniqueByCountry;
  },
  zonify(zones) {
    const date = new Date();
    return this.uniqueByCountry(
      zones.map((zone) => {
        const regionNames = new Intl.DisplayNames(['en'], {
          type: 'region',
        });

        return {
          country: regionNames.of(zone.abbr),
          city: zone.zone.split('/')[1].replace('_', ' '),
          date: date.toLocaleDateString('en-US', {
            timeZone: zone.zone,
          }),
          time: date.toLocaleTimeString('en-US', {
            timeZone: zone.zone,
          }),
          flagCode: zone.abbr.toLowerCase(),
        };
      })
    );
  },
  getZones(randomCountries) {
    const zones = [];
    randomCountries.forEach((randomCountry) => {
      randomCountry.zones.forEach((zone) => {
        zones.push({
          abbr: randomCountry.abbr,
          zone,
        });
      });
    });
    return zones;
  },
  getMultipleRandom(array, num) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  },
  randomize() {
    const countriesArrayObjects = Object.values(momentTimezone.countries);
    const randomCountries = this.getMultipleRandom(countriesArrayObjects, 10);
    const zones = this.getZones(randomCountries);
    return this.zonify(zones);
  },
};

export default TimeZones;
