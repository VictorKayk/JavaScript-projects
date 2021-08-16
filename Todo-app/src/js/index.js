// import toogleTheme from './modules/toogle-theme-color.js';

localStorage.theme = localStorage.theme || 'light';

const buttonThemeChanger = document.body.querySelector('#theme-changer');

function isTheCorrectTheme(tagTheme) {
  const tag = tagTheme.firstChild || tagTheme;
  const possibleChoices = {
    '../assets/img/icons/icon-moon.svg': 'light',
    '../assets/img/icons/icon-sun.svg': 'dark',
  };
  const imgButton = tag.getAttribute('src');
  return localStorage.theme === possibleChoices[imgButton];
}

function toogleImgTheme(tagTheme) {
  const tag = tagTheme.firstChild || tagTheme;
  const imgButton = tag.getAttribute('src');
  if (imgButton.includes('moon')) {
    tag.setAttribute('src', imgButton.replace('moon', 'sun'));
  } else {
    tag.setAttribute('src', imgButton.replace('sun', 'moon'));
  }
}

function toogleTheme(tagTheme) {
  toogleImgTheme(tagTheme);
}

function toogleLocalStorageTheme() {
  const possibleChoices = {
    light: 'dark',
    dark: 'light',
  };
  localStorage.theme = possibleChoices[localStorage.theme];
}

if (!isTheCorrectTheme(buttonThemeChanger.firstChild)) toogleImgTheme(buttonThemeChanger.firstChild);

window.addEventListener('click', (e) => {
  const { target } = e;
  console.log(target);
  if (target === buttonThemeChanger || target === buttonThemeChanger.firstChild) {
    toogleLocalStorageTheme();
    toogleTheme(target);
  }
});
