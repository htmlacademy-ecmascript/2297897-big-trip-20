import dayjs from 'dayjs';
import { generateNumber } from './utils.js';

const CURRENT_YEAR = 2023;

const MIN_MONTH = 1;
const MAX_MONTH = 12;

const MIN_DAY_IN_MONTH = 1;
const MAX_DAY_IN_MONTH = 31;

const MIN_HOUR_IN_DAY = 0;
const MAX_HOUR_IN_DAY = 23;

const MIN_MINUTES_IN_HOUR = 0;
const MAX_MINUTES_IN_HOUR = 59;

const MINUTES_IN_HOUR = 3600000;
const TIME_LOCAL_DIFFERENCE = 10800000;
const MINUTES_IN_DAY = MINUTES_IN_HOUR * 24;

const setTimeFormat = (timeDiff) => {
  let timeFormat = null;
  switch (true) {
    case timeDiff < MINUTES_IN_HOUR:
      timeFormat = 'mm[M]';
      break;
    case timeDiff >= MINUTES_IN_HOUR && timeDiff < MINUTES_IN_DAY:
      timeFormat = 'HH[H] mm[M]';
      break;
    case timeDiff >= MINUTES_IN_DAY:
      timeFormat = 'DD[D] HH[H] mm[M]';
      break;
  }
  return timeFormat;
};

const getTimeDiff = (startTime, endTime) => {
  const timeDuration = dayjs(endTime).diff(startTime);
  const timeFormat = setTimeFormat(timeDuration);
  const formattedTimeDuration = dayjs(timeDuration - TIME_LOCAL_DIFFERENCE).format(timeFormat); //Временный костыль, ибо я не генерировал временной пояс в моках
  return formattedTimeDuration;
};

const generateDate = () => {
  const year = CURRENT_YEAR;
  const month = generateNumber(MIN_MONTH, MAX_MONTH);
  const day = generateNumber(MIN_DAY_IN_MONTH, MAX_DAY_IN_MONTH);

  const hours = generateNumber(MIN_HOUR_IN_DAY, MAX_HOUR_IN_DAY);
  const minutes = generateNumber(MIN_MINUTES_IN_HOUR, MAX_MINUTES_IN_HOUR);
  const date = `${year}-${month}-${day} ${hours}:${minutes}`;

  return date;
};

export { generateDate, setTimeFormat, getTimeDiff };
