import ApiService from './framework/api-service.js';

const Method = {
  PUT: 'PUT',
  GET: 'GET'
};

export default class PointsApiService extends ApiService {
  get points (){
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(point) {
    const adaptedPoint = {
      ...point,
      'type': point.eventType,
      'destination': point.cityName,
      'base_price': point.basePrice,
      'date_from': point.dateFrom,
      'date_to': point.dateTo,
      'is_faforite': point.isFavorite,
    };

    delete point.eventType;
    delete point.cityName;
    delete point.basePrice;
    delete point.dateFrom;
    delete point.dateTo;
    delete point.isFavorite;

    return adaptedPoint;
  }
}
