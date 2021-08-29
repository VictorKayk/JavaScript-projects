import { getRequest } from '../util/common.js';

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

export default async function getCurrentLocation() {
  const { results: { temp, description, date, city } } = await getRequest('https://api.hgbrasil.com/weather?format=json-cors&key=9fc46912&user_ip=remote');

  temperature.innerText = temp;
  weatherDescription.innerText = description;
  cityConteiner.innerText = city;
  putWeatherImgOnConteiner(description);
  putDateOnConteiner(date);
}
