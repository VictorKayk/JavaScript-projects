import { getRequest, getCurrentLocation, putCurrentTemperature, getOneCallUrl } from '../util/common.js';
import putWeatherForecast from './weather-forecast-5days.js';
import putHighlights from './highlights.js';
import getCityInfosOfAHistory from './history.js';
import { putCity } from './current-temperature.js';

// Conteiners
const searchInput = document.body.querySelector('#search-input');

function getUserInfo() {
  localStorage.user = localStorage.user || JSON.stringify({ });
}

function getCityUrlUsingLatLon(lat, lon) {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt_br&appid=8a1b6c8a637eee68a8dc5da6a90c3bcd`;
}

async function putNameOfCityOnConteiner(lat, lon) {
  const newUrl = getCityUrlUsingLatLon(lat, lon);
  const { name } = await getRequest(newUrl);
  putCity(name);
}

async function putInfos() {
  const user = JSON.parse(localStorage.user);
  const { lat, lon } = user;
  const currentUrl = getOneCallUrl(lat, lon);
  const { current, daily } = await getRequest(currentUrl);
  putCurrentTemperature(current);
  putHighlights(current);
  putWeatherForecast(daily);
  putNameOfCityOnConteiner(lat, lon);
}

export function initialConfig() {
  getUserInfo();
  getCurrentLocation();
  putInfos();
}

export function search(e) {
  e.preventDefault();
  const { value } = searchInput;
  if (value.trim()) {
    getCityInfosOfAHistory(value.trim());
  }
}

export function getCityOfHistory(target) {
  const city = target.querySelector('.city').innerText;
  getCityInfosOfAHistory(city);
}
