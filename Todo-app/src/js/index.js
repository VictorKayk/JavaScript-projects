// import toggleTheme from './modules/toggle-theme-color.js';

const body = document.querySelector('body');
const buttonThemeChanger = document.body.querySelector('#theme-changer');
const iconThemeChanger = document.body.querySelector('#theme-changer img');

function toggleIconTheme(iconThemeTag) {
  const imgButton = iconThemeTag.getAttribute('src');
  if (imgButton.includes('dark')) iconThemeTag.setAttribute('src', imgButton.replace('dark', 'light'));
  else if (imgButton.includes('light')) iconThemeTag.setAttribute('src', imgButton.replace('light', 'dark'));
}

function removeTheThemeClassOfBody() {
  body.classList.remove('light');
  body.classList.remove('dark');
}

function putTheThemeClassOnBody() {
  body.classList.add(localStorage.theme);
}

function toggleThemeInBody() {
  removeTheThemeClassOfBody();
  putTheThemeClassOnBody();
}

function initialTheme(iconThemeTag) {
  localStorage.theme = localStorage.theme || 'light';

  toggleIconTheme(iconThemeTag);
  toggleThemeInBody();
}

initialTheme(iconThemeChanger);

function isTheCorrectTheme(iconThemeTag) {
  const imgButton = iconThemeTag.getAttribute('src');
  if (imgButton.includes('light')) return localStorage.theme === 'light';
  return localStorage.theme === 'dark';
}

function toggleLocalStorageTheme() {
  const possibleChoices = {
    light: 'dark',
    dark: 'light',
  };
  localStorage.theme = possibleChoices[localStorage.theme];
}

if (!isTheCorrectTheme(iconThemeChanger)) toggleIconTheme(iconThemeChanger);

window.addEventListener('click', (e) => {
  const { target } = e;
  if (target.getAttribute('data-js')) {
    toggleLocalStorageTheme();
    toggleIconTheme(iconThemeChanger);
    toggleThemeInBody();
  }
});
