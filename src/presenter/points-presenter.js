import EditPointView from '../view/edit-point-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';

const TASK_POINTS = 3;
export default class PointsPresenter {
  sortComponent = new SortView();
  listComponent = new ListView();

  constructor({ bodyContainer }) {
    this.bodyContainer = bodyContainer;
  }

  init() {
    render(this.sortComponent, this.bodyContainer);
    render(this.listComponent, this.bodyContainer);

    render(new EditPointView(), this.listComponent.getElement());

    for (let i = 0; i < TASK_POINTS; i++) {
      render(new PointView(), this.listComponent.getElement());
    }
  }
}
