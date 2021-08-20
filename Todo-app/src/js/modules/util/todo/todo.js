import createTodo from './addTodo.js';
import { putFocusOn, addClassOfElement, removeClassOfElement, putPlaceholderInTarget, getTasksConteiners, removeClassOfMutipleElements, createElement } from '../common.js';

export function addTodo(conteiner) {
  return (target) => {
    const input = target.querySelector('input#create');
    const inputValue = input.value.trim();
    if (inputValue) {
      if (inputValue.length <= 20) {
        createTodo(conteiner)(false)(inputValue);
        removeClassOfElement(input)('error');
        putPlaceholderInTarget(input)('Create a new todo...');
      } else {
        addClassOfElement(input)('error');
        putPlaceholderInTarget(input)('Task too long. (20 characters max)');
      }
    }
    input.value = '';
    putFocusOn(input);
  };
}

export function toggleItemChecked(target) {
  const item = target.closest('div.item');
  const itemText = item.querySelector('p');
  itemText.classList.toggle('checked');
}

export function countTheLeftItem() {
  const tasks = JSON.parse(localStorage.tasks);
  const itemsNotChecked = Object.values(tasks.Active);
  const numberOfItemsNotChecked = itemsNotChecked.length;
  return (conteinerToPutTheCont) => {
    conteinerToPutTheCont.innerText = numberOfItemsNotChecked;
  };
}

export function deleteElement(item) {
  item.remove();
}

function deleteTasks(tasksConteiner) {
  return tasksConteiner.forEach((tasks) => {
    const task = tasks.closest('div.task');
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

function savingAllTodos(conteiner) {
  const tasksConteiners = getTasksConteiners(conteiner);
  const tasksInArray = [...tasksConteiners];
  const Active = tasksInArray.reduce((acc, item, index) => {
    if (!item.classList.contains('checked')) {
      acc[index] = {
        task: item.innerText,
        isChecked: item.classList.contains('checked'),
      };
    }
    return acc;
  }, {});
  const Completed = tasksInArray.reduce((acc, item, index) => {
    if (item.classList.contains('checked')) {
      acc[index] = {
        task: item.innerText,
        isChecked: item.classList.contains('checked'),
      };
    }
    return acc;
  }, {});

  const All = { ...Active, ...Completed };
  const tasksInJson = JSON.stringify({
    Active,
    Completed,
    All,
  });
  localStorage.tasks = tasksInJson;
}

export function savingTodos(conteiner) {
  if (localStorage.state === 'All') savingAllTodos(conteiner);
  else if (localStorage.state === 'Active') {
  } else if (localStorage.state === 'Completed') {
  }
}

export function gettingTheTodos(conteiner) {
  const tasks = JSON.parse(localStorage.tasks);
  const tasksOfState = tasks[localStorage.state];
  const tasksInArray = Object.values(tasksOfState);
  tasksInArray.forEach(({ task, isChecked }) => createTodo(conteiner)(isChecked)(task));
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
  const defaultMsg = createElement('div');
  addClassOfElement(defaultMsg)('default');
  const defaultText = createElement('p');
  defaultText.innerText = 'It has no todo. Create one.';
  defaultMsg.appendChild(defaultText);
  return defaultMsg;
}

export function defaultMsgIfIsEmpty(conteiner) {
  if (conteiner.children.length === 0) {
    const defaultMsg = createDefaultMsgConteiner();
    conteiner.appendChild(defaultMsg);
  }
}

export function deleteDefaultMsg(conteiner) {
  const defaultMsg = conteiner.querySelector('div.default');
  if (defaultMsg) deleteElement(defaultMsg);
}
