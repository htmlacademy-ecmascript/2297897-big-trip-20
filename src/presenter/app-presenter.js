import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../framework/render.js';
import PointPresenter from './point-presenter.js';

export default class PointsPresenter {
  #sortComponent = new SortView();
  #listComponent = new ListView();
  #bodyContainer = null;
  #pointsModel = null;
  #pointsContainer = null;

  constructor({ bodyContainer, pointsModel }) {
    this.#bodyContainer = bodyContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#pointsContainer = [...this.#pointsModel.points];
    this.#renderBoard();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#listComponent.element,
    });
    pointPresenter.init(point);
  }

  #renderBoard() {
    render(this.#sortComponent, this.#bodyContainer);
    render(this.#listComponent, this.#bodyContainer);

    this.#pointsContainer.forEach((point) => this.#renderPoint(point));
  }
}
