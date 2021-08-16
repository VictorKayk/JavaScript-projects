// import toggleTheme from './modules/toggle-theme-color.js';

const buttonThemeChanger = document.body.querySelector('#theme-changer');
const imgThemeChanger = document.body.querySelector('#theme-changer img');

function initialTheme() {
  localStorage.theme = localStorage.theme || 'light';
}

initialTheme();

function isTheCorrectTheme(imgTagTheme) {
  const imgButton = imgTagTheme.getAttribute('src');
  if (imgButton.includes('light')) return localStorage.theme === 'light';
  return localStorage.theme === 'dark';
}

function toggleImgTheme(imgTagTheme) {
  const imgButton = imgTagTheme.getAttribute('src');
  if (imgButton.includes('dark')) imgTagTheme.setAttribute('src', imgButton.replace('dark', 'light'));
  else if (imgButton.includes('light')) imgTagTheme.setAttribute('src', imgButton.replace('light', 'dark'));
}

function toggleTheme(imgTagTheme) {
  toggleImgTheme(imgTagTheme);
}

function toggleLocalStorageTheme() {
  const possibleChoices = {
    light: 'dark',
    dark: 'light',
  };
  localStorage.theme = possibleChoices[localStorage.theme];
}

if (!isTheCorrectTheme(imgThemeChanger)) toggleImgTheme(imgThemeChanger);

window.addEventListener('click', (e) => {
  const { target } = e;
  if (target.getAttribute('data-js')) {
    toggleLocalStorageTheme();
    toggleTheme(imgThemeChanger);
  }
});
