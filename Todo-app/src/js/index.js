import { initialTheme, toggleIconThemeIfNotCorrect, toggleTheme } from './modules/toogle-theme-color.js';

const iconThemeChanger = document.body.querySelector('#theme-changer img');

function theme(iconThemeTag) {
  initialTheme(iconThemeTag);
  toggleIconThemeIfNotCorrect(iconThemeTag);
}

theme(iconThemeChanger);

window.addEventListener('click', (e) => {
  const { target } = e;
  if (target.getAttribute('data-js')) toggleTheme(iconThemeChanger);
});

window.addEventListener('submit', (e) => {
  e.preventDefault();
  const { target } = e;
  if (target.id === 'create-todo') {
    const input = target.querySelector('input');
    console.log(target, input.textContent);
    input.focus();
  }
});
