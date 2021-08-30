import { getRequest, getCurrentLocation } from '../util/common.js';
import { getTemperature, putDescription, putCityOnConteiner, putWeatherImgOnConteiner, putDateOnConteiner } from './current-temperature.js';

function getUrlToCurrentLocation() {
  const { lat, lon } = localStorage;
  return `https://api.hgbrasil.com/weather?format=json-cors&key=9fc46912&lat=${lat}&lon=${lon}&user_ip=remote`;
}

async function putCurrentTemperature({ temp, description, date, city }) {
  getTemperature(temp);
  putDescription(description);
  putCityOnConteiner(city);
  putWeatherImgOnConteiner(description);
  putDateOnConteiner(date);
}

export async function currentTemperature() {
  const url = getUrlToCurrentLocation();
  const { results } = await getRequest(url);
  putCurrentTemperature(results);
}

export async function initialConfig() {
  getCurrentLocation();
  currentTemperature();
}
