// Conteiners
const windSpeed = document.body.querySelector('#wind-speed');
const windMeasrue = document.body.querySelector('#wind-speed ~ .measure');
const humidityConteiner = document.body.querySelector('#humidity');
const progress = document.body.querySelector('#progress');
const sunriseConteiner = document.body.querySelector('#sunrise');
const sunsetConteiner = document.body.querySelector('#sunset');

function putWindSpeed(wind_speedy) {
  const newWindSpeed = wind_speedy.split(' ');
  windSpeed.innerText = `${newWindSpeed[0]}`;
  windMeasrue.innerText = `${newWindSpeed[1]}`;
}

function putHumidity(humidity) {
  humidityConteiner.innerText = humidity;
  progress.setAttribute('value', humidity);
}

function putSunrise(sunrise) {
  const newSunrise = sunrise.split(' ');
  sunriseConteiner.innerText = `${newSunrise[0]}`;
}

function putSunset(sunset) {
  const newSunset = sunset.split(' ');
  const hourSunset = newSunset[0].split(':');
  sunsetConteiner.innerText = `${Number(hourSunset[0]) + 12}:${hourSunset[1]}`;
}

export default function putHighlights({ wind_speedy, humidity, sunrise, sunset }) {
  putWindSpeed(wind_speedy);
  putHumidity(humidity);
  putSunrise(sunrise);
  putSunset(sunset);
}
