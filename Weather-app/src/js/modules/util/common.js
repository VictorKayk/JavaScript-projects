export function getRequest(url) {
  const data = fetch(url);
  return data.then((e) => e.json());
}

export function getCurrentLocation() {
  function geoSuccess(position) {
    localStorage.lat = position.coords.latitude;
    localStorage.lon = position.coords.longitude;
  }
  navigator.geolocation.getCurrentPosition(geoSuccess);
}

export function convertTemperature(temp) {
  return localStorage.temperatureScale === 'fahrenheit' ? (temp * 1.8) + 32 : temp;
}

export function getAmericaDateFormat(date) {
  const newDate = date.split('/');
  return `${newDate[2]}/${newDate[1]}/${newDate[0]}`;
}
