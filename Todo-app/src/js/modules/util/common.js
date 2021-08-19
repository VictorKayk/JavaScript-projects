export function putFocusOn(element) {
  element.focus();
}

export function createElement(element) {
  return document.createElement(element);
}

export function addClassOfElement(element) {
  return (classOfElement) => element.classList.add(classOfElement);
}

export function removeClassOfElement(element) {
  return (classOfElement) => element.classList.remove(classOfElement);
}

export function removeClassOfMutipleElements(conteiner) {
  return (classOfElement) => conteiner.forEach((el) => removeClassOfElement(el)(classOfElement));
}

export function addIdToElement(element) {
  return (idToElement) => {
    element.id = idToElement;
  };
}

export function addAttributeToElement(element) {
  return (nameOfAttribute) => (attributeToElement) => element
    .setAttribute(nameOfAttribute, attributeToElement);
}

export function putPlaceholderInTarget(target) {
  return (msg) => target.placeholder = msg;
}

export function getTasksConteiners(conteiner) {
  return [...conteiner.querySelectorAll('.task .item p')];
}
