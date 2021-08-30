// Conteiner
const convertButtons = document.body.querySelectorAll('#convert-temperature button');
const scales = document.body.querySelectorAll('.scale');
const temperatures = document.body.querySelectorAll('.temp');

export function convertTemperature(temp) {
  return localStorage.temperatureScale === 'fahrenheit' ? (temp * 1.8) + 32 : temp;
}

function convertAllTemperature() {
  temperatures.forEach((el) => {
    if (localStorage.temperatureScale === 'fahrenheit') el.innerText = (Number(el.innerText) * 1.8) + 32;
    else el.innerText = Math.round((Number(el.innerText) - 32) / 1.8);
  });
}

function putTheTemperatureScale() {
  scales.forEach((el) => {
    if (localStorage.temperatureScale === 'fahrenheit') el.innerText = '°F';
    else el.innerText = '°c';
  });
}

export function switchTemperatureScale() {
  convertButtons.forEach((el) => {
    el.classList.toggle('show');
    if (!el.classList.contains('show')) localStorage.temperatureScale = el.id;
  });
  putTheTemperatureScale();
  convertAllTemperature();
}

function defineTemperatureScale() {
  localStorage.temperatureScale = localStorage.temperatureScale || 'celcius';
}

export function getTemperatureScale() {
  defineTemperatureScale();
  convertButtons.forEach((el) => {
    el.classList.remove('show');
    if (!(localStorage.temperatureScale === el.id)) el.classList.add('show');
  });
  putTheTemperatureScale();
}
