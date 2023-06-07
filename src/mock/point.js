import { nanoid } from 'nanoid';
import { getRandomArrayElement, generateNumber, getCityInfo } from '../utils.js';
import dayjs from 'dayjs';
import { generateDate } from '../time.js';
import { TYPES } from '../const.js';

const MIN_BASE_PRICE = 1000;
const MAX_BASE_PRICE = 5000;

const MIN_DIFF_TIME = 30;
const MAX_DIFF_TIME = 2880;

const CITIES = [
  'Amsterdam',
  'Chaomix',
  'Geneva'
];

const OFFERS = [
  {
    type: 'luggage',
    title: 'Add luggage',
    price: 30,
    suitablePointTypes: ['bus', 'train', 'ship', 'drive', 'flight'],
  },
  {
    type: 'comfort',
    title: 'Comfort class',
    price: 100,
    suitablePointTypes: ['train', 'ship', 'flight'],
  },
  {
    type: 'meal',
    title: 'Add meal',
    price: 15,
    suitablePointTypes: ['train', 'ship', 'flight', 'check-in'],
  },
  {
    type: 'seats',
    title: 'Choose seats',
    price: 5,
    suitablePointTypes: ['bus', 'train', 'ship', 'flight'],
  },
];

const citiesInformation = [
  {
    cityName: 'Amsterdam',
    photos: 'https://loremflickr.com/248/152?random=1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    cityName: 'Chaomix',
    photos: 'https://loremflickr.com/248/152?random=2',
    description: 'Cras aliquet varius magna, non porta ligula feugiat eget..'
  },
  {
    cityName: 'Geneva',
    photos: 'https://loremflickr.com/248/152?random=3',
    description: 'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.'
  },
];

const generateCitiesDatalist = (citiesArray) => citiesArray.map((city) => `<option value="${city}"></option>`).join('');
const citiesDatalistElement = generateCitiesDatalist(CITIES);

const generatePoint = () => {
  const point = {
    id: nanoid(),
    eventType: getRandomArrayElement(TYPES),
    cityName: getRandomArrayElement(CITIES),
    basePrice: generateNumber(MIN_BASE_PRICE, MAX_BASE_PRICE),
    dateFrom: generateDate(),
    isFavorite: generateNumber(0, 1),

    get typeName() {
      const type = this.eventType;
      return `${type[0].toUpperCase()}${type.slice(1)}`;
    },

    get endDate() {
      const dateFrom = this.dateFrom;
      const dateTo = dayjs(dateFrom).add(generateNumber(MIN_DIFF_TIME, MAX_DIFF_TIME), 'minutes').toDate();
      return dateTo;
    },

    get totalPrice() {
      return this.basePrice;
    },

    get cityPhotos() {
      return getCityInfo(this.cityName, citiesInformation).photos;
    },

    get cityDescription() {
      return getCityInfo(this.cityName, citiesInformation).description;
    }
  };

  point.offers = OFFERS.filter(
    (offer) => offer.suitablePointTypes.includes(point.eventType)
  );
  point.dateTo = point.endDate;
  point.eventTypeLabel = point.typeName;
  point.finalPrice = point.totalPrice;
  point.photos = point.cityPhotos;
  point.description = point.cityDescription;

  return point;
};

export { generatePoint, citiesDatalistElement, citiesInformation, OFFERS };
