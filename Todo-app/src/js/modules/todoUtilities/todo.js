import createTodo from './addTodo.js';
import { putFocusOn, addClassToElement, removeClassToElement, putPlaceholderInTarget } from '../utilities.js';

export function addTodo(conteiner) {
  return (target) => {
    const input = target.querySelector('input#create');
    const inputValue = input.value.trim();
    if (inputValue) {
      if (inputValue.length <= 20) {
        createTodo(conteiner)(inputValue);
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
  const parentCheckboxInput = target.parentElement;
  const item = parentCheckboxInput.parentElement;
  const itemText = item.querySelector('p');
  itemText.classList.toggle('checked');
}

export function countTheLeftItem(conteinerToContTask) {
  const tasks = [...conteinerToContTask.querySelectorAll('.task .item p')];
  const itemsNotChecked = tasks.filter((el) => !el.classList.contains('checked'));
  const numberOfItemsNotChecked = itemsNotChecked.length;
  return (conteinerToPutTheCont) => {
    conteinerToPutTheCont.innerText = numberOfItemsNotChecked;
  };
}

export function deleteElement(target) {
  const item = target.parentElement;
  item.remove();
}
