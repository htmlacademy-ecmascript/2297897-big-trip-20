import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class PointsModel extends Observable {
  #pointsApiService = null;
  #points = [];
  #offers = [];
  #destinations = [];

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get points(){
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient());
      this.#offers = await this.#pointsApiService.offers;
      this.#destinations = await this.#pointsApiService.destinations;
    } catch (err){
      this.#points = [];
    }
    this._notify(UpdateType.INIT);
  }

  updatePoint(updateType, updateElement) {
    const index = this.#points.findIndex(
      (task) => task.id === updateElement.id
    );

    if (index === -1) {
      throw new Error ('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      updateElement,
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType, updateElement);
  }

  addPoint(updateType, updateElement) {
    this.#points.unshift(updateElement);

    this._notify(updateType, updateElement);
  }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      id: point['id'],
      eventType: point['type'],
      cityName: point['destination'],
      basePrice: point['base_price'],
      dateFrom: new Date(point['date_from']),
      dateTo: new Date(point['date_to']),
      isFavorite: point['is_favorite'],
      offers: point['offers'],
    };

    delete adaptedPoint['type'];
    delete adaptedPoint['destination'];
    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }

  deletePoint(updateType, updateElement){
    const index = this.#points.findIndex(
      (task) => task.id === updateElement.id
    );

    if (index === -1) {
      throw new Error ('Can\'t update unexisting point');
    }

    this.#points.splice(index, 1);

    this._notify(updateType);
  }
}
