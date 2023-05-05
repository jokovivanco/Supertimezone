import momentTimezone from 'moment-timezone/data/meta/latest.json';

const TimeZones = {
  randomize() {
    const countriesArrayObjects = Object.values(momentTimezone.countries);
    const randomCountries = this.getMultipleRandom(countriesArrayObjects, 10);
    const date = new Date();
    return randomCountries.map((randomCountry) => {
      const regionNames = new Intl.DisplayNames(['en'], {
        type: 'region',
      });

      return {
        country: regionNames.of(randomCountry.abbr),
        city: randomCountry.name,
        date: date.toLocaleDateString('en-US', {
          timeZone: randomCountry.zones[0],
        }),
        time: date.toLocaleTimeString('en-US', {
          timeZone: randomCountry.zones[0],
        }),
        flagCode: randomCountry.abbr.toLowerCase(),
      };
    });
  },
  getMultipleRandom(array, num) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  },
};

export default TimeZones;
