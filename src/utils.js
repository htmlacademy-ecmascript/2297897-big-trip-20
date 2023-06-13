import dayjs from 'dayjs';

const getDestinationInfo = (destinationId, destinations) => destinations.find(
  (currentDestination) => currentDestination.id === destinationId
);

const toUpperCaseFirstLetter = (word) => `${word.slice(0,1).toUpperCase()}${word.slice(1)}`;
const getValueFromString = (string) => string.toLowerCase().replaceAll(' ', '-');
const sortDay = (firstPoint, secondPoint) => {
  const firstPointDate = dayjs(firstPoint.dateFrom);
  const secondPointDate = dayjs(secondPoint.dateFrom);
  return firstPointDate.valueOf() - secondPointDate.valueOf();
};
const sortTime = (pointA, pointB) => pointB.timeDiff - pointA.timeDiff;
const sortPrice = (pointA, pointB) => pointB.finalPrice - pointA.finalPrice;

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB);

const isPointPast = ({dateFrom, dateTo}) => dayjs().isAfter(dayjs(dateFrom)) && dayjs().isAfter(dayjs(dateTo));
const isPointPresent = ({dateFrom, dateTo}) => dayjs().isAfter(dayjs(dateFrom)) && dayjs().isBefore(dayjs(dateTo));
const isPointFuture = ({dateFrom, dateTo}) => dayjs().isBefore(dayjs(dateFrom)) && dayjs().isBefore(dayjs(dateTo));

export { sortDay, sortTime, sortPrice, getDestinationInfo, isDatesEqual, isPointPast, isPointPresent, isPointFuture, toUpperCaseFirstLetter, getValueFromString };
