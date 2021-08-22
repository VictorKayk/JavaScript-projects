import { savingTodos } from './util/todo/todo.js';
import { addClassOfElement, removeClassOfElement } from './util/common.js';

// Conteiners
const viewingTasks = document.body.querySelector('main section ul#viewing-tasks');

function getDragAfterElement(conteiner, y) {
  const tasks = conteiner.querySelectorAll('.task:not(.ghost)');
  const tasksInArray = [...tasks];

  return tasksInArray.reduce((acc, item) => {
    const box = item.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > acc.offset) return { offset, item };
    return acc;
  }, { offset: Number.NEGATIVE_INFINITY }).item;
}

export default function dragAndDrop() {
  window.addEventListener('dragstart', (e) => {
    const { target } = e;
    if (target.classList.contains('task')) addClassOfElement(target)('ghost');
  });

  window.addEventListener('dragend', (e) => {
    const { target } = e;
    if (target.classList.contains('task')) {
      removeClassOfElement(target)('ghost');
      savingTodos(viewingTasks);
    }
  });

  viewingTasks.addEventListener('dragenter', (e) => {
    const { target } = e;
    addClassOfElement(target)('over');
  });

  viewingTasks.addEventListener('dragleave', (e) => {
    const { target } = e;
    removeClassOfElement(target)('over');
  });

  viewingTasks.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(viewingTasks, e.clientY);
    const task = document.querySelector('main ul#viewing-tasks li.task.ghost');
    if (afterElement) viewingTasks.insertBefore(task, afterElement);
    else viewingTasks.appendChild(task);
  });

  viewingTasks.addEventListener('drop', (e) => {
    e.preventDefault();
    const { target } = e;
    removeClassOfElement(target)('over');
  });
}
