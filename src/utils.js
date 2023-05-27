const AMOUNT_OF_PHOTOS = 6;

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

const buildPhotos = () => Array.from({ length: AMOUNT_OF_PHOTOS }, () => `https://loremflickr.com/248/152?random=${generateNumber(1, 20)}`);

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

const sortDay = (firstPoint, secondPoint) => {
  const firstPointDate = firstPoint.dateFrom;
  const secondPointDate = secondPoint.dateFrom;
  const result = firstPointDate.valueOf() - secondPointDate.valueOf();
  return result;
};
const sortTime = (pointA, pointB) => pointB.timeDiff - pointA.timeDiff;
const sortPrice = (pointA, pointB) => pointB.finalPrice - pointA.finalPrice;

export { getRandomArrayElement, generateNumber, buildPhotos, updateItem, sortDay, sortTime, sortPrice };
