import DataSource from '../../data/data-source';
import CurrentTime from '../components/CurrentTime';
import Lines from '../components/Lines';
import TimeItem from '../components/TimeItem';
import { createLoading } from '../templates/template-creator';

const Compare = {
  async render() {
    return `
      <div>
        <div class="py-3">
          <h3 class="text-primary">Current time</h3>
          <div id="current-time"></div>
          ${Lines()}
        </div>
        <h3 class="text-primary">Compare time</h3>
        <div class="px-4 py-4 list-unstyled d-flex flex-column justify-content-center gap-4 shadow">
          <div>
            <h4>From</h4>
            <div id="current-timezone"></div>
            ${Lines('bg-secondary')}
          </div>
          <div>
            <h4>To</h4>
            <div id="compared-timezone"></div>
          </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const currentTime = document.querySelector('#current-time');
    const currentTimezone = document.querySelector('#current-timezone');
    const comparedTimezone = document.querySelector('#compared-timezone');

    currentTime.innerHTML = createLoading();
    currentTimezone.innerHTML = createLoading();
    comparedTimezone.innerHTML = createLoading();

    const timezones = await DataSource.fetch();
    const currentTimezoneInfo = timezones[0];
    const comparedTimezoneInfo = timezones[1];

    currentTime.innerHTML = await CurrentTime();
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
