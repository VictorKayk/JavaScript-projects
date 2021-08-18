export function putFocusOn(element) {
  element.focus();
}

export function createElement(element) {
  return document.createElement(element);
}

export function addClassToElement(element) {
  return (classToElement) => element.classList.add(classToElement);
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
