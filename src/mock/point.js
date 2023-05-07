import { getRandomArrayElement, generateNumber, buildPhotos } from '../utils.js';

const OFFERS_COUNT = 5;
const MIN_OFFER_PRICE = 10;
const MAX_OFFER_PRICE = 100;
const TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];
const CITIES = [
  'Amsterdam',
  'Chaomix',
  'Geneva'
];

const generatePoint = () => {
  const point = {
    type: getRandomArrayElement(TYPES),
    cityName: getRandomArrayElement(CITIES),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    photos: buildPhotos(),
    offers: {
      offerName: 'Test offer',
      offerPrices: Array.from({length: OFFERS_COUNT}, () => generateNumber(MIN_OFFER_PRICE, MAX_OFFER_PRICE)),
    },

    get typeName() {
      const type = this.type;
      return `${type[0].toUpperCase()}${type.slice(1)}`;
    },
  };
  point.name = point.typeName;
  return point;
};

export { generatePoint };
