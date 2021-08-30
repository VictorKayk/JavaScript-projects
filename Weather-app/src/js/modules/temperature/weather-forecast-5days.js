import { putWeatherImgOnConteiner, convertTemperature } from '../util/common.js';

// Conteiners
const days = document.body.querySelectorAll('.day');
const weatherImgs = document.body.querySelectorAll('.weather-img-next5days');
const maxTemps = document.body.querySelectorAll('.max-temp .temp');
const minTemps = document.body.querySelectorAll('.min-temp .temp');

function getNext5Days(forecast) {
  return forecast.slice(1, 6);
}

function putDate(index) {
  return (weekday, date) => {
    if (index !== 0) days[index].innerText = `${weekday}, ${date}.`;
  };
}

function putDescription(index) {
  return (desc) => {
    putWeatherImgOnConteiner(weatherImgs[index])(desc);
  };
}

function putMaxTemp(index) {
  return (max) => {
    maxTemps[index].innerText = `${convertTemperature(max)}`;
  };
}

function putMinTemp(index) {
  return (min) => {
    minTemps[index].innerText = `${convertTemperature(min)}`;
  };
}

export default function putWeatherForecast({ forecast }) {
  const next5Days = getNext5Days(forecast);
  next5Days.forEach(({ date, weekday, max, min, description }, index) => {
    putDate(index)(weekday, date);
    putDescription(index)(description);
    putMaxTemp(index)(max);
    putMinTemp(index)(min);
  });
}
