import ListView from '../view/list-view.js';
import SortView, { SortType } from '../view/sort-view.js';
import { RenderPosition, render } from '../framework/render.js';
import { updateItem, sortDay, sortTime, sortPrice } from '../utils.js';
import PointPresenter from './point-presenter.js';

export default class PointsPresenter {
  #sortComponent = null;
  #listComponent = new ListView();
  #bodyContainer = null;
  #tripEvents = [];
  #sourcedTripEvents = [];
  #pointsModel = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;


  constructor({ bodyContainer, pointsModel }) {
    this.#bodyContainer = bodyContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripEvents = [...this.#pointsModel.points];
    this.#sourcedTripEvents = [...this.#pointsModel.points];
    this.#sortPoints(this.#currentSortType);
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#tripEvents.sort(sortDay);
        break;
      case SortType.TIME:
        this.#tripEvents.sort(sortTime);
        break;
      case SortType.PRICE:
        this.#tripEvents.sort(sortPrice);
        break;
      default:
        this.#tripEvents = [...this.#sourcedTripEvents];
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
  };

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPointList() {
    this.#tripEvents.forEach((point) => this.#renderPoint(point));
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#bodyContainer, RenderPosition.AFTERBEGIN);
  }

  #handlePointChange = (updatedPoint) => {
    this.#tripEvents = updateItem(this.#tripEvents, updatedPoint);
    this.#sourcedTripEvents = updateItem(this.#sourcedTripEvents, updatedPoint);
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
