import { getRequest, putCurrentTemperature, getOneCallUrl } from '../util/common.js';
import putWeatherForecast from './weather-forecast-5days.js';
import putHighlights from './highlights.js';
import { putCity } from './current-temperature.js';
import { closeTheSearchScreen } from '../search-screen.js';

function getUrlOfCity(city) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt_br&appid=8a1b6c8a637eee68a8dc5da6a90c3bcd`;
}

export default async function getCityInfosOfAHistory(city) {
  const url = getUrlOfCity(city);
  closeTheSearchScreen();
  const { coord: { lat, lon }, name } = await getRequest(url);
  const newUrl = getOneCallUrl(lat, lon);
  const { current, daily } = await getRequest(newUrl);
  putCurrentTemperature(current);
  putHighlights(current);
  putWeatherForecast(daily);
  putCity(name);
}
