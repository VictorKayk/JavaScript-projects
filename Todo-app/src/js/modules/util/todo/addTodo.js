import { createElement, addClassToElement, addAttributeToElement, getTasksConteiners } from '../common.js';

function createCheckboxInput() {
  const checkbox = createElement('div');
  const checkboxInput = createElement('input');
  addAttributeToElement(checkboxInput)('type')('checkbox');
  addClassToElement(checkboxInput)('checkboxInput');
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
  const imgDeleteButton = createElement('img');
  addAttributeToElement(imgDeleteButton)('src')('../assets/img/icons/icon-cross.svg');
  addAttributeToElement(imgDeleteButton)('alt')('Delete Button');
  addClassToElement(imgDeleteButton)('btn');
  addClassToElement(imgDeleteButton)('delete-btn');
  return imgDeleteButton;
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

function checkTodo(task) {
  const checkboxInput = task.querySelector('.task .item div input');
  addAttributeToElement(checkboxInput)('checked')('true');
  const itemText = task.querySelector('.task .item p');
  addClassToElement(itemText)('checked');
}

export default function createTodo(conteiner) {
  const task = createTaskConteiner();
  return (isChecked) => {
    if (isChecked) checkTodo(task);
    return (text) => {
      const itemText = task.querySelector('.task .item p');
      itemText.innerText = text;
      conteiner.appendChild(task);
    };
  };
}
