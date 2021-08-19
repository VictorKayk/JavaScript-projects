import createTodo from './addTodo.js';
import { putFocusOn, addClassToElement, removeClassToElement, putPlaceholderInTarget, getTasksConteiners } from '../common.js';

export function addTodo(conteiner) {
  return (target) => {
    const input = target.querySelector('input#create');
    const inputValue = input.value.trim();
    if (inputValue) {
      if (inputValue.length <= 20) {
        createTodo(conteiner)(false)(inputValue);
        removeClassToElement(input)('error');
        putPlaceholderInTarget(input)('Create a new todo...');
      } else {
        addClassToElement(input)('error');
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

export function countTheLeftItem(conteinerToContTask) {
  const tasksConteiners = getTasksConteiners(conteinerToContTask);
  const itemsNotChecked = tasksConteiners.filter((el) => !el.classList.contains('checked'));
  const numberOfItemsNotChecked = itemsNotChecked.length;
  return (conteinerToPutTheCont) => {
    conteinerToPutTheCont.innerText = numberOfItemsNotChecked;
  };
}

export function deleteElement(item) {
  item.remove();
}

export function deleteAllCompletedTasks(conteinerToContTask) {
  const tasksConteiner = conteinerToContTask.querySelectorAll('.task .item p.checked');
  tasksConteiner.forEach((taskCompleted) => {
    const task = taskCompleted.closest('div.task');
    deleteElement(task);
  });
}

export function initialTodo() {
  localStorage.tasks = localStorage.tasks || JSON.stringify({});
}

export function savingTodos(conteiner) {
  const tasksConteiners = getTasksConteiners(conteiner);
  const tasksInArray = [...tasksConteiners];
  const tasksInObject = tasksInArray.reduce((acc, item, index) => {
    acc[index] = {
      task: item.innerText,
      isChecked: item.classList.contains('checked'),
    };
    return acc;
  }, {});
  const tasksInJson = JSON.stringify(tasksInObject);
  localStorage.tasks = tasksInJson;
}

export function gettingTheTodos(conteiner) {
  const tasks = JSON.parse(localStorage.tasks);
  const tasksInArray = Object.values(tasks);
  tasksInArray.forEach(({ task, isChecked }) => createTodo(conteiner)(isChecked)(task));
}
