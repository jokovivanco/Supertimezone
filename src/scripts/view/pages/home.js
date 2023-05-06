import TimeZones from '../../utils/TimeZones';
import CurrentTime from '../components/CurrentTime';
import TimeItem from '../components/TimeItem';
import { createLoading } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <div>
        <div class="py-3">
          <h3 class="text-primary">Current time</h3>
          <div id="current-time"></div>
        </div>
        <h3 class="text-primary">Timezones</h3>
        <ul id="list-timezone" class="px-4 py-4 list-unstyled d-flex flex-column justify-content-center gap-4 shadow"><ul>
      </div>
    `;
  },
  async afterRender() {
    // testing

    // end testing

    const currentTime = document.querySelector('#current-time');
    const listTimezone = document.querySelector('#list-timezone');

    currentTime.innerHTML = createLoading();
    currentTime.innerHTML = await CurrentTime();

    listTimezone.innerHTML = createLoading();
    listTimezone.innerHTML = '';
    const timeZones = TimeZones.randomize();
    timeZones.forEach((timeZone, index) => {
      const { country, city, date, time, flagCode } = timeZone;
      listTimezone.innerHTML += `<li>
          ${TimeItem({
            country,
            city,
            date,
            time,
            flagCode,
            line: index !== timeZones.length - 1,
          })}
        </li>`;
    });
  },
};

export default Home;
