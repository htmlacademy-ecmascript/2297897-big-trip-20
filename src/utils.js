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

export { getRandomArrayElement, generateNumber, buildPhotos, updateItem };
