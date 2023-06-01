import Observable from '../framework/observable.js';
import { generatePoint } from '../mock/point.js';

const AMOUNT_OF_POINTS = 5;

export default class PointsModel extends Observable {
  #points = Array.from({length: AMOUNT_OF_POINTS}, generatePoint);

  get points(){
    return this.#points;
  }
}
