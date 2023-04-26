import DataSource from '../../data/data-source';
import Lines from '../components/Lines';
import TimeItem from '../components/TimeItem';
import { createLoading } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <div>
        <div class="py-3">
          <h3 class="text-primary">Current time</h3>
          <h2>18 March 2023, 03:11 PM</h2>
          <p>Batulicin, Tanah Bumbu, Kalimantan Selatan UTC +08:00, Makassar</p>
          ${Lines()}
        </div>
        <h3 class="text-primary">Timezones</h3>
        <ul id="list-timezone" class="ps-4 py-4 list-unstyled d-flex flex-column justify-content-center gap-4"><ul>
      </div>
    `;
  },
  async afterRender() {
    const listTimezone = document.querySelector('#list-timezone');

    listTimezone.innerHTML = createLoading();
    const timeInfo = await DataSource.fetch();
    listTimezone.innerHTML = '';
    timeInfo.forEach((info, index) => {
      const {
        country, city, date, time, flagCode,
      } = info;
      listTimezone.innerHTML += `<li>
        ${TimeItem({
    country, city, date, time, flagCode, line: index !== timeInfo.length - 1,
  })}
      </li>`;
    });
  },
};

export default Home;
