import PointsPresenter from './presenter/board-presenter.js';
import PointInfoView from './view/point-info-view.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filters-model.js';
import { render, RenderPosition } from './framework/render.js';
import FiltersPresenter from './presenter/filters-presenter.js';

const tripMainElement = document.querySelector('.trip-main');
const filtersControlsElement = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const filtersModel = new FilterModel();

const pointsPresenter = new PointsPresenter({
  bodyContainer: tripEventsContainer,
  pointsModel
});

const filtersPresenter = new FiltersPresenter({
  filterContainer: filtersControlsElement,
  filtersModel,
  pointsModel,
});

render(new PointInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);

filtersPresenter.init();
pointsPresenter.init();
