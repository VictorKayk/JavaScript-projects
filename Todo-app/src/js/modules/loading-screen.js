import { addClassOfElement, removeClassOfElement } from './util/common.js';

// Conteiner
const loadConteiner = document.body.querySelector('div#load');
const header = document.body.querySelector('header');
const main = document.body.querySelector('main');
const footer = document.body.querySelector('footer#todo-footer');

export default function stopLoad() {
  setTimeout(() => {
    addClassOfElement(loadConteiner)('hide');
    removeClassOfElement(header)('hide');
    removeClassOfElement(main)('hide');
    removeClassOfElement(footer)('hide');
  }, 300);
}
