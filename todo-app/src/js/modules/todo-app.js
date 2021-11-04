import { putFocusOn, addClassOfElement } from './util/common.js';
import { changeInitialTheme } from './toogle-theme-color.js';
import { addTodo, toggleItemChecked, countTheLeftItem, deleteElement, deleteAllCompletedTasks, savingTodos, gettingTheTodos, initialTodo, deactivatingAllTheOptions, defaultMsgIfIsEmpty, deleteDefaultMsg, showStateTasks, getIndexList, putTitlesOnPage } from './util/todo/todo.js';
import createTodo from './util/todo/addTodo.js';

// Conteiners
const headerTitle = document.body.querySelector('#todo-header h1');
const iconThemeChanger = document.body.querySelector('#theme-changer img');
const todoCreate = document.body.querySelector('main form#create-todo input#create');
const viewingTasks = document.body.querySelector('main section ul#viewing-tasks');
const itemsLeft = document.body.querySelector('main section footer p strong');
const optionsContiner = document.body.querySelector('main footer#options');

export function initialConfig() {
  putTitlesOnPage(headerTitle);
  putFocusOn(todoCreate);
  changeInitialTheme(iconThemeChanger);
  activeStateSetted(optionsContiner);
  initialTodo();
  gettingTheTodos(viewingTasks);
  showStateTasks(viewingTasks);
  countTheLeftItem(itemsLeft);
  defaultMsgIfIsEmpty(viewingTasks);
}

function loadTasks() {
  showStateTasks(viewingTasks);
  countTheLeftItem(itemsLeft);
}

export function createTheTodo(target) {
  deleteDefaultMsg(viewingTasks);
  addTodo(viewingTasks)(target);
  savingTodos(viewingTasks);
  loadTasks();
  defaultMsgIfIsEmpty(viewingTasks);
}

function createNewTodoInCorrectPosition(itemChecked) {
  const isChecked = itemChecked.classList.contains('checked');
  const todo = createTodo(isChecked)(itemChecked.innerText);
  if (isChecked) viewingTasks.appendChild(todo);
  else viewingTasks.insertAdjacentElement('afterBegin', todo);
}

export function checkTheInput(target) {
  const itemChecked = toggleItemChecked(target);
  target.closest('.task').remove();
  createNewTodoInCorrectPosition(itemChecked);
  savingTodos(viewingTasks);
  loadTasks();
  defaultMsgIfIsEmpty(viewingTasks);
}

export function deleteElementFromTheConteiner(target) {
  const taskConteiner = target.closest('.task');
  deleteElement(taskConteiner);
  savingTodos(viewingTasks);
  countTheLeftItem(itemsLeft);
  defaultMsgIfIsEmpty(viewingTasks);
}

export function clearAllCompletedElement() {
  deleteAllCompletedTasks(viewingTasks);
  savingTodos(viewingTasks);
  countTheLeftItem(itemsLeft);
  defaultMsgIfIsEmpty(viewingTasks);
}

function changeOption(target) {
  deactivatingAllTheOptions(optionsContiner);
  addClassOfElement(target)('active');
}

function setState(state) {
  const index = getIndexList();
  const list = JSON.parse(localStorage.lists);
  list[index].state = state;
  const listInJson = JSON.stringify(list);
  localStorage.lists = listInJson;
}

function activeStateSetted(conteiner) {
  const index = getIndexList();
  const list = JSON.parse(localStorage.lists);
  const { state } = list[index];
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
