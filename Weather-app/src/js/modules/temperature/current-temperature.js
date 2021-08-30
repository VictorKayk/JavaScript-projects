import { convertTemperature } from '../switch-temperature-scale.js';
import { getRequest, getCurrentLocation } from '../util/common.js';

// Conteiners
const temperature = document.body.querySelector('#current-temperature .temperature');
const weatherDescription = document.body.querySelector('#current-temperature .weather-description');
const weatherImg = document.body.querySelector('#current > img');
const dateConteiner = document.body.querySelector('#date');
const cityConteiner = document.body.querySelector('#city');

function putWeatherImgOnConteiner(description) {
  const weatherImgSrc = '../assets/img/icons/description.png';
  weatherImg.setAttribute('src', weatherImgSrc.replace('description', description));
  weatherImg.setAttribute('alt', description);
}

function getAmericaDateFormat(date) {
  const newDate = date.split('/');
  return `${newDate[2]}/${newDate[1]}/${newDate[0]}`;
}

function putDateOnConteiner(date) {
  const newDate = getAmericaDateFormat(date);
  const newDateFormated = new Date(newDate).toLocaleDateString('pt-br', {
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'medium',
  });
  dateConteiner.innerText = newDateFormated;
}

function getUrlToCurrentLocation(lat, lon) {
  return `https://api.hgbrasil.com/weather?format=json-cors&key=9fc46912&lat=${lat}&lon=${lon}&user_ip=remote`;
}

async function getCurrentTemperatureInfos() {
  getCurrentLocation();
  const { lat, lon } = localStorage;

  const url = getUrlToCurrentLocation(lat, lon);
  const { results: { temp, description, date, city } } = await getRequest(url);

  return { temp, description, date, city };
}

function getTemperature(temp) {
  const newTemp = convertTemperature(temp);
  temperature.innerText = newTemp;
}

export default async function getCurrentTemperatureLocation() {
  const { temp, description, date, city } = await getCurrentTemperatureInfos();

  getTemperature(temp);
  weatherDescription.innerText = description;
  cityConteiner.innerText = city;
  putWeatherImgOnConteiner(description);
  putDateOnConteiner(date);
}
