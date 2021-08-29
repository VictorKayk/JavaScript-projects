import { switchTemperatureScale, getTemperatureScale } from './modules/switch-temperature-scale.js';
import { openSearchScreen, closeTheSearchScreen } from './modules/search-screen.js';

// Conteiners
const temperature = document.body.querySelector('#current-temperature .temperature');
const weatherDescription = document.body.querySelector('#current-temperature .weather-description');
const weatherImg = document.body.querySelector('#current > img');
const dateConteiner = document.body.querySelector('#date');
const cityConteiner = document.body.querySelector('#city');

(function () {
  getTemperatureScale();

  window.addEventListener('click', (e) => {
    const { target } = e;
    if (target.parentNode.id === 'convert-temperature') switchTemperatureScale();
    else if (target.id === 'search') openSearchScreen();
    else if (target.id === 'close') closeTheSearchScreen();
  });

  function getRequest(url) {
    const data = fetch(url);
    return data.then((e) => e.json());
  }

  function getAmericaDateFormat(date) {
    const newDate = date.split('/');
    return `${newDate[2]}/${newDate[1]}/${newDate[0]}`;
  }

  async function getCurrentLocation() {
    const { results: { temp, description, date, city } } = await getRequest('https://api.hgbrasil.com/weather?format=json-cors&key=9fc46912&user_ip=remote');

    temperature.innerText = temp;
    weatherDescription.innerText = description;

    const weatherImgSrc = '../assets/img/icons/description.png';
    weatherImg.setAttribute('src', weatherImgSrc.replace('description', description));
    weatherImg.setAttribute('alt', description);

    const newDate = getAmericaDateFormat(date);
    dateConteiner.innerText = new Date(newDate).toLocaleDateString('pt-br', {
      timeZone: 'America/Sao_Paulo',
      dateStyle: 'medium',
    });

    cityConteiner.innerText = city;
  }
  getCurrentLocation();
}());
