import LocationAPI from '../../utils/LocationAPI';
import DateConverter from '../../utils/DateConverter';

import Lines from './Lines';

const CurrentTime = async () => {
  const date = new Date();
  const address = await LocationAPI.getAddress();
  const addressString = address.formatted;
  const month = DateConverter.monthToString(date.getMonth());
  const formattedDateTime = `${date.getDate()} ${month} ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;

  return `
    <h2>${formattedDateTime}</h2>
    <p>${addressString}</p>
    ${Lines()}
  `;
};

export default CurrentTime;
