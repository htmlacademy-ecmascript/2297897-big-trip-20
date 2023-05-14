import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view.js';

function createEditPointTemplate(point) {
  const currentPoint = point;
  const { description, photos, eventType, eventTypeName, dateFrom, dateTo, cityName } = currentPoint;
  const { offerName, offerPrices } = currentPoint.offers;

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-eventType-toggle-1">
          <span class="visually-hidden">Choose event eventType</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event eventType icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-eventType-toggle-1" eventType="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event eventType</legend>

            <div class="event__type-item">
              <input id="event-eventType-taxi-1" class="event__type-input  visually-hidden" eventType="radio" eventTypeName="event-eventType" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-eventType-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-eventType-bus-1" class="event__type-input  visually-hidden" eventType="radio" eventTypeName="event-eventType" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-eventType-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-eventType-train-1" class="event__type-input  visually-hidden" eventType="radio" eventTypeName="event-eventType" value="train">
              <label class="event__type-label  event__type-label--train" for="event-eventType-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-eventType-ship-1" class="event__type-input  visually-hidden" eventType="radio" eventTypeName="event-eventType" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-eventType-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-eventType-drive-1" class="event__type-input  visually-hidden" eventType="radio" eventTypeName="event-eventType" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-eventType-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-eventType-flight-1" class="event__type-input  visually-hidden" eventType="radio" eventTypeName="event-eventType" value="flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-eventType-flight-1">Flight</label>
            </div>

            <div class="event__type-item">
              <input id="event-eventType-check-in-1" class="event__type-input  visually-hidden" eventType="radio" eventTypeName="event-eventType" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-eventType-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-eventType-sightseeing-1" class="event__type-input  visually-hidden" eventType="radio" eventTypeName="event-eventType" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-eventType-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-eventType-restaurant-1" class="event__type-input  visually-hidden" eventType="radio" eventTypeName="event-eventType" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-eventType-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${eventTypeName}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" eventType="text" eventTypeName="event-destination" value="${cityName}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" eventType="text" eventTypeName="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" eventType="text" eventTypeName="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden"></span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" eventType="text" eventTypeName="event-price" value="160">
      </div>

      <button class="event__save-btn  btn  btn--blue" eventType="submit">Save</button>
      <button class="event__reset-btn" eventType="reset">Delete</button>
      <button class="event__rollup-btn" eventType="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" eventType="checkbox" eventTypeName="event-offer-luggage" checked>
            <label class="event__offer-label" for="event-offer-luggage-1">
              <span class="event__offer-title">${offerName} ${eventTypeName}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offerPrices[0]}</span>
            </label>
          </div>
        </div>
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

export default class EditPointView extends AbstractView {
  #point;
  #handlerFormSubmit;
  #handlerRollupClick;

  constructor({ point, onFormSubmit, onRollupClick }) {
    super();
    this.#point = point;
    this.#handlerFormSubmit = onFormSubmit;
    this.#handlerRollupClick = onRollupClick;

    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupClickHandler);
  }

  get template() {
    return createEditPointTemplate(this.#point);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handlerFormSubmit();
  };

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handlerRollupClick();
  };
}
