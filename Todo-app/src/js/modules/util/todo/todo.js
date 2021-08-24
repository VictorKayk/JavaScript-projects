import createTodo from './addTodo.js';
import { putFocusOn, addClassOfElement, removeClassOfElement, putPlaceholderInTarget, getTasksConteiners, removeClassOfMutipleElements, createElement } from '../common.js';

function setNormalSubmitInput(input) {
  removeClassOfElement(input)('error');
  putPlaceholderInTarget(input)('Create a new todo...');
}

function tooLongErrorMsg(input) {
  addClassOfElement(input)('error');
  putPlaceholderInTarget(input)('Task too long. (20 characters max)');
}

export function getIndexList() {
  const url = new URLSearchParams(window.location.search);
  const indexList = url.get('list');
  return indexList;
}

export function getList() {
  const indexList = getIndexList();
  const tasks = JSON.parse(localStorage.lists);
  return Object.values(tasks)[indexList];
}

export function getTasks() {
  const list = getList();
  const { tasks } = list;
  return tasks;
}

export function getState() {
  const list = getList();
  const { state } = list;
  return state;
}

function getListName() {
  const list = getList();
  const { listName } = list;
  return listName;
}

export function putTitlesOnPage(conteiner) {
  const title = getListName();
  document.title = title;
  conteiner.innerText = title;
}

export function addTodo(conteiner) {
  return (target) => {
    const input = target.querySelector('input#create');
    const inputValue = input.value.trim();
    if (inputValue) {
      if (inputValue.length <= 20) {
        const todo = createTodo(false)(inputValue);
        conteiner.appendChild(todo);
        setNormalSubmitInput(input);
      } else tooLongErrorMsg(input);
    }
    input.value = '';
    putFocusOn(input);
  };
}

export function toggleItemChecked(target) {
  const item = target.closest('.item');
  const itemText = item.querySelector('p');
  itemText.classList.toggle('checked');
}

export function countTheLeftItem(conteinerToPutTheCont) {
  const tasks = getTasks();
  const itemsNotChecked = Object.values(tasks.Active);
  const numberOfItemsNotChecked = itemsNotChecked.length;
  conteinerToPutTheCont.innerText = numberOfItemsNotChecked;
}

export function deleteElement(item) {
  item.remove();
}

function deleteTasks(tasksConteiner) {
  return tasksConteiner.forEach((tasks) => {
    const task = tasks.closest('.task');
    deleteElement(task);
  });
}

export function deleteAllCompletedTasks(conteinerToContTask) {
  const tasksConteiner = conteinerToContTask.querySelectorAll('.task .item p.checked');
  deleteTasks(tasksConteiner);
}

export function initialTodo() {
  localStorage.lists = localStorage.lists || JSON.stringify({ });
}

function getActiveTasks(tasksInArray) {
  const active = tasksInArray.reduce((acc, item, index) => {
    if (!item.classList.contains('checked')) {
      acc[index] = {
        task: item.innerText,
        isChecked: item.classList.contains('checked'),
      };
    }
    return acc;
  }, {});
  return active;
}

function getCompletedTasks(tasksInArray) {
  const completed = tasksInArray.reduce((acc, item, index) => {
    if (item.classList.contains('checked')) {
      acc[index] = {
        task: item.innerText,
        isChecked: item.classList.contains('checked'),
      };
    }
    return acc;
  }, {});

  return completed;
}

function getAllStateTasks(tasksInArray) {
  const Active = getActiveTasks(tasksInArray);
  const Completed = getCompletedTasks(tasksInArray);
  const All = { ...Active, ...Completed };
  return {
    Active,
    Completed,
    All,
  };
}

export function savingTodos(conteiner) {
  const index = getIndexList();
  const tasksConteiners = getTasksConteiners(conteiner);
  const tasksInArray = [...tasksConteiners];
  const tasks = getAllStateTasks(tasksInArray);
  const list = JSON.parse(localStorage.lists);
  list[index].tasks = tasks;
  const listInJson = JSON.stringify(list);
  localStorage.lists = listInJson;
}

export function gettingTheTodos(conteiner) {
  const tasks = getTasks();
  const { All } = tasks;
  const state = getState();
  const tasksInArray = Object.values(All);
  tasksInArray.forEach(({ task, isChecked }) => {
    const todo = createTodo(isChecked)(task);
    if (state === 'Active' && isChecked) addClassOfElement(todo)('hide');
    else if (state === 'Completed' && !isChecked) addClassOfElement(todo)('hide');
    conteiner.appendChild(todo);
  });
}

export function deactivatingAllTheOptions(conteiner) {
  const options = conteiner.querySelectorAll('button.option');
  return removeClassOfMutipleElements(options)('active');
}

export function showStateTasks(conteiner) {
  const tasks = conteiner.querySelectorAll('.task .item  p');
  deleteTasks(tasks);
  gettingTheTodos(conteiner);
}

function createDefaultMsgConteiner() {
  const defaultMsg = createElement('li');
  addClassOfElement(defaultMsg)('default');
  const defaultText = createElement('p');
  const state = getState();
  if (state === 'All' || state === 'Active') defaultText.innerText = 'It has no todo. Create one.';
  else if (state === 'Completed') defaultText.innerText = 'It has no todo. Complete one.';
  defaultMsg.appendChild(defaultText);
  return defaultMsg;
}

export function defaultMsgIfIsEmpty(conteiner) {
  const tasks = getTasks();
  const state = getState();
  const tasksOnState = Object.values(tasks[state]);
  const otherDefaultMsg = conteiner.querySelector('.default');
  if (tasksOnState.length === 0 && !otherDefaultMsg) {
    const defaultMsg = createDefaultMsgConteiner();
    conteiner.appendChild(defaultMsg);
  }
}

export function deleteDefaultMsg(conteiner) {
  const defaultMsg = conteiner.querySelector('.default');
  if (defaultMsg) deleteElement(defaultMsg);
}
