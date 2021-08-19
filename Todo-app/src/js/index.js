import { putFocusOn } from './modules/utilities.js';
import { changeInitialTheme, toggleTheme } from './modules/toogle-theme-color.js';
import { addTodo, toggleItemChecked, countTheLeftItem, deleteElement, deleteAllCompletedTasks } from './modules/todoUtilities/todo.js';

// Conteiners
const todoCreate = document.body.querySelector('main form#create-todo input#create');
const iconThemeChanger = document.body.querySelector('#theme-changer img');
const viewingTasks = document.body.querySelector('main div#viewing-tasks');
const itemsLeft = document.body.querySelector('main section footer p strong');

(function () {
  putFocusOn(todoCreate); // Transformar isso em uma função prorpria
  changeInitialTheme(iconThemeChanger);
  countTheLeftItem(viewingTasks)(itemsLeft);

  window.addEventListener('click', (e) => {
    const { target } = e;
    if (target.getAttribute('data-js')) toggleTheme(iconThemeChanger);
    else if (target.classList.contains('checkboxInput')) { // Transformar isso em uma função prorpria
      toggleItemChecked(target);
      countTheLeftItem(viewingTasks)(itemsLeft);
    } else if (target.classList.contains('delete-btn')) { // Transformar isso em uma função prorpria
      const task = target.closest('div.task');
      deleteElement(task);
      countTheLeftItem(viewingTasks)(itemsLeft);
    } else if (target.id === 'clear-completed') deleteAllCompletedTasks(viewingTasks);
  });

  window.addEventListener('submit', (e) => {
    e.preventDefault();
    const { target } = e;
    if (target.id === 'create-todo') { // Transformar isso em uma função prorpria
      addTodo(viewingTasks)(target);
      countTheLeftItem(viewingTasks)(itemsLeft);
    }
  });
}());
