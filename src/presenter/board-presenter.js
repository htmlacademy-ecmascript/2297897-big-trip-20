import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import { RenderPosition, render } from '../framework/render.js';
import { sortDay, sortTime, sortPrice } from '../utils.js';
import PointPresenter from './point-presenter.js';
import { SortType } from '../const.js';
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

    this.#pointsModel.addObserver(this.#handleModelEvent);
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

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    //Место для обновления модели
    // actionType - действие, которое приводит к пониманию, какой метод модели вызвать
    // updateType - тип изменений, который приводит к пониманию, что нужно обновить
    // update - непосредственно сами данные
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    //В зависимости от типа изменений решаем, что делать
    // обновить часть списка (пр. описание)
    // обновить сам список (пр. удалить задачу)
    // обновить всю доску (например, при переключении фильтра)
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

  #renderBoard() {
    render(this.#listComponent, this.#bodyContainer);
    this.#renderSort();
    this.#renderPointList();
  }
}
