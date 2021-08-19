import { putFocusOn, addClassOfElement } from './modules/util/common.js';
import { changeInitialTheme, toggleTheme } from './modules/toogle-theme-color.js';
import { addTodo, toggleItemChecked, countTheLeftItem, deleteElement, deleteAllCompletedTasks, savingTodos, gettingTheTodos, initialTodo, deactivatingAllTheOptions, showAllTasks, showOnlyActiveTasks, showOnlyCompletedTasks } from './modules/util/todo/todo.js';

// Conteiners
const todoCreate = document.body.querySelector('main form#create-todo input#create');
const iconThemeChanger = document.body.querySelector('#theme-changer img');
const viewingTasks = document.body.querySelector('main section div#viewing-tasks');
const itemsLeft = document.body.querySelector('main section footer p strong');
const optionsContiner = document.body.querySelector('main footer#options');

function initialConfig() {
  initialTodo();
  gettingTheTodos(viewingTasks);
  putFocusOn(todoCreate);
  changeInitialTheme(iconThemeChanger);
  countTheLeftItem(viewingTasks)(itemsLeft);
}

function createTodo(target) {
  addTodo(viewingTasks)(target);
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

function changeOption(target) {
  deactivatingAllTheOptions(optionsContiner);
  addClassOfElement(target)('active');
}

(function () {
  initialConfig();

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
    else if (target.classList.contains('option')) {
      changeOption(target);
      if (target.id === 'All') {
        showAllTasks(viewingTasks);
        countTheLeftItem(viewingTasks)(itemsLeft);
      } else if (target.id === 'Active') {
        showOnlyActiveTasks(viewingTasks);
        countTheLeftItem(viewingTasks)(itemsLeft);
      } else if (target.id === 'Completed') {
        showOnlyCompletedTasks(viewingTasks);
        countTheLeftItem(viewingTasks)(itemsLeft);
      }
    }
  });
}());
