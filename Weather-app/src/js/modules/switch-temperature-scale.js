// Conteiner
const convertButtons = document.body.querySelectorAll('#convert-temperature button');

export function switchTemperatureScale() {
  convertButtons.forEach((el) => {
    el.classList.toggle('show');
    if (el.classList.contains('show')) localStorage.temperatureScale = el.id;
  });
}

function defineTemperatureScale() {
  localStorage.temperatureScale = localStorage.temperatureScale || 'fahrenheit';
}

export function getTemperatureScale() {
  defineTemperatureScale();
  convertButtons.forEach((el) => {
    el.classList.remove('show');
    if (localStorage.temperatureScale === el.id) el.classList.add('show');
  });
}
