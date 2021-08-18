import { createElement, addClassToElement, addAttributeToElement } from '../utilities.js';

function createCheckboxInput() {
  const checkbox = createElement('div');
  const checkboxInput = createElement('input');
  addClassToElement(checkboxInput)('checkboxInput');
  addAttributeToElement(checkboxInput)('type')('checkbox');
  const checkMark = createElement('span');
  addClassToElement(checkMark)('checkboxInput');
  addClassToElement(checkMark)('checkmark');
  checkbox.appendChild(checkboxInput);
  checkbox.appendChild(checkMark);
  return checkbox;
}

function createItemTextConteiner() {
  const itemText = createElement('p');
  return itemText;
}

function createItemConteiner() {
  const item = createElement('div');
  const checkbox = createCheckboxInput();
  const itemText = createItemTextConteiner();
  item.appendChild(checkbox);
  item.appendChild(itemText);
  addClassToElement(item)('item');
  return item;
}

function createDeleteButtonConteiner() {
  const deleteButton = createElement('button');
  const imgDeleteButton = createElement('img');
  addAttributeToElement(imgDeleteButton)('src')('../assets/img/icons/icon-cross.svg');
  addAttributeToElement(imgDeleteButton)('alt')('Delete Button');
  addClassToElement(imgDeleteButton)('delete-btn');
  deleteButton.appendChild(imgDeleteButton);
  addClassToElement(deleteButton)('btn');
  addClassToElement(deleteButton)('delete-btn');
  return deleteButton;
}

function createTaskConteiner() {
  const task = createElement('div');
  const item = createItemConteiner();
  const deleteButton = createDeleteButtonConteiner();
  task.appendChild(item);
  task.appendChild(deleteButton);
  addClassToElement(task)('task');
  return task;
}

export default function createTodo(conteiner) {
  const task = createTaskConteiner();
  return (text) => {
    const itemText = task.querySelector('.task .item p');
    itemText.innerText = text;
    conteiner.appendChild(task);
  };
}
