import { createElement, addClassOfElement, addAttributeToElement } from '../common.js';

function createItemTextConteiner() {
  const itemText = createElement('p');
  itemText.id = document.body.querySelectorAll('.task .item p').length;
  return itemText;
}

function createItemConteiner() {
  const item = createElement('div');
  const itemText = createItemTextConteiner();
  item.appendChild(itemText);
  addClassOfElement(item)('item');
  return item;
}

function createDeleteButtonConteiner() {
  const imgDeleteButton = createElement('img');
  addAttributeToElement(imgDeleteButton)('src')('../assets/img/icons/icon-cross.svg');
  addAttributeToElement(imgDeleteButton)('alt')('Delete Button');
  addClassOfElement(imgDeleteButton)('btn');
  addClassOfElement(imgDeleteButton)('delete-btn');
  return imgDeleteButton;
}

function createLinkToList() {
  const linkToList = createElement('a');
  return linkToList;
}

function createTaskConteiner() {
  const task = createElement('li');
  const linkToList = createLinkToList();
  const item = createItemConteiner();
  const deleteButton = createDeleteButtonConteiner();
  linkToList.appendChild(item);
  task.appendChild(linkToList);
  task.appendChild(deleteButton);
  addClassOfElement(task)('task');
  addAttributeToElement(task)('draggable')(true);
  return task;
}

export default function createTodo(text) {
  const task = createTaskConteiner();
  const itemText = task.querySelector('.task .item p');
  itemText.innerText = text;
  return task;
}
