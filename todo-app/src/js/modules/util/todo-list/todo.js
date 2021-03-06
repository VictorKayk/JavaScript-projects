import createTodo from './addTodo.js';
import { putFocusOn, addClassOfElement, removeClassOfElement, putPlaceholderInTarget, getTasksConteiners, createElement, addAttributeToElement } from '../common.js';

function setNormalSubmitInput(input) {
  removeClassOfElement(input)('error');
  putPlaceholderInTarget(input)('Create a new todo list...');
}

function tooLongErrorMsg(input) {
  addClassOfElement(input)('error');
  putPlaceholderInTarget(input)('Task too long. (15 characters max)');
}

export function addTodo(conteiner) {
  return (target) => {
    const input = target.querySelector('input#create');
    const inputValue = input.value.trim();
    if (inputValue) {
      if (inputValue.length <= 15) {
        const id = document.body.querySelectorAll('.task .item p').length;
        const todo = createTodo(inputValue, id);
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
  localStorage.lists = localStorage.lists || JSON.stringify({ });
}

function putLinkOnTasks(conteiner) {
  const tasksConteiners = getTasksConteiners(conteiner);
  const tasksInArray = [...tasksConteiners];
  tasksInArray.forEach((value) => {
    const linkConteiner = value.closest('a');
    addAttributeToElement(linkConteiner)('href')(`todo-list/?list=${value.id}`);
  });
}

export function savingTodoPositions(conteiner) {
  const tasksConteiners = getTasksConteiners(conteiner);
  const tasksInArray = [...tasksConteiners];
  const lists = JSON.parse(localStorage.lists);
  tasksInArray.forEach((value, index) => {
    lists[value.id].pos = index;
  });
  localStorage.lists = JSON.stringify(lists);
}

export function savingTodos(conteiner) {
  const tasksConteiners = getTasksConteiners(conteiner);
  const tasksInArray = [...tasksConteiners];
  const lists = JSON.parse(localStorage.lists);
  putLinkOnTasks(conteiner);
  tasksInArray
    .forEach(({ id, innerText }, index) => {
      lists[index] = lists[index] || {
        id,
        listName: innerText,
        state: 'All',
        tasks: { All: {}, Active: {}, Completed: {} },
        pos: index,
      };
    });
  localStorage.lists = JSON.stringify(lists);
}

export function gettingTheTodos(conteiner) {
  const tasks = JSON.parse(localStorage.lists);
  const tasksInArray = Object.values(tasks);
  const tasksInOrder = tasksInArray.sort((a, b) => a.pos - b.pos);
  tasksInOrder.forEach(({ listName, id }) => {
    const todo = createTodo(listName, id);
    conteiner.appendChild(todo);
  });
  putLinkOnTasks(conteiner);
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
  const lists = JSON.parse(localStorage.lists);
  const listsKey = Object.keys(lists);
  const otherDefaultMsg = conteiner.querySelector('.default');
  if (listsKey.length === 0 && !otherDefaultMsg) {
    localStorage.lists = JSON.stringify({ });
    const defaultMsg = createDefaultMsgConteiner();
    conteiner.appendChild(defaultMsg);
  }
}

export function deleteDefaultMsg(conteiner) {
  const defaultMsg = conteiner.querySelector('.default');
  if (defaultMsg) deleteElement(defaultMsg);
}

export function getTaskId(target) {
  const taskConteiner = target.closest('li');
  const taskId = taskConteiner.querySelector('p').id;
  return taskId;
}

export function getListsInArray() {
  const list = JSON.parse(localStorage.lists);
  const listInArray = Object.values(list);
  return listInArray;
}

export function countTheLeftItem(conteinerToPutTheCont) {
  const listInArray = getListsInArray();
  const listCount = listInArray.length;
  conteinerToPutTheCont.innerText = listCount;
}
