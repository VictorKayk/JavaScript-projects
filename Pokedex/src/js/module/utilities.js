export function concat2Strings(urlWithoutNumber, number) {
  return `${urlWithoutNumber}${number}`;
}

function getRequest(url) {
  const data = fetch(url);
  return data.then((info) => info.json());
}

export async function getPokemonInfos(url) {
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

function getPokemonImgCard(imgLink) {
  const imgConteiner = createElement('img');
  addClassToElement(imgConteiner)('card-image');
  imgConteiner.setAttribute('src', imgLink);
  return imgConteiner;
}

function getTextCard(symbol) {
  return (texts) => {
    const pConteiner = createElement('p');
    const text = texts.join(symbol);
    pConteiner.innerText = text;
    return pConteiner;
  };
}

function getPokemonTitle(title) {
  const pokemonTitles = getTextCard('. ')(title);
  addClassToElement(pokemonTitles)('card-title');
  return pokemonTitles;
}

function getTypes(types) {
  const typesOfPokemon = [];
  types.forEach((el) => typesOfPokemon.push(el.type.name));
  return typesOfPokemon;
}

function getPokemonTypesCard(types) {
  const pokemonTypes = getTypes(types);
  const pokemonTypesInText = getTextCard(' - ')(pokemonTypes);
  return pokemonTypesInText;
}

function getPokemonSubtitle(types) {
  const pokemonSubtitle = getPokemonTypesCard(types);
  addClassToElement(pokemonSubtitle)('card-subtitle');
  return pokemonSubtitle;
}

export function getPokemonCard(firstTypeOfPokemon, front_default, id, name, types) {
  const pokemonCard = createPokemonCard(firstTypeOfPokemon);
  const pokemonImg = getPokemonImgCard(front_default);
  const pokemonTitles = getPokemonTitle([id, name]);
  const pokemonSubtitle = getPokemonSubtitle(types);
  pokemonCard.appendChild(pokemonImg);
  pokemonCard.appendChild(pokemonTitles);
  pokemonCard.appendChild(pokemonSubtitle);
  return pokemonCard;
}
