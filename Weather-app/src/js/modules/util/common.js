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
