import { putWeatherImgOnConteiner, convertTemperature, getNewTemp } from '../util/common.js';

// Conteiners
const days = document.body.querySelectorAll('.day');
const weatherImgs = document.body.querySelectorAll('.weather-img-next5days');
const maxTemps = document.body.querySelectorAll('.max-temp .temp');
const minTemps = document.body.querySelectorAll('.min-temp .temp');

function getNext5Days(forecast) {
  return forecast.slice(1, 6);
}

function putDate(index) {
  const newDateFormated = new Date(Date.now() + (index + 1) * 86400000).toLocaleDateString('pt-br', {
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'medium',
  });
  if (index !== 0) days[index].innerText = `${newDateFormated}`;
}

function putDescription(index) {
  return (desc) => {
    putWeatherImgOnConteiner(weatherImgs[index])(desc[0].main);
  };
}

function putMaxTemp(index) {
  return (max) => {
    const newTemp = getNewTemp(max);
    maxTemps[index].innerText = `${convertTemperature(newTemp)}`;
  };
}

function putMinTemp(index) {
  return (min) => {
    const newTemp = getNewTemp(min);
    minTemps[index].innerText = `${convertTemperature(newTemp)}`;
  };
}

export default function putWeatherForecast(list) {
  const next5Days = getNext5Days(list);
  next5Days.forEach(({ temp: { max, min }, weather }, index) => {
    putDate(index);
    putDescription(index)(weather);
    putMaxTemp(index)(max);
    putMinTemp(index)(min);
  });
}
