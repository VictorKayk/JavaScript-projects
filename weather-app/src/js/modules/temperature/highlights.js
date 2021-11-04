import { getNewTemp, convertTemperature } from '../util/common.js';

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
  const newTemp = convertTemperature(newFeels);
  feelsLikeConteiner.innerText = `${newTemp}`;
  // feelsLikeMeasrue.innerText = '°c';
}

function putvisibility(visibility) {
  visibilityConteiner.innerText = `${Math.trunc(visibility) / 1000}`;
  visibilityMeasrue.innerText = 'Km/h';
}

export default function putHighlights({ wind_speed, humidity, feels_like, visibility }) {
  putWindSpeed(wind_speed);
  putHumidity(humidity);
  putFeelsLike(feels_like);
  putvisibility(visibility);
}
