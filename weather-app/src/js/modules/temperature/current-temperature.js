import { convertTemperature } from '../util/common.js';

// Conteiners
const temperature = document.body.querySelector('#current-temperature .temperature');
const weatherDescription = document.body.querySelector('#current-temperature .weather-description');
const dateConteiner = document.body.querySelector('#date');
const cityConteiner = document.body.querySelector('#city');

export function putDateOnConteiner() {
  const newDateFormated = new Date().toLocaleDateString('pt-br', {
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'medium',
  });
  dateConteiner.innerText = `${newDateFormated}`;
}

export function getTemperature(temp) {
  const newTemp = convertTemperature(temp);
  temperature.innerText = `${newTemp}`;
}

export function putDescription(desc) {
  weatherDescription.innerText = `${desc}`;
}

export function putCity(city) {
  cityConteiner.innerText = `${city}`;
}
