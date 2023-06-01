import Observable from '../framework/observable.js';
import { generatePoint } from '../mock/point.js';

const AMOUNT_OF_POINTS = 5;

export default class PointsModel extends Observable {
  #points = Array.from({length: AMOUNT_OF_POINTS}, generatePoint);

  get points(){
    return this.#points;
  }

  updateTasks(updateType, update) {
    const index = this.#points.findIndex(
      (task) => task.id === update.id
    );

    if (index === -1) {
      throw new Error ('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points.unshift(update);

    this._notify(updateType, update);
  }

  deletePoint(updateType, update){
    const index = this.#points.findIndex(
      (task) => task.id === update.id
    );

    if (index === -1) {
      throw new Error ('Can\'t update unexisting point');
    }

    this.#points.splice(index, 1);

    this._notify(updateType);
  }
}
