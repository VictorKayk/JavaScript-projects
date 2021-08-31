import { getTemperature, putDescription, putCityOnConteiner, putDateOnConteiner } from '../temperature/current-temperature.js';
import { putCityOnHistory } from '../temperature/history.js';

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
  return user.temperatureScale === 'fahrenheit' ? (temp * 1.8) + 32 : temp;
}

export function getAmericaDateFormat(date) {
  const newDate = date.split('/');
  return `${newDate[2]}/${newDate[1]}/${newDate[0]}`;
}

export function putWeatherImgOnConteiner(conteiner) {
  const weatherImgSrc = '../assets/img/icons/description.png';
  return (desc) => {
    const newDesc = desc.toLowerCase().replace(' ', '_');
    conteiner.setAttribute('src', weatherImgSrc.replace('description', newDesc));
    conteiner.setAttribute('alt', desc);
  };
}

export async function putCurrentTemperature({ temp, description, date, city }) {
  getTemperature(temp);
  putDescription(description);
  putCityOnConteiner(city);
  putCityOnHistory(city);
  putDateOnConteiner(date);
}
