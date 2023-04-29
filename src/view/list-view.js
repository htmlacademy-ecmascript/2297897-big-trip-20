import { createElement } from '../render.js';

function createListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class ListView {
  getTemlate() {
    return createListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemlate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
