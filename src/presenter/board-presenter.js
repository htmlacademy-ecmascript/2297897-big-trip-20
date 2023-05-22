import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../framework/render.js';
import { updateItem } from '../utils.js';
import PointPresenter from './point-presenter.js';

export default class PointsPresenter {
  #sortComponent = new SortView();
  #listComponent = new ListView();
  #bodyContainer = null;
  #boardPoints = [];
  #pointsModel = null;
  #pointsContainer = null;
  #pointPresenters = new Map();

  constructor({ bodyContainer, pointsModel }) {
    this.#bodyContainer = bodyContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#pointsContainer = [...this.#pointsModel.points];
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#listComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderBoard() {
    render(this.#sortComponent, this.#bodyContainer);
    render(this.#listComponent, this.#bodyContainer);

    this.#pointsContainer.forEach((point) => this.#renderPoint(point));
  }
}
