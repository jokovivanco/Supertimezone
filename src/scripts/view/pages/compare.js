import DataSource from '../../data/data-source';
import Lines from '../components/Lines';
import TimeItem from '../components/TimeItem';
import { createLoading } from '../templates/template-creator';

const Compare = {
  async render() {
    return `
      <div>
        <div class="py-3">
          <h3 class="text-primary">Current time</h3>
          <h2>18 March 2023, 03:11 PM</h2>
          <p>Batulicin, Tanah Bumbu, Kalimantan Selatan UTC +08:00, Makassar</p>
          ${Lines()}
        </div>
        <h3 class="text-primary">Compare time</h3>
        <div class="ps-4 py-4">
          <h4>From</h4>
          <div id="current-timezone"></div>
          ${Lines()}
        </div>
        <div class="ps-4">
          <h4>To</h4>
          <div id="compared-timezone"></div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const currentTimezone = document.querySelector('#current-timezone');
    const comparedTimezone = document.querySelector('#compared-timezone');

    currentTimezone.innerHTML = createLoading();
    comparedTimezone.innerHTML = createLoading();

    const timezones = await DataSource.fetch();
    const currentTimezoneInfo = timezones[0];
    const comparedTimezoneInfo = timezones[1];

    currentTimezone.innerHTML = '';
    comparedTimezone.innerHTML = '';

    currentTimezone.innerHTML = TimeItem({
      country: currentTimezoneInfo.country,
      city: currentTimezoneInfo.city,
      date: currentTimezoneInfo.date,
      time: currentTimezoneInfo.time,
      flagCode: currentTimezoneInfo.flagCode,
    });
    comparedTimezone.innerHTML = TimeItem({
      country: comparedTimezoneInfo.country,
      city: comparedTimezoneInfo.city,
      date: comparedTimezoneInfo.date,
      time: comparedTimezoneInfo.time,
      flagCode: comparedTimezoneInfo.flagCode,
    });
  },
};

export default Compare;
