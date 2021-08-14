import { getPokemonInfos, getPokemonCard, concat2Strings } from './module/utilities.js';

const pokedexConteiner = document.querySelector('main ul.pokedex');

(function () {
  function getPokedex(pokedexConteiner) {
    return async (url) => {
      for (let cont = 1; cont <= 10; cont += 1) {
        const realUrl = concat2Strings(url, cont);

        const { sprites: { front_default }, id, name, types } = await getPokemonInfos(realUrl);
        const firstTypeOfPokemon = types[0].type.name;
        const pokemonCard = getPokemonCard(id, firstTypeOfPokemon, front_default, name, types);

        pokedexConteiner.appendChild(pokemonCard);
      }
    };
  }

  getPokedex(pokedexConteiner)('https://pokeapi.co/api/v2/pokemon/');
}());
