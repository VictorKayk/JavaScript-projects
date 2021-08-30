import { convertTemperature, getAmericaDateFormat } from '../util/common.js';

// Conteiners
const temperature = document.body.querySelector('#current-temperature .temperature');
const weatherDescription = document.body.querySelector('#current-temperature .weather-description');
const weatherImg = document.body.querySelector('#current > img');
const dateConteiner = document.body.querySelector('#date');
const cityConteiner = document.body.querySelector('#city');

export function putWeatherImgOnConteiner(description) {
  const weatherImgSrc = '../assets/img/icons/description.png';
  weatherImg.setAttribute('src', weatherImgSrc.replace('description', description));
  weatherImg.setAttribute('alt', description);
}

export function putDateOnConteiner(date) {
  const newDate = getAmericaDateFormat(date);
  const newDateFormated = new Date(newDate).toLocaleDateString('pt-br', {
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'medium',
  });
  dateConteiner.innerText = newDateFormated;
}

export function getTemperature(temp) {
  const newTemp = convertTemperature(temp);
  temperature.innerText = newTemp;
}

export function putDescription(desc) {
  weatherDescription.innerText = desc;
}

export function putCityOnConteiner(city) {
  cityConteiner.innerText = city;
}
