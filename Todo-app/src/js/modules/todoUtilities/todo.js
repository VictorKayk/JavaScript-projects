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
