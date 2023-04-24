import Lines from '../components/Lines';
import TimeItem from '../components/TimeItem';

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
    const timeInfo = [
      {
        country: 'Indonesia',
        city: 'Jakarta',
        date: '18 April 2023',
        time: '02:11 PM',
        flagCode: 'id',
      },
      {
        country: 'Russia',
        city: 'Moscow',
        date: '18 April 2023',
        time: '10:11 AM',
        flagCode: 'ru',
      },
      {
        country: 'Egypt',
        city: 'Cairo',
        date: '18 April 2023',
        time: '09:11 AM',
        flagCode: 'eg',
      },
      {
        country: 'Singapore',
        city: 'Singapore',
        date: '18 April 2023',
        time: '03:11 PM',
        flagCode: 'sg',
      },
    ];
    const listTimezone = document.querySelector('#list-timezone');
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
