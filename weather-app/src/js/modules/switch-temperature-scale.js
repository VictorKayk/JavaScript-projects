// Conteiner
const convertButtons = document.body.querySelectorAll('#convert-temperature button');
const scales = document.body.querySelectorAll('.scale');
const temperatures = document.body.querySelectorAll('.temp');

function convertAllTemperature() {
  const user = JSON.parse(localStorage.user);
  temperatures.forEach((el) => {
    if (user.temperatureScale === 'fahrenheit') el.innerText = ((Number(el.innerText) * 1.8) + 32).toFixed(1);
    else el.innerText = ((Number(el.innerText) - 32) / 1.8).toFixed(1);
  });
}

function putTheTemperatureScale() {
  const user = JSON.parse(localStorage.user);
  scales.forEach((el) => {
    if (user.temperatureScale === 'fahrenheit') el.innerText = '°F';
    else el.innerText = '°c';
  });
}

export function switchTemperatureScale() {
  const user = JSON.parse(localStorage.user);
  convertButtons.forEach((el) => {
    el.classList.toggle('show');
    if (!el.classList.contains('show')) user.temperatureScale = el.id;
    localStorage.user = JSON.stringify(user);
  });
  putTheTemperatureScale();
  convertAllTemperature();
}

function defineTemperatureScale() {
  const user = JSON.parse(localStorage.user);
  user.temperatureScale = user.temperatureScale || 'celcius';
  localStorage.user = JSON.stringify(user);
}

export function getTemperatureScale() {
  defineTemperatureScale();
  const user = JSON.parse(localStorage.user);
  convertButtons.forEach((el) => {
    el.classList.remove('show');
    if (!(user.temperatureScale === el.id)) el.classList.add('show');
  });
  putTheTemperatureScale();
}
