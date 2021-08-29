import { switchTemperatureScale, getTemperatureScale } from './modules/switch-convert-temperature.js';

(function () {
  getTemperatureScale();

  window.addEventListener('click', (e) => {
    if (e.target.parentNode.id === 'convert-temperature') switchTemperatureScale();
  });
}());
