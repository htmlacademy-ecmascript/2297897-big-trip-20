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

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

const sortDay = (firstPoint, secondPoint) => {
  const firstPointDate = dayjs(firstPoint.dateFrom);
  const secondPointDate = dayjs(secondPoint.dateFrom);
  const result = firstPointDate.valueOf() - secondPointDate.valueOf();
  return result;
};
const sortTime = (pointA, pointB) => pointB.timeDiff - pointA.timeDiff;
const sortPrice = (pointA, pointB) => pointB.finalPrice - pointA.finalPrice;

export { getRandomArrayElement, generateNumber, updateItem, sortDay, sortTime, sortPrice, getCityInfo };
