import createTodo from './addTodo.js';
import { putFocusOn } from '../utilities.js';

export function addTodo(conteiner) {
  return (target) => {
    const input = target.querySelector('input#create');
    createTodo(conteiner)(input.value);
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
