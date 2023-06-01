import ListView from '../view/list-view.js';
import SortView, { SortType } from '../view/sort-view.js';
import { RenderPosition, render } from '../framework/render.js';
import { sortDay, sortTime, sortPrice } from '../utils.js';
import PointPresenter from './point-presenter.js';

export default class PointsPresenter {
  #sortComponent = null;
  #listComponent = new ListView();
  #bodyContainer = null;
  #pointsModel = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;


  constructor({ bodyContainer, pointsModel }) {
    this.#bodyContainer = bodyContainer;
    this.#pointsModel = pointsModel;
  }

  get points() {
    switch(this.#currentSortType){
      case SortType.DAY:
        return [...this.#pointsModel.points].sort(sortDay);
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortTime);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPrice);
    }
    return this.#pointsModel.points;
  }

  init() {
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderPointList();
  };

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPointList() {
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#bodyContainer, RenderPosition.AFTERBEGIN);
  }

  #handlePointChange = (updatedPoint) => {
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #renderPoint(point) {
    const pointComponentPresenter = new PointPresenter({
      pointsListContainer: this.#listComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
      point: point
    });
    this.#pointPresenters.set(point.id, pointComponentPresenter);
  }

  #renderBoard() {
    render(this.#listComponent, this.#bodyContainer);
    this.#renderSort();
    this.#renderPointList();
  }
}
