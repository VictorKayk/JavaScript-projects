import { getTemperature, putDescription, putDateOnConteiner } from '../temperature/current-temperature.js';

export function getRequest(url) {
  const data = fetch(url);
  return data.then((e) => e.json());
}

export function getCurrentLocation() {
  function geoSuccess(position) {
    const user = JSON.parse(localStorage.user);
    user.lat = position.coords.latitude;
    user.lon = position.coords.longitude;
    localStorage.user = JSON.stringify(user);
  }
  navigator.geolocation.getCurrentPosition(geoSuccess);
}

export function convertTemperature(temp) {
  const user = JSON.parse(localStorage.user);
  const fahrenheit = (temp * 1.8) + 32;
  return user.temperatureScale === 'fahrenheit' ? fahrenheit.toFixed(1) : temp.toFixed(1);
}

export function getAmericaDateFormat(date) {
  const newDate = date.split('/');
  return `${newDate[2]}/${newDate[1]}/${newDate[0]}`;
}

const weatherImg = document.body.querySelector('#current > img');

export function putWeatherImgOnConteiner(conteiner) {
  const weatherImgSrc = '../assets/img/icons/description.png';
  return (desc) => {
    const newDesc = desc.toLowerCase().replace(' ', '_');
    conteiner.setAttribute('src', weatherImgSrc.replace('description', newDesc));
    conteiner.setAttribute('alt', desc);
  };
}

export function getNewTemp(temp) {
  const newTemp = temp;
  return Math.trunc(newTemp) / 10;
}

export async function putCurrentTemperature({ temp, weather }) {
  const newTemp = getNewTemp(temp);
  getTemperature(newTemp);
  putDescription(weather[0].description);
  putWeatherImgOnConteiner(weatherImg)(weather[0].main);
  putDateOnConteiner();
}

export function getOneCallUrl(lat, lon) {
  if (lat && lon) return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=pt_br&exclude=hourly,minutely,alerts&appid=8a1b6c8a637eee68a8dc5da6a90c3bcd`;
  return 'https://api.openweathermap.org/data/2.5/onecall?lat=-14.2082651&lon=-41.6690871&lang=pt_br&exclude=hourly,minutely,alerts&appid=8a1b6c8a637eee68a8dc5da6a90c3bcd';
}
