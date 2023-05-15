import EditPointView from '../view/edit-point-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import { render, replace } from '../framework/render.js';

export default class PointsPresenter {
  #sortComponent = new SortView();
  #listComponent = new ListView();
  #bodyContainer;
  #pointsModel;
  #pointsContainer;

  constructor({ bodyContainer, pointsModel }) {
    this.#bodyContainer = bodyContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#pointsContainer = [...this.#pointsModel.points];
    this.#renderBoard();
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      evt.preventDefault();
      if (evt.key === 'Escape') {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new EditPointView({
      point,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onRollupClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#listComponent.element);
  }

  #renderBoard() {
    render(this.#sortComponent, this.#bodyContainer);
    render(this.#listComponent, this.#bodyContainer);

    this.#pointsContainer.forEach((point) => this.#renderPoint(point));
  }
}
