import { createElement, addClassOfElement, addAttributeToElement } from '../common.js';

function createItemTextConteiner(id) {
  const itemText = createElement('p');
  // O problema ta aqui, se eu conseguir fazer com que o id do item,
  // seja sempre o mesmo de seu semelhante no localHost, pronto
  itemText.id = id;
  return itemText;
}

function createItemConteiner(id) {
  const item = createElement('div');
  const itemText = createItemTextConteiner(id);
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

function createTaskConteiner(id) {
  const task = createElement('li');
  const linkToList = createLinkToList();
  const item = createItemConteiner(id);
  const deleteButton = createDeleteButtonConteiner();
  linkToList.appendChild(item);
  task.appendChild(linkToList);
  task.appendChild(deleteButton);
  addClassOfElement(task)('task');
  addAttributeToElement(task)('draggable')(true);
  return task;
}

export default function createTodo(text, id) {
  const task = createTaskConteiner(id);
  const itemText = task.querySelector('.task .item p');
  itemText.innerText = text;
  return task;
}
