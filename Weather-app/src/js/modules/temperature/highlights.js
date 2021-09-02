import { getNewTemp } from '../util/common.js';

// Conteiners
const windSpeed = document.body.querySelector('#wind-speed');
const windMeasrue = document.body.querySelector('#wind-speed ~ .measure');
const humidityConteiner = document.body.querySelector('#humidity');
const progress = document.body.querySelector('#progress');
const feelsLikeConteiner = document.body.querySelector('#feels-like');
const feelsLikeMeasrue = document.body.querySelector('#feels-like ~ .measure');
const visibilityConteiner = document.body.querySelector('#visibility');
const visibilityMeasrue = document.body.querySelector('#visibility ~ .measure');

function putWindSpeed(speed) {
  windSpeed.innerText = `${speed}`;
  windMeasrue.innerText = 'Km/h';
}

function putHumidity(humidity) {
  humidityConteiner.innerText = humidity;
  progress.setAttribute('value', humidity);
}

function putFeelsLike(feelsLike) {
  const newFeels = getNewTemp(feelsLike);
  feelsLikeConteiner.innerText = `${newFeels}`;
  feelsLikeMeasrue.innerText = '°c';
}

function putvisibility(visibility) {
  visibilityConteiner.innerText = `${Math.trunc(visibility) / 1000}`;
  visibilityMeasrue.innerText = 'Km/h';
}

export default function putHighlights({ wind: { speed }, main: { humidity, feels_like }, visibility }) {
  putWindSpeed(speed);
  putHumidity(humidity);
  putFeelsLike(feels_like);
  putvisibility(visibility);
}
