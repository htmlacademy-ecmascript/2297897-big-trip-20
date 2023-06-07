import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { citiesDatalistElement, citiesInformation, OFFERS } from '../mock/point.js';
import { getCityInfo, toUpperCaseFirstLetter } from '../utils.js';
import flatpickr from 'flatpickr';
import { TYPES } from '../const.js';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css';

const BLANK_POINT = {
  eventType: 'flight',
  eventTypeLabel: 'Flight',
  dateFrom: '',
  dateTo: '',
  cityName: '',
  basePrice: 0,
  offers: []
};

const createOffersListTemplate = (point = BLANK_POINT) => OFFERS.map((offer) => {
  if (offer.suitablePointTypes.includes(point.eventType)) {
    const checked = point.offers.some((element) => element.type === offer.type) ? 'checked' : '';
    return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden"
      id="event-offer-${offer.type}"
      type="checkbox"
      name="event-offer-${offer.type}"
      value="${offer.type}"
      ${checked}>
      <label class="event__offer-label" for="event-offer-${offer.type}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>
    `;
  }
}
).join('');

const createOffersTemplate = (point) => {
  const offersListTemplate = createOffersListTemplate(point);
  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersListTemplate}
      </div>
    </section>
  `;
};

const createDestinationTemplate = (point) => {
  const {description, photos} = point;
  return `<section class="event__details">
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            <img class="event__photo" src="${photos}" alt="Event photo">
          </div>
        </div>
      </section>
    </section>`;
};

const createEventTypesTemplate = (currentType) =>
  TYPES.map(
    (eventType) => `<div class="event__type-item">
    <input
    id="event-type-${eventType}"
    class="event__type-input  visually-hidden"
    type="radio"
    name="event-type"
    value="${eventType}"
    ${eventType === currentType ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}">
    ${toUpperCaseFirstLetter(eventType)}
    </label>
  </div>`
  ).join('');


function createEditPointTemplate(point) {
  const { eventType, eventTypeLabel, dateFrom, dateTo, cityName, basePrice, availableOffers } = point;
  const offersTemplate = availableOffers.length !== 0 ? createOffersTemplate(point) : '';
  const destinationTemplate = cityName !== '' ? createDestinationTemplate(point) : '';
  const eventTypesTemplate = createEventTypesTemplate(eventType);
  const isNewPoint = !point.id;
  const templateButtons = isNewPoint
    ? '<button class="event__reset-btn" type="reset">Cancel</button>'
    : '<button class="event__reset-btn" type="reset">Delete</button> \n <button class="event__rollup-btn" type="button">';

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${eventTypesTemplate}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${eventTypeLabel}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${cityName}" list="destination-list-1" autocomplete="off" required>
        <datalist id="destination-list-1">
          ${citiesDatalistElement}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${ dateFrom ? dayjs(dateFrom).format('DD/MM/YY HH:mm') : ''}" required>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${ dateTo ? dayjs(dateTo).format('DD/MM/YY HH:mm') : ''}" required>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden"></span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      ${templateButtons}

        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
          ${offersTemplate}
      </section>
    ${destinationTemplate};
  </form>
</li>`;
}

export default class EditPointView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleRollupClick = null;
  #handleDeleteClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({ point = BLANK_POINT, onFormSubmit, onRollupClick, onDeleteClick }) {
    super();

    this._setState(EditPointView.parsePointToState(point), {
      availableOffers: []
    });

    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupClick = onRollupClick;
    this.#handleDeleteClick = onDeleteClick;

    this.#updateAvailableOffers();
    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      EditPointView.parsePointToState(point)
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    const rollUpButton = this.element.querySelector('.event__rollup-btn');
    if(rollUpButton){
      rollUpButton.addEventListener('click', this.#rollupClickHandler);
    }
    this.element.querySelector('.event__type-group')
      .addEventListener('click', this.#eventTypeClickHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#priceChangeHandler);
    if (this._state.availableOffers.length !== 0) {
      this.element.querySelector('.event__section--offers')
        .addEventListener('change', this.#offerChangeHandler);
    }
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#deleteClickHandler);

    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  #setDatepickerFrom() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y H:i',
        maxDate: this._state.dateTo,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
        allowInput:true
      }
    );
  }

  #setDatepickerTo() {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y H:i',
        minDate: this._state.dateFrom,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
        allowInput:true
      }
    );
  }

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #updateAvailableOffers() {
    const availableOffers = OFFERS.filter((offer) =>
      offer.suitablePointTypes.includes(this._state.eventType)
    );
    this._setState({ availableOffers });

    return availableOffers;
  }

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };

  #destinationChangeHandler = (evt) => {

    const newCityName = evt.target.value;
    const currentCityInfo = getCityInfo(newCityName, citiesInformation);
    if (currentCityInfo === undefined) {
      return;
    }

    this.updateElement({
      cityName: currentCityInfo.cityName,
      description: currentCityInfo.description,
      photos: currentCityInfo.photos
    });
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointView.parseStateToPoint(this._state));
  };

  #eventTypeClickHandler = (evt) => {
    evt.preventDefault();
    const newEventType = evt.target.innerHTML.toLowerCase().trim();
    const offers = [];
    this._setState({ eventType: newEventType });
    const availableOffers = this.#updateAvailableOffers();
    this.updateElement(
      {
        eventType: newEventType.toLowerCase(),
        eventTypeLabel: newEventType,
        offers,
        availableOffers
      }
    );
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    if (!evt.target.classList.contains('event__offer-checkbox') /* !== 'event__offer-checkbox'*/) {
      return;
    }
    const offerType = evt.target.value;
    const isChecked = evt.target.checked;
    const offers = this._state.offers;
    if (isChecked) {
      offers.push(
        OFFERS.find((offer) => offer.type === offerType)
      );
    } else {
      const element = offers.find((offer) => offer.type === offerType);
      const index = offers.indexOf(element);
      offers.splice(index, 1);
    }
    this._setState({ offers });
  };

  static parsePointToState = (point) => ({ ...point });

  static parseStateToPoint = (state) => {
    const point = { ...state };
    return point;
  };
}
