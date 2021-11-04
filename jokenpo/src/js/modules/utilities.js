export const victory = document.body.querySelector('#scoreboard #vitorias h2');
export const defeat = document.body.querySelector('#scoreboard #derrotas h2');

export const choiceConteiner = document.body.querySelectorAll('#game-board .escolhas .escolha p');

export const iconsConteiner = document.querySelectorAll('#game-board .icones');

export const resultMessage = document.body.querySelector('#resultado .mensagem h4');
export const resultMessageConteiner = document.body.querySelector('#resultado .mensagem');

export const buttonPlay = document.body.querySelector('.btn .btn-jogar');
export const buttonReset = document.body.querySelector('.btn .btn-reiniciar');

export const icons = document.body.querySelectorAll('#game-board div .icones');

export function updateScoreboard() {
  victory.textContent = `Vitorias: ${localStorage.vitorias}`;
  defeat.textContent = `Derrotas: ${localStorage.derrotas}`;
}

export function executeClassListFunctionToAllElements(values) {
  return (fn) => (parameter) => values
    .forEach((valeu) => valeu.classList[fn](parameter.toLowerCase()));
}

export function showChoice(player) {
  const numberOfPlayer = getPlayer(player);
  return (choice) => {
    choiceConteiner[numberOfPlayer].textContent = choice;
  };
}

export function removeChoices() {
  const numberOfPlayer = 0;
  const numberOfComputer = 1;
  choiceConteiner[numberOfPlayer].textContent = '';
  choiceConteiner[numberOfComputer].textContent = '';
}

export function getPlayer(player) {
  const players = {
    jogador: 0,
    computador: 1,
  };
  return players[player.toLowerCase()];
}

export function getIcons(player) {
  const numberOfPlayer = getPlayer(player);
  const iconsImg = iconsConteiner[numberOfPlayer].querySelectorAll('img');
  return iconsImg;
}

export function addClass(target) {
  return (classToAdd) => target.classList.add(classToAdd.toLowerCase());
}

export function removeClass(target) {
  return (classToRemove) => target.classList.remove(classToRemove.toLowerCase());
}

export function removeClassToAll(classToRemove) {
  return (player) => {
    const iconsOfThePlayer = getIcons(player);
    executeClassListFunctionToAllElements(iconsOfThePlayer)('remove')(classToRemove);
  };
}

export function addClassToAll(classToAdd) {
  return (player) => {
    const iconsOfThePlayer = getIcons(player);
    executeClassListFunctionToAllElements(iconsOfThePlayer)('add')(classToAdd);
  };
}

export function removeAllPossibleClassToResultMessagemConteiner() {
  removeClass(resultMessageConteiner)('mensagem');
  removeClass(resultMessageConteiner)('victory');
  removeClass(resultMessageConteiner)('defeat');
  removeClass(resultMessageConteiner)('draw');
}

export function showResultMessage(msg) {
  resultMessage.textContent = msg;
}

export function setAttribute(target) {
  return (name, value) => target.setAttribute(name, value);
}

export function removeAttribute(target) {
  return (attr) => target.removeAttribute(attr);
}

export function getChoice(player) {
  const numberOfPlayer = getPlayer(player);
  const possibleChoices = {
    pedra: 0,
    papel: 1,
    tesoura: 2,
  };
  const choiceString = choiceConteiner[numberOfPlayer].textContent.toLowerCase();
  return possibleChoices[choiceString];
}

export function getRandomNumber(min = 0, max = 1) {
  return Math.floor(Math.random() * (max - min + 1) - min);
}

export function computerChoosing() {
  const numberOfPlayer = 1;
  const numberOfChoice = getRandomNumber(0, 2);
  const iconsToChoice = icons[numberOfPlayer].querySelectorAll('[data-icon]');
  const icon = iconsToChoice[numberOfChoice];
  return icon;
}

export function getResultOfTheMove() {
  const choicePlayer = getChoice('jogador');
  const choiceComputer = getChoice('computador');
  if (choicePlayer === choiceComputer) return 'draw';
  if (choicePlayer === 0) {
    if (choiceComputer === 2) {
      localStorage.vitorias = Number(localStorage.vitorias) + 1;
      return 'victory';
    }
  } else if (choicePlayer === 1) {
    if (choiceComputer === 0) {
      localStorage.vitorias = Number(localStorage.vitorias) + 1;
      return 'victory';
    }
  } else if (choicePlayer === 2) {
    if (choiceComputer === 1) {
      localStorage.vitorias = Number(localStorage.vitorias) + 1;
      return 'victory';
    }
  }
  localStorage.derrotas = Number(localStorage.derrotas) + 1;
  return 'defeat';
}

export function showResultOfTheMove(result) {
  const possibleResults = {
    victory: 'Você ganhou!!!',
    defeat: 'Você perdeu!!!',
    draw: 'Você empatou!!!',
  };
  removeAllPossibleClassToResultMessagemConteiner();
  addClass(resultMessageConteiner)(result);
  showResultMessage(possibleResults[result]);
}
