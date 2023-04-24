import Lines from './Lines';

const TimeItem = ({
  country = '',
  city = '',
  date = '',
  time = '',
  flagCode = '',
  line = false,
}) => `
<div>
  <div class="d-flex gap-2">
    <img
    src="https://flagcdn.com/36x27/${flagCode}.png"
    width="36"
    height="27"
    alt="${country}">
    <p class="text-primary">${city}</p>
    <p class="text-muted">${date}</p>
  </div>
  <div>
    <h3>${time}</h3>
  </div>
  <div>
    <p class="text-dark">${country}</p>
  </div>
  ${line ? Lines('bg-secondary') : ''}
</div>
`;

export default TimeItem;
