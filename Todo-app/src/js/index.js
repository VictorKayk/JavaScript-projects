import { putFocusOn } from './modules/utilities.js';
import { changeInitialTheme, toggleTheme } from './modules/toogle-theme-color.js';
import { addTodo, toggleItemChecked } from './modules/todoUtilities/todo.js';

// Conteiners
const todoCreate = document.body.querySelector('main form#create-todo input#create');
const iconThemeChanger = document.body.querySelector('#theme-changer img');
const viewingTasks = document.body.querySelector('main div#viewing-tasks');

(function () {
  putFocusOn(todoCreate);
  changeInitialTheme(iconThemeChanger);

  window.addEventListener('click', (e) => {
    const { target } = e;
    if (target.getAttribute('data-js')) toggleTheme(iconThemeChanger);
    else if (target.classList.contains('checkboxInput')) toggleItemChecked(target);
  });

  window.addEventListener('submit', (e) => {
    e.preventDefault();
    const { target } = e;
    if (target.id === 'create-todo') addTodo(viewingTasks)(target);
  });
}());
