import { nanoid } from 'nanoid';
import { getRandomArrayElement, generateNumber, buildPhotos } from '../utils.js';
import dayjs from 'dayjs';
import { generateDate } from '../time.js';

const MIN_OFFER_PRICE = 10;
const MAX_OFFER_PRICE = 100;

const MIN_BASE_PRICE = 1000;
const MAX_BASE_PRICE = 5000;

const MIN_DIFF_TIME = 5;
const MAX_DIFF_TIME = 60;

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
    id: nanoid(),
    eventType: getRandomArrayElement(TYPES),
    cityName: getRandomArrayElement(CITIES),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    basePrice: generateNumber(MIN_BASE_PRICE, MAX_BASE_PRICE),
    photos: buildPhotos(),
    dateFrom: generateDate(),
    timeDiff: generateNumber(MIN_DIFF_TIME, MAX_DIFF_TIME),
    isFavorite: true,
    offers: {
      offerName: 'Test offer',
      offerPrice: generateNumber(MIN_OFFER_PRICE, MAX_OFFER_PRICE),
    },

    get typeName() {
      const type = this.eventType;
      return `${type[0].toUpperCase()}${type.slice(1)}`;
    },

    get endDate() {
      const dateFrom = this.dateFrom;
      const dateTo = dayjs(dateFrom).add(this.timeDiff, 'minutes').toDate();
      return dateTo;
    },

    get totalPrice() {
      return this.basePrice + this.offers['offerPrice'];
    }
  };

  point.dateTo = point.endDate;
  point.eventTypeName = point.typeName;
  point.finalPrice = point.totalPrice;
  return point;
};

export { generatePoint };
