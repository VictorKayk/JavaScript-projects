export function putFocusOn(element) {
  element.focus();
}

export function createElement(element) {
  return document.createElement(element);
}

export function addClassToElement(element) {
  return (classOfElement) => element.classList.add(classOfElement);
}

export function removeClassToElement(element) {
  return (classOfElement) => element.classList.remove(classOfElement);
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
