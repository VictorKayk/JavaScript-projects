import themeChanger from './modules/toogle-theme-color.js';

const iconThemeChanger = document.body.querySelector('#theme-changer img');

themeChanger(iconThemeChanger);

window.addEventListener('mouseover', (e) => {
  const { target } = e;
  if (target.classList.contains('task')) {
    const { children } = target;
    const btn = children[1];
    btn.classList.add('hover');
  }
});

window.addEventListener('mouseout', (e) => {
  const { target } = e;
  if (target.classList.contains('task')) {
    // console.log(target.children);
    const btn = target.querySelector('button.btn');
    btn.classList.remove('hover');
  }
});
