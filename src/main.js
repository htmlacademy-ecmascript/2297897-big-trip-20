import BoardPresenter from './presenter/board-presenter.js';
import PointInfoView from './view/point-info-view.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filters-model.js';
import PointsApiService from './points-api-service.js';
import { render, RenderPosition } from './framework/render.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';

const AUTHORIZATION = 'Basic sw56dfnj32welrjf';
const END_POINT = 'https://20.ecmascript.pages.academy/big-trip';

const tripMainElement = document.querySelector('.trip-main');
const filtersControlsElement = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const filtersModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  bodyContainer: tripEventsContainer,
  pointsModel,
  filtersModel,
  onNewPointDestroy: handleNewPointFormClose
});

const filtersPresenter = new FiltersPresenter({
  filterContainer: filtersControlsElement,
  filtersModel,
  pointsModel,
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose(){
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick(){
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

render(newPointButtonComponent, tripMainElement);
render(new PointInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);

filtersPresenter.init();
boardPresenter.init();
