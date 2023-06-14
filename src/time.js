import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

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

const getTimeDiff = (startTime, endTime, isNeedFormat = true) => {
  const timeDuration = dayjs(endTime).diff(dayjs(startTime));
  if(isNeedFormat){
    const timeFormat = setTimeFormat(timeDuration);
    return dayjs.utc(timeDuration).format(timeFormat);
  }
  return timeDuration;
};

export { setTimeFormat, getTimeDiff };
