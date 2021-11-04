export function concat2Strings(urlWithoutNumber, number) {
  return `${urlWithoutNumber}${number}`;
}

export function getFirstType(types) {
  return types[0].type.name;
}

function getRequest(url) {
  const data = fetch(url);
  return data.then((info) => info.json());
}

export async function getPokemonInfos(url) {
  const infos = await getRequest(url);
  return infos;
}

export function createElement(element) {
  return document.createElement(element);
}

export function addClassToElement(element) {
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
  const link = `pokemon\\?id=${id}`;
  const linkConteiner = getPokemonLinkConteiner(link);
  return linkConteiner;
}

export function createPokemonConteiner(firstType) {
  const pokemonCard = createElement('div');
  const addClassLinkConteiner = addClassToElement(pokemonCard);
  addClassLinkConteiner('card');
  addClassLinkConteiner(firstType);
  return pokemonCard;
}

export function createPokemonImgCard(imgLink, alt = '') {
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

export function getTypes(types) {
  const typesOfPokemon = [];
  types.forEach((el) => typesOfPokemon.push(el.type.name));
  return typesOfPokemon;
}

export function getTypeInPortugues(type) {
  const possibleTypes = {
    steel: 'Ferro',
    fire: 'Fogo',
    grass: 'Grama',
    electric: 'Elétrico',
    water: 'Água',
    ice: 'Gelo',
    ground: 'Terra',
    rock: 'Pedra',
    poison: 'Veneno',
    fairy: 'Fada',
    bug: 'Inseto',
    dragon: 'Dragão',
    psychic: 'Psíquico',
    flying: 'Voador',
    fighting: 'Lutador',
    normal: 'Normal',
  };
  return possibleTypes[type];
}

function getTypesInPortugues(types) {
  return types.map((type) => getTypeInPortugues(type));
}

function getPokemonTypesCard(types) {
  const pokemonTypes = getTypes(types);
  const pokemonTypesInPortugues = getTypesInPortugues(pokemonTypes);
  const pokemonTypesInText = getTextCard('p')(' - ')(pokemonTypesInPortugues);
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

function capitalizeText(text) {
  return text.slice(0, 1).toUpperCase() + text.slice(1);
}

export function putPokemonNameOnTitle(name) {
  const title = document.querySelector('title');
  const nameCapitalized = capitalizeText(name);
  title.innerText = nameCapitalized;
}

export function putPokemonName(conteiner) {
  return (name) => {
    conteiner.innerText = capitalizeText(name);
  };
}

export function putPokemonImgCard(conteiner) {
  return (firstType) => {
    const pokemonCard = createPokemonConteiner(firstType);
    return (imgLink, alt = '') => {
      const pokemonImg = createPokemonImgCard(imgLink, alt);
      pokemonCard.appendChild(pokemonImg);
      conteiner.appendChild(pokemonCard);
    };
  };
}

export function putPokemonInfoText(conteiner) {
  return (text) => {
    conteiner.innerText = text;
  };
}

function createTypeConteiner(type) {
  const li = createElement('li');
  const p = createElement('p');
  p.innerText = getTypeInPortugues(type);
  addClassToElement(p)(type);
  li.appendChild(p);
  return li;
}

export function putPokemonTypes(conteiner) {
  return (types) => {
    const pokemonTypes = getTypes(types);
    const pokemonTypesConteiner = pokemonTypes.map((type) => createTypeConteiner(type));
    pokemonTypesConteiner.forEach((type) => conteiner.appendChild(type));
  };
}

function getListChoice(list) {
  return Object.keys(list[0])[0];
}

function getListNames(list) {
  return (choice) => list.map((item) => capitalizeText(item[choice].name));
}

function getListConteiner(item) {
  const li = createElement('li');
  const p = createElement('p');
  putPokemonInfoText(p)(item);
  li.appendChild(p);
  return li;
}

export function putPokemonListInfo(conteiner) {
  return (list) => {
    const choice = getListChoice(list);
    const listNames = getListNames(list)(choice);
    listNames.forEach((item) => {
      const listConteiner = getListConteiner(item);
      conteiner.appendChild(listConteiner);
    });
  };
}
