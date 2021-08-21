import { putFocusOn, addClassOfElement } from './modules/util/common.js';
import { changeInitialTheme, toggleTheme } from './modules/toogle-theme-color.js';
import { addTodo, toggleItemChecked, countTheLeftItem, deleteElement, deleteAllCompletedTasks, savingTodos, gettingTheTodos, initialTodo, deactivatingAllTheOptions, defaultMsgIfIsEmpty, deleteDefaultMsg, showStateTasks } from './modules/util/todo/todo.js';

// showStateTasks, showOnlyActiveTasks, showOnlyCompletedTasks,

// Conteiners
const todoCreate = document.body.querySelector('main form#create-todo input#create');
const iconThemeChanger = document.body.querySelector('#theme-changer img');
const viewingTasks = document.body.querySelector('main section div#viewing-tasks');
const itemsLeft = document.body.querySelector('main section footer p strong');
const optionsContiner = document.body.querySelector('main footer#options');

function initialConfig() {
  putFocusOn(todoCreate);
  changeInitialTheme(iconThemeChanger);
  initialState();
  activeStateSetted(optionsContiner);
  initialTodo();
  gettingTheTodos(viewingTasks);
  showStateTasks(viewingTasks);
  defaultMsgIfIsEmpty(viewingTasks);
  countTheLeftItem(viewingTasks)(itemsLeft);
}

function loadTasks() {
  showStateTasks(viewingTasks);
  countTheLeftItem(viewingTasks)(itemsLeft);
}

function createTodo(target) {
  deleteDefaultMsg(viewingTasks);
  addTodo(viewingTasks)(target);
  savingTodos(viewingTasks);
  loadTasks();
}

function checkTheInput(target) {
  toggleItemChecked(target);
  savingTodos(viewingTasks);
  loadTasks();
}

function deleteElementFromTheConteiner(target) {
  const taskConteiner = target.closest('div.task');
  deleteElement(taskConteiner);
  savingTodos(viewingTasks);
  countTheLeftItem(viewingTasks)(itemsLeft);
  defaultMsgIfIsEmpty(viewingTasks);
}

function clearAllCompletedElement() {
  deleteAllCompletedTasks(viewingTasks);
  savingTodos(viewingTasks);
  countTheLeftItem(viewingTasks)(itemsLeft);
  defaultMsgIfIsEmpty(viewingTasks);
}

function changeOption(target) {
  deactivatingAllTheOptions(optionsContiner);
  addClassOfElement(target)('active');
}

function initialState() {
  localStorage.state = localStorage.state || 'All';
}

function setState(state) {
  localStorage.state = state;
}

function activeStateSetted(conteiner) {
  const { state } = localStorage;
  const option = conteiner.querySelector(`#${state}`);
  addClassOfElement(option)('active');
}

function options(target) {
  changeOption(target);
  setState(target.id);
  deleteDefaultMsg(viewingTasks);
  loadTasks();
  defaultMsgIfIsEmpty(viewingTasks);
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
    else if (target.classList.contains('option')) options(target);
  });
}());

// Fazer a imagem padrão de quando não tem nenhum todo - Se possivel melhorar
