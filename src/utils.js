import dayjs from 'dayjs';

const getCityInfo = (desiredCity, citiesList) => citiesList.find(
  (currentInfo) => currentInfo.cityName === desiredCity
);

const getRandomArrayElement = (array) => {
  const randomElement = array[Math.floor(Math.random() * (array.length))];
  return randomElement;
};

const generateNumber = (min, max) => {
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const number = Math.floor(lower + Math.random() * (upper - lower + 1));
  return number;
};

const sortDay = (firstPoint, secondPoint) => {
  const firstPointDate = dayjs(firstPoint.dateFrom);
  const secondPointDate = dayjs(secondPoint.dateFrom);
  const result = firstPointDate.valueOf() - secondPointDate.valueOf();
  return result;
};
const sortTime = (pointA, pointB) => pointB.timeDiff - pointA.timeDiff;
const sortPrice = (pointA, pointB) => pointB.finalPrice - pointA.finalPrice;

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB);

const isPointPast = ({dateFrom, dateTo}) => dayjs().isAfter(dayjs(dateFrom)) && dayjs().isAfter(dayjs(dateTo));
const isPointPresent = ({dateFrom, dateTo}) => dayjs().isAfter(dayjs(dateFrom)) && dayjs().isBefore(dayjs(dateTo));
const isPointFuture = ({dateFrom, dateTo}) => dayjs().isBefore(dayjs(dateFrom)) && dayjs().isBefore(dayjs(dateTo));

export { getRandomArrayElement, generateNumber, sortDay, sortTime, sortPrice, getCityInfo, isDatesEqual, isPointPast, isPointPresent, isPointFuture };
