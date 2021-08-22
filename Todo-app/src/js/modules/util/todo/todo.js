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
  const tasks = JSON.parse(localStorage.tasks);
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
  localStorage.tasks = localStorage.tasks || JSON.stringify({ Active: {}, Completed: {}, All: {} });
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
  const tasksConteiners = getTasksConteiners(conteiner);
  const tasksInArray = [...tasksConteiners];
  const tasks = getAllStateTasks(tasksInArray);
  const tasksInJson = JSON.stringify(tasks);
  localStorage.tasks = tasksInJson;
}

export function gettingTheTodos(conteiner) {
  const tasks = JSON.parse(localStorage.tasks);
  const tasksOfState = tasks.All;
  const tasksInArray = Object.values(tasksOfState);
  tasksInArray.forEach(({ task, isChecked }) => {
    const todo = createTodo(isChecked)(task);
    if (localStorage.state === 'Active' && isChecked) addClassOfElement(todo)('hide');
    else if (localStorage.state === 'Completed' && !isChecked) addClassOfElement(todo)('hide');
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
  if (localStorage.state === 'All' || localStorage.state === 'Active') defaultText.innerText = 'It has no todo. Create one.';
  else if (localStorage.state === 'Completed') defaultText.innerText = 'It has no todo. Complete one.';
  defaultMsg.appendChild(defaultText);
  return defaultMsg;
}

export function defaultMsgIfIsEmpty(conteiner) {
  const tasks = JSON.parse(localStorage.tasks);
  const tasksOnState = Object.values(tasks[localStorage.state]);
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
