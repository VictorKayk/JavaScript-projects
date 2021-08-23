import { createElement, addClassOfElement, addAttributeToElement } from '../common.js';

function createCheckboxInput() {
  const checkbox = createElement('div');
  const checkboxInput = createElement('input');
  addAttributeToElement(checkboxInput)('type')('checkbox');
  addClassOfElement(checkboxInput)('checkboxInput');
  const checkMark = createElement('span');
  addClassOfElement(checkMark)('checkboxInput');
  addClassOfElement(checkMark)('checkmark');
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
  addClassOfElement(item)('item');
  return item;
}

function createDeleteButtonConteiner() {
  const imgDeleteButton = createElement('img');
  addAttributeToElement(imgDeleteButton)('src')('../../assets/img/icons/icon-cross.svg');
  addAttributeToElement(imgDeleteButton)('alt')('Delete Button');
  addClassOfElement(imgDeleteButton)('btn');
  addClassOfElement(imgDeleteButton)('delete-btn');
  return imgDeleteButton;
}

function createTaskConteiner() {
  const task = createElement('li');
  const item = createItemConteiner();
  const deleteButton = createDeleteButtonConteiner();
  task.appendChild(item);
  task.appendChild(deleteButton);
  addClassOfElement(task)('task');
  addAttributeToElement(task)('draggable')(true);
  return task;
}

function checkTodo(task) {
  const checkboxInput = task.querySelector('.task .item div input');
  addAttributeToElement(checkboxInput)('checked')('true');
  const itemText = task.querySelector('.task .item p');
  addClassOfElement(itemText)('checked');
}

export default function createTodo(isChecked) {
  const task = createTaskConteiner();
  if (isChecked) checkTodo(task);
  return (text) => {
    const itemText = task.querySelector('.task .item p');
    itemText.innerText = text;
    return task;
  };
}
