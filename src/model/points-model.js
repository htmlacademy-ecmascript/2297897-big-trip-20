import { generatePoint } from '../mock/point.js';

const AMOUNT_OF_POINTS = 5;

export default class PointsModel {
  points = Array.from({length: AMOUNT_OF_POINTS}, generatePoint);

  get point(){
    return this.points;
  }
}
