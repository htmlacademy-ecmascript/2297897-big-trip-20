import { generateNumber } from './utils.js';

const CURRENT_YEAR = 2023;

const MIN_MONTH = 1;
const MAX_MONTH = 12;

const MIN_DAY = 1;
const MAX_DAY = 31;

const MIN_HOUR = 0;
const MAX_HOUR = 23;

const MIN_MINUTES = 0;
const MAX_MINUTES = 59;

const generateDate = () => {
  const year = CURRENT_YEAR;
  const month = generateNumber(MIN_MONTH, MAX_MONTH);
  const day = generateNumber(MIN_DAY, MAX_DAY);

  const hours = generateNumber(MIN_HOUR, MAX_HOUR);
  const minutes = generateNumber(MIN_MINUTES, MAX_MINUTES);
  const date = `${year}-${month}-${day} ${hours}:${minutes}`;

  return date;
};

export { generateDate };
