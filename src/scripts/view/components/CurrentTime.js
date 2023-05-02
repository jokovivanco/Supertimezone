import axios from 'axios';

import LocationAPI from '../../utils/LocationAPI';
import Lines from './Lines';

const CurrentTime = async () => {
  // const now = new Date();
  const { latitude, longitude } = await LocationAPI.getLocation();
  const getPosition = await axios(
    `http://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true`
  );
  console.log(getPosition);
  return `
    <h2>18 March 2023, 03:11 PM</h2>
    <p>Batulicin, Tanah Bumbu, Kalimantan Selatan UTC +08:00, Makassar</p>
    ${Lines()}
  `;
};

export default CurrentTime;
