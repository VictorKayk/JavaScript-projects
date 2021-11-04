// Conteiners
const weatherNav = document.body.querySelector('#weather-nav');

export function openSearchScreen() {
  weatherNav.classList.add('show');
}

export function closeTheSearchScreen() {
  weatherNav.classList.remove('show');
}
