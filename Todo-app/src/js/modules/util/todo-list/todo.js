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
  localStorage.lists = localStorage.lists || JSON.stringify({ });
}

function putLinkOnTasks(conteiner) {
  const tasksConteiners = getTasksConteiners(conteiner);
<<<<<<< HEAD
  const tasksInArray = [...tasksConteiners];
  tasksInArray.forEach((value) => {
=======
  const tasks = [...tasksConteiners];
  tasks.forEach((value) => {
>>>>>>> 15f1f34a0b7cd3e37d543034da46766526344123
    const linkConteiner = value.closest('a');
    addAttributeToElement(linkConteiner)('href')(`todo-list/?list=${value.id}`);
  });
}

<<<<<<< HEAD
// const tasksInObject = tasksInArray
//     .reduce((acc, { innerText }, index) => {
//       acc[index] = acc[index] || { listName: innerText, state: 'All', tasks: { All: {}, Active: {}, Completed: {} }, pos: index };
//       return acc;
//     }, {});
// const tasksInJson = JSON.stringify(tasksInObject);

function getPosition(id) {
  const tasksConteiners = document.querySelectorAll('li p');
  const tasksInArray = [...tasksConteiners];
  const position = tasksInArray.reduce((acc, item, index) => {
    if (id === item.id) return index;
    return acc;
  }, '');
  console.log(position);
  return position;
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
      };
      console.log(lists[index].pos);
      lists[index].pos = getPosition(id);
      console.log(lists[index].pos);
    });
  localStorage.lists = JSON.stringify(lists);
=======
export function savingTodos(conteiner) {
  const tasksConteiners = getTasksConteiners(conteiner);
  const tasksInArray = [...tasksConteiners];
  putLinkOnTasks(conteiner);
  const tasksInObject = tasksInArray
    .reduce((acc, { id, innerText }, index) => {
      acc[index] = acc[index] || { listName: innerText, state: 'All', tasks: { All: {}, Active: {}, Completed: {} } };
      console.log(acc[index] || 'oi');
      return acc;
    }, {});
  const tasksInJson = JSON.stringify(tasksInObject);
  localStorage.lists = tasksInJson;
>>>>>>> 15f1f34a0b7cd3e37d543034da46766526344123
}

export function gettingTheTodos(conteiner) {
  const tasks = JSON.parse(localStorage.lists);
  const tasksInArray = Object.values(tasks);
<<<<<<< HEAD
  const tasksInOrder = tasksInArray.sort((a, b) => a.pos - b.pos);
  tasksInOrder.forEach(({ listName }) => {
=======
  tasksInArray.forEach(({ listName }) => {
>>>>>>> 15f1f34a0b7cd3e37d543034da46766526344123
    const todo = createTodo(listName);
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
<<<<<<< HEAD
  const lists = JSON.parse(localStorage.lists);
  const listsKey = Object.keys(lists);
  const otherDefaultMsg = conteiner.querySelector('.default');
  if (listsKey.length === 0 && !otherDefaultMsg) {
=======
  const tasks = JSON.parse(localStorage.lists);
  const tasksKey = Object.keys(tasks);
  const otherDefaultMsg = conteiner.querySelector('.default');
  if (tasksKey.length === 0 && !otherDefaultMsg) {
>>>>>>> 15f1f34a0b7cd3e37d543034da46766526344123
    const defaultMsg = createDefaultMsgConteiner();
    conteiner.appendChild(defaultMsg);
  }
}

export function deleteDefaultMsg(conteiner) {
  const defaultMsg = conteiner.querySelector('.default');
  if (defaultMsg) deleteElement(defaultMsg);
}

export function countTheLeftItem(conteinerToPutTheCont) {
  const list = JSON.parse(localStorage.lists);
  const listInArray = Object.keys(list);
  const listCount = listInArray.length;
  conteinerToPutTheCont.innerText = listCount;
}
