import FiltersView from './view/filters-view.js';
import PointsPresenter from './presenter/board-presenter.js';
import PointInfoView from './view/point-info-view.js';
import PointsModel from './model/points-model.js';
import { render, RenderPosition } from './framework/render.js';

const tripMainElement = document.querySelector('.trip-main');
const filtersControlsElement = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const pointsPresenter = new PointsPresenter({
  bodyContainer: tripEventsContainer,
  pointsModel
});

render(new PointInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), filtersControlsElement);

pointsPresenter.init();
