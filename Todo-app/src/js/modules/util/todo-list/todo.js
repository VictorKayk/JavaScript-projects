import createTodo from './addTodo.js';
import { putFocusOn, addClassOfElement, removeClassOfElement, putPlaceholderInTarget, getTasksConteiners, createElement, addAttributeToElement } from '../common.js';

function setNormalSubmitInput(input) {
  removeClassOfElement(input)('error');
  putPlaceholderInTarget(input)('Create a new todo list...');
}

function tooLongErrorMsg(input) {
  addClassOfElement(input)('error');
  putPlaceholderInTarget(input)('Task too long. (20 characters max)');
}

export function addTodo(conteiner) {
  return (target) => {
    const input = target.querySelector('input#create');
    const inputValue = input.value.trim();
    if (inputValue) {
      if (inputValue.length <= 20) {
        const todo = createTodo(inputValue);
        conteiner.appendChild(todo);
        setNormalSubmitInput(input);
      } else tooLongErrorMsg(input);
    }
    input.value = '';
    putFocusOn(input);
  };
}

export function deleteElement(item) {
  item.remove();
}

export function initialTodo() {
  localStorage.tasks = localStorage.tasks || JSON.stringify({ });
}

function putLinkOnTasks(tasks) {
  tasks.forEach((value, index) => {
    const linkConteiner = value.closest('a');
    addAttributeToElement(linkConteiner)('href')(`todo-list/?list=${index}`);
  });
}

export function savingTodos(conteiner) {
  const tasksConteiners = getTasksConteiners(conteiner);
  const tasksInArray = [...tasksConteiners];
  putLinkOnTasks(tasksInArray);
  const tasksInObject = tasksInArray
    .reduce((acc, { innerText }, index) => {
      acc[index] = { listName: innerText, All: {}, Active: {}, Completed: {}, state: 'All' };
      return acc;
    }, {});
  const tasksInJson = JSON.stringify(tasksInObject);
  localStorage.tasks = tasksInJson;
}

export function gettingTheTodos(conteiner) {
  const tasks = JSON.parse(localStorage.tasks);
  const tasksInArray = Object.values(tasks);
  tasksInArray.forEach(({ listName }) => {
    const todo = createTodo(listName);
    conteiner.appendChild(todo);
  });
}

function createDefaultMsgConteiner() {
  const defaultMsg = createElement('li');
  addClassOfElement(defaultMsg)('default');
  const defaultText = createElement('p');
  defaultText.innerText = 'It has no todo list. Create one.';
  defaultMsg.appendChild(defaultText);
  return defaultMsg;
}

export function defaultMsgIfIsEmpty(conteiner) {
  const tasks = JSON.parse(localStorage.tasks);
  const tasksKey = Object.keys(tasks);
  const otherDefaultMsg = conteiner.querySelector('.default');
  if (tasksKey.length === 0 && !otherDefaultMsg) {
    const defaultMsg = createDefaultMsgConteiner();
    conteiner.appendChild(defaultMsg);
  }
}

export function deleteDefaultMsg(conteiner) {
  const defaultMsg = conteiner.querySelector('.default');
  if (defaultMsg) deleteElement(defaultMsg);
}

export function countTheLeftItem(conteinerToPutTheCont) {
  const list = JSON.parse(localStorage.tasks);
  const listInArray = Object.keys(list);
  const listCount = listInArray.length;
  conteinerToPutTheCont.innerText = listCount;
}
