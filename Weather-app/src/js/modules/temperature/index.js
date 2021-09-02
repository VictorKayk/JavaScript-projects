import { getRequest, getCurrentLocation, putCurrentTemperature } from '../util/common.js';
import putWeatherForecast from './weather-forecast-5days.js';
import putHighlights from './highlights.js';
import { getHistoryOfCities, putCityOnHistory, getCityInfosOfAHistory } from './history.js';

// Conteiners
const searchInput = document.body.querySelector('#search-input');

function getUrlToCurrentLocation() {
  const user = JSON.parse(localStorage.user);
  const { lat, lon } = user;
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt_br&appid=8a1b6c8a637eee68a8dc5da6a90c3bcd`;
}

export async function currentTemperature() {
  const url = getUrlToCurrentLocation();
  const { results } = await getRequest(url);
  putCurrentTemperature(results);
}

function getUserInfo() {
  localStorage.user = localStorage.user || JSON.stringify({ history: { } });
}

export async function initialConfig() {
  getUserInfo();
  getCurrentLocation();
  // getHistoryOfCities();
  const url = getUrlToCurrentLocation();
  const results = await getRequest(url);
  console.log(results);
  putCurrentTemperature(results);
  //   putWeatherForecast(results);
  putHighlights(results);
}

export function search(e) {
  e.preventDefault();
  const { value } = searchInput;
  if (value.trim()) {
    putCityOnHistory(value.trim());
    getCityInfosOfAHistory(value.trim());
    getHistoryOfCities();
  }
}

export function getCityOfHistory(target) {
  const city = target.querySelector('.city').innerText;
  getCityInfosOfAHistory(city);
}
