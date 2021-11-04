import * as utilities from './module/utilities.js';

// Conteiners
const idConteiner = document.body.querySelector('section#pokemon-infos div#id h2 strong');
const pokemonNameConteiner = document.body.querySelector('#pokemon-name');
const pokemonImgConteiner = document.body.querySelector('#pokemon #pokemon-img');
const typesConteiner = document.querySelector('section#pokemon-infos div ul#types');
const alturaConteiner = document.body.querySelector('section#pokemon-infos h2#altura strong');
const pesoConteiner = document.body.querySelector('section#pokemon-infos h2#peso strong');
const movesConteiner = document.body.querySelector('section#pokemon-infos #moves ul');
const abilitiesConteiner = document.body.querySelector('section#pokemon-infos #abilities ul');

function getPokemonIdOnUrl() {
  const url = new URLSearchParams(window.location.search);
  const pokemonId = url.get('id');
  return pokemonId;
}

function getTheAPIUrl() {
  return 'https://pokeapi.co/api/v2/pokemon/';
}

function putPokemonInfosOnPage(name, types, front_default, id, height, weight, moves, abilities) {
  utilities.putPokemonNameOnTitle(name);
  utilities.putPokemonName(pokemonNameConteiner)(name);
  const firstType = utilities.getFirstType(types);
  utilities.putPokemonImgCard(pokemonImgConteiner)(firstType)(front_default, name);
  utilities.putPokemonInfoText(idConteiner)(id);
  utilities.putPokemonTypes(typesConteiner)(types);
  utilities.putPokemonInfoText(alturaConteiner)(height);
  utilities.putPokemonInfoText(pesoConteiner)(weight);
  utilities.putPokemonListInfo(movesConteiner)(moves);
  utilities.putPokemonListInfo(abilitiesConteiner)(abilities);
}

(function () {
  async function getPokemonPage() {
    const pokemonId = getPokemonIdOnUrl();
    const url = getTheAPIUrl();
    const realUrl = utilities.concat2Strings(url, pokemonId);
    const {
      sprites: { front_default },
      name,
      types,
      height,
      weight,
      moves,
      abilities,
    } = await utilities.getPokemonInfos(realUrl);

    putPokemonInfosOnPage(name, types, front_default, pokemonId, height, weight, moves, abilities);
  }

  getPokemonPage();
}());
