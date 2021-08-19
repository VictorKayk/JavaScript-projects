import { putFocusOn } from './modules/util/common.js';
import { changeInitialTheme, toggleTheme } from './modules/toogle-theme-color.js';
import { addTodo, toggleItemChecked, countTheLeftItem, deleteElement, deleteAllCompletedTasks, savingTodos, gettingTheTodos } from './modules/util/todo/todo.js';

// Conteiners
const todoCreate = document.body.querySelector('main form#create-todo input#create');
const iconThemeChanger = document.body.querySelector('#theme-changer img');
const viewingTasks = document.body.querySelector('main section div#viewing-tasks');
const itemsLeft = document.body.querySelector('main section footer p strong');

function initialConfig() {
  putFocusOn(todoCreate);
  changeInitialTheme(iconThemeChanger);
  countTheLeftItem(viewingTasks)(itemsLeft);
  savingTodos(viewingTasks);
}

function checkTheInput(target) {
  toggleItemChecked(target);
  countTheLeftItem(viewingTasks)(itemsLeft);
  savingTodos(viewingTasks);
}

function deleteElementFromTheConteiner(target) {
  const task = target.closest('div.task');
  deleteElement(task);
  countTheLeftItem(viewingTasks)(itemsLeft);
  savingTodos(viewingTasks);
}

function clearAllCompletedElement() {
  deleteAllCompletedTasks(viewingTasks);
  countTheLeftItem(viewingTasks)(itemsLeft);
  savingTodos(viewingTasks);
}

function createTodo(target) {
  addTodo(viewingTasks)(target);
  countTheLeftItem(viewingTasks)(itemsLeft);
  savingTodos(viewingTasks);
}

(function () {
  gettingTheTodos(viewingTasks); // Colocar isso no lugar correto
  initialConfig();

  window.addEventListener('click', (e) => {
    const { target } = e;
    if (target.getAttribute('data-js')) toggleTheme(iconThemeChanger);
    else if (target.classList.contains('checkboxInput')) checkTheInput(target);
    else if (target.classList.contains('delete-btn')) deleteElementFromTheConteiner(target);
    else if (target.id === 'clear-completed') clearAllCompletedElement();
  });

  window.addEventListener('submit', (e) => {
    e.preventDefault();
    const { target } = e;
    if (target.id === 'create-todo') createTodo(target);
  });
}());
