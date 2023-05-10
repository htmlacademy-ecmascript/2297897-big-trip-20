import EditPointView from '../view/edit-point-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';

export default class PointsPresenter {
  sortComponent = new SortView();
  listComponent = new ListView();

  constructor({ bodyContainer, pointsModel }) {
    this.bodyContainer = bodyContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.pointsContainer = [...this.pointsModel.getPoint()];

    render(this.sortComponent, this.bodyContainer);
    render(this.listComponent, this.bodyContainer);

    render(new EditPointView({point: this.pointsContainer}), this.listComponent.getElement());

    for (let i = 0; i < this.pointsContainer.length; i++) {
      render(new PointView({point: this.pointsContainer[i]}), this.listComponent.getElement());
    }
  }
}
