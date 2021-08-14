export function concat2Strings(urlWithoutNumber, number) {
  return `${urlWithoutNumber}${number}`;
}

function getRequest(url) {
  const data = fetch(url);
  return data.then((info) => info.json());
}

export async function getPokemonInfos(url) {
  const infos = await getRequest(url);
  return infos;
}

function createElement(element) {
  return document.createElement(element);
}

function addClassToElement(element) {
  return (classToAdd) => element.classList.add(classToAdd);
}

function createPokemonListItem() {
  const li = createElement('li');
  addClassToElement(li)('pokemon-conteiner');
  return li;
}

function getPokemonLinkConteiner(linkToPokePage) {
  const linkConteiner = createElement('a');
  linkConteiner.setAttribute('href', linkToPokePage);
  return linkConteiner;
}

function createPokemonLinkPage(id) {
  const link = `\\src\\html\\pokemon.html?id=${id}`;
  const linkConteiner = getPokemonLinkConteiner(link);
  return linkConteiner;
}

function createPokemonConteiner(firstType) {
  const pokemonCard = createElement('div');
  const addClassLinkConteiner = addClassToElement(pokemonCard);
  addClassLinkConteiner('card');
  addClassLinkConteiner(firstType);
  return pokemonCard;
}

function createPokemonImgCard(imgLink, alt = '') {
  const imgConteiner = createElement('img');
  addClassToElement(imgConteiner)('card-image');
  imgConteiner.setAttribute('src', imgLink);
  imgConteiner.setAttribute('alt', alt);
  return imgConteiner;
}

function getTextCard(element) {
  return (symbol) => (texts) => {
    const pConteiner = createElement(element);
    const text = texts.join(symbol);
    pConteiner.innerText = text;
    return pConteiner;
  };
}

function createPokemonTitle(title) {
  const pokemonTitles = getTextCard('h2')('. ')(title);
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
  const pokemonTypesInText = getTextCard('p')(' - ')(pokemonTypes);
  return pokemonTypesInText;
}

function createPokemonSubtitle(types) {
  const pokemonSubtitle = getPokemonTypesCard(types);
  addClassToElement(pokemonSubtitle)('card-subtitle');
  return pokemonSubtitle;
}

function createPokemonCard(id, firstType, front_default, name, types) {
  const pokemonCard = createPokemonConteiner(firstType);
  const pokemonImg = createPokemonImgCard(front_default, name);
  const pokemonTitles = createPokemonTitle([id, name]);
  const pokemonSubtitle = createPokemonSubtitle(types);
  pokemonCard.appendChild(pokemonImg);
  pokemonCard.appendChild(pokemonTitles);
  pokemonCard.appendChild(pokemonSubtitle);
  return pokemonCard;
}

export function getPokemonCard(id, firstType, front_default, name, types) {
  const pokemonListItem = createPokemonListItem();
  const pokemonLinkPage = createPokemonLinkPage(id);
  const pokemonCard = createPokemonCard(id, firstType, front_default, name, types);
  pokemonLinkPage.appendChild(pokemonCard);
  pokemonListItem.appendChild(pokemonLinkPage);
  return pokemonListItem;
}
