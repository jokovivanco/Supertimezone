import DataSource from '../../data/data-source';
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
    const currentTime = document.querySelector('#current-time');
    const listTimezone = document.querySelector('#list-timezone');

    currentTime.innerHTML = createLoading();
    currentTime.innerHTML = await CurrentTime();

    listTimezone.innerHTML = createLoading();
    const timeInfo = await DataSource.fetch();
    listTimezone.innerHTML = '';
    timeInfo.forEach((info, index) => {
      const { country, city, date, time, flagCode } = info;
      listTimezone.innerHTML += `<li>
        ${TimeItem({
          country,
          city,
          date,
          time,
          flagCode,
          line: index !== timeInfo.length - 1,
        })}
      </li>`;
    });
  },
};

export default Home;
