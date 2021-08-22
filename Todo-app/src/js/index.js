import stopLoad from './modules/loading-screen.js';
import dragAndDrop from './modules/drag-and-drop.js';
import { toggleTheme } from './modules/toogle-theme-color.js';
import { initialConfig, createTodo, checkTheInput, deleteElementFromTheConteiner, clearAllCompletedElement, options } from './modules/todo-app.js';

// Conteiners
const iconThemeChanger = document.body.querySelector('#theme-changer img');

(function () {
  window.addEventListener('load', () => stopLoad());

  initialConfig();
  dragAndDrop();

  window.addEventListener('submit', (e) => {
    e.preventDefault();
    const { target } = e;
    if (target.id === 'create-todo') createTodo(target);
  });

  window.addEventListener('click', (e) => {
    const { target } = e;
    if (target.getAttribute('data-js')) toggleTheme(iconThemeChanger);
    else if (target.classList.contains('checkboxInput')) checkTheInput(target);
    else if (target.classList.contains('delete-btn')) deleteElementFromTheConteiner(target);
    else if (target.id === 'clear-completed') clearAllCompletedElement();
    else if (target.classList.contains('option')) options(target);
  });
}());
