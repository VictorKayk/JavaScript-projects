import { putFocusOn } from './util/common.js';
import { changeInitialTheme } from './toogle-theme-color.js';
import { addTodo, deleteElement, savingTodos, gettingTheTodos, initialTodo, defaultMsgIfIsEmpty, deleteDefaultMsg, countTheLeftItem } from './util/todo-list/todo.js';

// Conteiners
const iconThemeChanger = document.body.querySelector('#theme-changer img');
const todoCreate = document.body.querySelector('main form#create-todo input#create');
const listCount = document.body.querySelector('main section footer p strong');
const viewingTasks = document.body.querySelector('main section ul#viewing-tasks');

export function initialConfig() {
  putFocusOn(todoCreate);
  changeInitialTheme(iconThemeChanger);
  initialTodo();
  gettingTheTodos(viewingTasks);
  countTheLeftItem(listCount);
  defaultMsgIfIsEmpty(viewingTasks);
}

export function createTodo(target) {
  deleteDefaultMsg(viewingTasks);
  addTodo(viewingTasks)(target);
  savingTodos(viewingTasks);
  countTheLeftItem(listCount);
  defaultMsgIfIsEmpty(viewingTasks);
}

export function deleteElementFromTheConteiner(target) {
  const taskConteiner = target.closest('.task');
  deleteElement(taskConteiner);
  savingTodos(viewingTasks);
  countTheLeftItem(listCount);
  defaultMsgIfIsEmpty(viewingTasks);
}

export function deleteAllElementFromTheConteiner() {
  const tasks = viewingTasks.querySelectorAll('li');
  tasks.forEach((value) => deleteElement(value));
  savingTodos(viewingTasks);
  countTheLeftItem(listCount);
  defaultMsgIfIsEmpty(viewingTasks);
}
