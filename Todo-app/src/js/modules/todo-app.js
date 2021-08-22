import { putFocusOn, addClassOfElement } from './util/common.js';
import { changeInitialTheme } from './toogle-theme-color.js';
import { addTodo, toggleItemChecked, countTheLeftItem, deleteElement, deleteAllCompletedTasks, savingTodos, gettingTheTodos, initialTodo, deactivatingAllTheOptions, defaultMsgIfIsEmpty, deleteDefaultMsg, showStateTasks } from './util/todo/todo.js';

// Conteiners
const iconThemeChanger = document.body.querySelector('#theme-changer img');
const todoCreate = document.body.querySelector('main form#create-todo input#create');
const viewingTasks = document.body.querySelector('main section ul#viewing-tasks');
const itemsLeft = document.body.querySelector('main section footer p strong');
const optionsContiner = document.body.querySelector('main footer#options');

export function initialConfig() {
  putFocusOn(todoCreate);
  changeInitialTheme(iconThemeChanger);
  initialState();
  activeStateSetted(optionsContiner);
  initialTodo();
  gettingTheTodos(viewingTasks);
  showStateTasks(viewingTasks);
  countTheLeftItem(viewingTasks)(itemsLeft);
  defaultMsgIfIsEmpty(viewingTasks);
}

function loadTasks() {
  showStateTasks(viewingTasks);
  countTheLeftItem(viewingTasks)(itemsLeft);
}

export function createTodo(target) {
  deleteDefaultMsg(viewingTasks);
  addTodo(viewingTasks)(target);
  savingTodos(viewingTasks);
  loadTasks();
  defaultMsgIfIsEmpty(viewingTasks);
}

export function checkTheInput(target) {
  toggleItemChecked(target);
  savingTodos(viewingTasks);
  loadTasks();
  defaultMsgIfIsEmpty(viewingTasks);
}

export function deleteElementFromTheConteiner(target) {
  const taskConteiner = target.closest('.task');
  deleteElement(taskConteiner);
  savingTodos(viewingTasks);
  countTheLeftItem(viewingTasks)(itemsLeft);
  defaultMsgIfIsEmpty(viewingTasks);
}

export function clearAllCompletedElement() {
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

export function options(target) {
  changeOption(target);
  setState(target.id);
  deleteDefaultMsg(viewingTasks);
  loadTasks();
  defaultMsgIfIsEmpty(viewingTasks);
}
