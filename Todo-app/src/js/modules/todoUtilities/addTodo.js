import { createElement, addClassToElement, addAttributeToElement } from '../utilities.js';

function createRadioInput() {
  const radio = createElement('div');
  const radioInput = createElement('input');
  addAttributeToElement(radioInput)('type')('radio');
  const checkMark = createElement('span');
  addClassToElement(checkMark)('checkmark');
  radio.appendChild(radioInput);
  radio.appendChild(checkMark);
  return radio;
}

function createItemTextConteiner() {
  const itemText = createElement('p');
  return itemText;
}

function createItemConteiner() {
  const item = createElement('div');
  const radio = createRadioInput();
  const itemText = createItemTextConteiner();
  item.appendChild(radio);
  item.appendChild(itemText);
  addClassToElement(item)('item');
  return item;
}

function createDeleteButtonConteiner() {
  const deleteButton = createElement('button');
  const imgDeleteButton = createElement('img');
  addAttributeToElement(imgDeleteButton)('src')('../assets/img/icons/icon-cross.svg');
  addAttributeToElement(imgDeleteButton)('alt')('Delete Button');
  deleteButton.appendChild(imgDeleteButton);
  addClassToElement(deleteButton)('btn');
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
