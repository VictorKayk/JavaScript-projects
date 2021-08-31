import { switchTemperatureScale, getTemperatureScale } from './modules/switch-temperature-scale.js';
import { openSearchScreen, closeTheSearchScreen } from './modules/search-screen.js';
import { initialConfig, search, getCityOfHistory } from './modules/temperature/index.js';

(function () {
  initialConfig();

  window.addEventListener('load', () => {
    getTemperatureScale();

    window.addEventListener('click', (e) => {
      const { target } = e;

      if (target.parentNode.id === 'convert-temperature') switchTemperatureScale();
      else if (target.id === 'search-city') openSearchScreen();
      else if (target.id === 'close') closeTheSearchScreen();
      else if (target.id === 'my_location') initialConfig();
      else if (target.id === 'search') search(e);
      else if (target.classList.contains('city-conteiner')) getCityOfHistory(target);
    });
  });
}());
