import { render, RenderPosition } from './render.js';
import FiltersView from './view/filters-view.js';
import PointsPresenter from './presenter/points-presenter.js';
import PointInfoView from './view/point-info-view.js';

const tripMainElement = document.querySelector('.trip-main');
const filtersControlsElement = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const pointsPresenter = new PointsPresenter({bodyContainer: tripEventsContainer});

render (new PointInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), filtersControlsElement);

pointsPresenter.init();
