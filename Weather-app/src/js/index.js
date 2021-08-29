import { switchTemperatureScale, getTemperatureScale } from './modules/switch-temperature-scale.js';
import { openSearchScreen, closeTheSearchScreen } from './modules/search-screen.js';

(function () {
  getTemperatureScale();

  window.addEventListener('click', (e) => {
    const { target } = e;
    if (target.parentNode.id === 'convert-temperature') switchTemperatureScale();
    else if (target.id === 'search') openSearchScreen();
    else if (target.id === 'close') closeTheSearchScreen();
  });
}());
