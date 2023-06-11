import dayjs from 'dayjs';

const MINUTES_IN_HOUR = 3600000;
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
  return dayjs(timeDuration).format(timeFormat);
};

export { setTimeFormat, getTimeDiff };
