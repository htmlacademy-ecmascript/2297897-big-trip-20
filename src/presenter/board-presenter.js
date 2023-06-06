import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import { RenderPosition, render, remove } from '../framework/render.js';
import { sortDay, sortTime, sortPrice } from '../utils.js';
import PointPresenter from './point-presenter.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { filter } from '../filter.js';
import NoPointsView from '../view/no-point-view.js';

export default class BoardPresenter {
  #sortComponent = null;
  #listComponent = new ListView();
  #noPointsComponent = null;
  #bodyContainer = null;

  #pointsModel = null;
  #filtersModel = null;

  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor({ bodyContainer, pointsModel, filtersModel}) {
    this.#bodyContainer = bodyContainer;
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filtersModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortDay);
      case SortType.TIME:
        return filteredPoints.sort(sortTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPrice);
    }
    return filteredPoints;
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
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#bodyContainer, RenderPosition.AFTERBEGIN);
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;

    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #renderPoint(point) {
    const pointComponentPresenter = new PointPresenter({
      pointsListContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      point: point
    });
    this.#pointPresenters.set(point.id, pointComponentPresenter);
  }

  #renderNoPoints() {
    this.#noPointsComponent = new NoPointsView ({
      filterType: this.#filterType
    });

    render(this.#noPointsComponent, this.#bodyContainer, RenderPosition.AFTERBEGIN);
  }

  #clearBoard({resetSortType = false } = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);

    if(this.#noPointsComponent){
      remove(this.#noPointsComponent);
    }

    if(resetSortType){
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderBoard() {
    render(this.#listComponent, this.#bodyContainer);

    const points = this.points;
    const pointsCount = points.length;

    if (pointsCount === 0){
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.points.forEach((point) => this.#renderPoint(point));
  }
}
