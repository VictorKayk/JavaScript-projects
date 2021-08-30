import { getRequest, getCurrentLocation } from '../util/common.js';
import { getTemperature, putDescription, putCityOnConteiner, putDateOnConteiner } from './current-temperature.js';
import putWeatherForecast from './weather-forecast-5days.js';
import putHighlights from './highlights.js';

function getUrlToCurrentLocation() {
  const user = JSON.parse(localStorage.user);
  const { lat, lon } = user;
  return `https://api.hgbrasil.com/weather?format=json-cors&key=9fc46912&lat=${lat}&lon=${lon}&user_ip=remote`;
}

async function putCurrentTemperature({ temp, description, date, city }) {
  getTemperature(temp);
  putDescription(description);
  putCityOnConteiner(city);
  putDateOnConteiner(date);
}

export async function currentTemperature() {
  const url = getUrlToCurrentLocation();
  const { results } = await getRequest(url);
  putCurrentTemperature(results);
}

function getUserInfo() {
  localStorage.user = localStorage.user || JSON.stringify({ });
}

export async function initialConfig() {
  getUserInfo();
  getCurrentLocation();
  const url = getUrlToCurrentLocation();
  const { results } = await getRequest(url);
  putCurrentTemperature(results);
  putWeatherForecast(results);
  putHighlights(results);
}
