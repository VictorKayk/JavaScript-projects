function getRequest(url) {
  const data = fetch(url);
  return data.then((info) => info.json());
}

function concat2Strings(urlWithoutNumber, number) {
  return `${urlWithoutNumber}${number}`;
}

async function getPokemonInfos(url) {
  const { sprites: { front_default }, id, name, types } = await getRequest(url);
  return {
    front_default,
    id,
    name,
    types,
  };
}

function createElement(element) {
  return document.createElement(element);
}

function addClassToElement(element) {
  return (classToAdd) => element.classList.add(classToAdd);
}

function createPokemonCard(firstType) {
  const li = createElement('li');
  const addClassInLi = addClassToElement(li);
  addClassInLi('card');
  addClassInLi(firstType);
  return li;
}

function addImgOnPokemonCard(imgLink) {
  const imgConteiner = createElement('img');
  imgConteiner.setAttribute('src', imgLink);
  return (pokemonCard) => pokemonCard.appendChild(imgConteiner);
}

async function getPokedex(url) {
  for (let cont = 1; cont <= 10; cont += 1) {
    const realUrl = concat2Strings(url, cont);
    const { front_default, id, name, types } = await getPokemonInfos(realUrl);
    const firstTypeOfPokemon = types[0].type.name;
    const pokemonCard = createPokemonCard(firstTypeOfPokemon);
    addImgOnPokemonCard(front_default)(pokemonCard);
  }
}

const pokedexConteiner = document.querySelector('main ul.pokedex');
getPokedex('https://pokeapi.co/api/v2/pokemon/');
