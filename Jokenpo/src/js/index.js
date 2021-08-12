import * as utilities from './modules/utilities.js';

(() => {
  if (!localStorage.vitorias) localStorage.vitorias = +0;
  if (!localStorage.derrotas) localStorage.derrotas = +0;

  utilities.updateScoreboard();

  function whenIconsAreClicked(target) {
    const choice = target.dataset.icon;
    utilities.showChoice('jogador')(choice);
    utilities.addClassToAll('in-gray')('jogador');
    utilities.removeClass(target)('in-gray');
    utilities.showResultMessage('Clicar em "Jogar" para comerçar.');
    utilities.removeAttribute(utilities.buttonPlay)('disabled');
  }

  function whenButtonPlayIsCliked(target) {
    utilities.addClassToAll('jogada')('jogador');
    const icon = utilities.computerChoosing();
    utilities.removeClass(icon)('in-gray');
    const choice = icon.dataset.icon;
    utilities.showChoice('computador')(choice);
    const result = utilities.getResultOfTheMove();
    utilities.updateScoreboard();
    utilities.showResultOfTheMove(result);
    utilities.removeAttribute(utilities.buttonReset)('disabled');
    utilities.setAttribute(target)('disabled', 'disabled');
  }

  function whenButtonResetIsCliked(target) {
    utilities.addClassToAll('in-gray')('jogador');
    utilities.addClassToAll('in-gray')('computador');
    utilities.removeClassToAll('jogada')('jogador');
    utilities.setAttribute(target)('disabled', 'disabled');
    utilities.removeAllPossibleClassToResultMessagemConteiner();
    utilities.addClass(utilities.resultMessageConteiner)('mensagem');
    utilities.showResultMessage('Escolha uma para começar.');
    utilities.removeChoices();
  }

  document.body.addEventListener('click', (event) => {
    const { target } = event;
    if (target.classList.contains('icon') && !target.classList.contains('jogada')) whenIconsAreClicked(target);
    if (target.classList.contains('btn-jogar')) whenButtonPlayIsCliked(target);
    if (target.classList.contains('btn-reiniciar')) whenButtonResetIsCliked(target);
  });
})();
