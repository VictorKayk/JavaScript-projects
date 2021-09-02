import { getTemperature, putDescription, putCityOnConteiner, putDateOnConteiner } from '../temperature/current-temperature.js';

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

export async function putCurrentTemperature({ temp, name, weather }) {
  const newTemp = getNewTemp(temp);
  getTemperature(newTemp);
  putDescription(weather[0].description);
  putCityOnConteiner(name);
  putWeatherImgOnConteiner(weatherImg)(weather[0].main);
  putDateOnConteiner();
}
