import { getPokemonInfos, concat2Strings } from './module/utilities.js';

function getPokemonIdOnUrl() {
  const url = new URLSearchParams(window.location.search);
  const pokemonId = url.get('id');
  return pokemonId;
}

function capitalizeText(text) {
  return text.slice(0, 1).toUpperCase() + text.slice(1);
}

function putPokemonNameOnTitle(id) {
  return (name) => {
    const title = document.querySelector('title');
    const nameCapitalized = capitalizeText(name);
    title.innerText = `${id}. ${nameCapitalized}`;
  };
}

const pokemonNameConteiner = document.body.querySelector('#pokemon-name');
function putPokemonName(name) {
  pokemonNameConteiner.innerText = capitalizeText(name);
}

(function () {
  async function getPokemonPage() {
    const url = 'https://pokeapi.co/api/v2/pokemon/';
    const pokemonId = getPokemonIdOnUrl();
    const realUrl = concat2Strings(url, pokemonId);
    const { sprites: { front_default }, id, name, types, moves, abilities } = await getPokemonInfos(realUrl);

    putPokemonNameOnTitle(id)(name);
    putPokemonName(name);
  }

  getPokemonPage();
}());
