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
    this.#offers = await this.#pointsApiService.offers;
    this.#destinations = await this.#pointsApiService.destinations;
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
    } catch (err){
      this.#points = [];
    }
    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, updateElement) {
    const index = this.#points.findIndex(
      (task) => task.id === updateElement.id
    );

    if (index === -1) {
      throw new Error ('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(updateElement);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1)
      ];
    } catch(err) {
      throw new Error('Can\'t update point');
    }

    this._notify(updateType, updateElement);
  }

  async addPoint(updateType, updateElement) {
    try{
      const response = await this.#pointsApiService.addPoint(updateElement);
      const newPoint = this.#adaptToClient(response);
      this.#points.unshift(newPoint);
      this._notify(updateType, updateElement);
    } catch(err) {
      throw new Error('Can\'t add task');
    }
  }

  async deletePoint(updateType, updateElement){
    const index = this.#points.findIndex(
      (point) => point.id === updateElement.id
    );

    if (index === -1) {
      throw new Error ('Can\'t update unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoint(updateElement);
      this.#points.splice(index, 1);
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete point');
    }
  }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      id: point['id'],
      eventType: point['type'],
      destinationId: point['destination'],
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
}
