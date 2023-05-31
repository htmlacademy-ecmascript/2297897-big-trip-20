import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { citiesDatalistElement, citiesInformation, OFFERS } from '../mock/point.js';
import { getCityInfo } from '../utils.js';

const createOffersListTemplate = (point) => OFFERS.map((offer) => {
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

function createEditPointTemplate(point) {
  const { description, photos, eventType, eventTypeLabel, dateFrom, dateTo, cityName, basePrice, availableOffers } = point;
  const offersTemplate = availableOffers.length !== 0 ? createOffersTemplate(point) : '';
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

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${eventTypeLabel}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${cityName}" list="destination-list-1" autocomplete="off">
        <datalist id="destination-list-1">
          ${citiesDatalistElement}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden"></span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
          ${offersTemplate}
      </section>
      <section class="event__details">
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            <img class="event__photo" src="${photos}" alt="Event photo">
          </div>
        </div>
      </section>
    </section>
  </form>
</li>`;
}

export default class EditPointView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleRollupClick = null;

  constructor({ point, onFormSubmit, onRollupClick }) {
    super();

    this._setState(EditPointView.parsePointToState(point), {
      availableOffers: []
    });

    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupClick = onRollupClick;

    this.#updateAvailableOffers();
    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state);
  }

  reset(point) {
    this.updateElement(
      EditPointView.parsePointToState(point)
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupClickHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('click', this.#eventTypeClickHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    if (this._state.availableOffers.length !== 0) {
      this.element.querySelector('.event__section--offers')
        .addEventListener('change', this.#offerChangeHandler);
    }
  }

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

  #eventTypeClickHandler = (evt) => {
    evt.preventDefault();
    const newEventType = evt.target.innerHTML.toLowerCase();
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
