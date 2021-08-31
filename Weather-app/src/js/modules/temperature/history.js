import { getRequest, putCurrentTemperature } from '../util/common.js';
import putWeatherForecast from './weather-forecast-5days.js';
import putHighlights from './highlights.js';
import { closeTheSearchScreen } from '../search-screen.js';

// Conteiner
const history = document.querySelector('#history');

export function putCityOnHistory(city) {
  const user = JSON.parse(localStorage.user);
  user.history[city] = city;
  localStorage.user = JSON.stringify(user);
}

function createCityConteiner(city) {
  const cityConteiner = document.createElement('span');
  cityConteiner.classList.add('city');
  cityConteiner.innerText = city;
  return cityConteiner;
}

function createArrowSymbol() {
  const arrowSymbol = document.createElement('span');
  arrowSymbol.classList.add('material-icons');
  arrowSymbol.innerText = 'chevron_right';
  return arrowSymbol;
}

function createCityElement(city) {
  const li = document.createElement('li');
  li.classList.add('city-conteiner');
  const cityConteiner = createCityConteiner(city);
  const arrowSymbol = createArrowSymbol();
  li.appendChild(arrowSymbol);
  li.appendChild(cityConteiner);
  return li;
}

export function getHistoryOfCities() {
  const user = JSON.parse(localStorage.user);
  const cities = Object.keys(user.history);
  cities.forEach((city) => {
    const cityElement = createCityElement(city);
    history.appendChild(cityElement);
  });
}

function getUrlOfCity(city) {
  return `https://api.hgbrasil.com/weather?format=json-cors&key=9fc46912&city_name=${city}`;
}

export async function getCityInfosOfAHistory(city) {
  const url = getUrlOfCity(city);
  const { results } = await getRequest(url);
  putCurrentTemperature(results);
  putWeatherForecast(results);
  putHighlights(results);
  closeTheSearchScreen();
}
