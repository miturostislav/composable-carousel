import curry from 'lodash.curry';

export const addStyle = curry((styles, el) => {
  styles.forEach(style => {
    el.style.setProperty(style[0], style[1]);
  });
  return el;
});

export const removeStyle = curry((prop, el) => {
  el.style.removeProperty(prop);
  return el;
});

export function createElement({ tagName, attrs = {}, content }) {
  const el = document.createElement(tagName);
  Object.entries(attrs).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });
  if (content) {
    el.appendChild(content);
  }

  return el;
}

export function createFragment(elements) {
  const fragment = document.createDocumentFragment();
  elements.forEach(element => {
    fragment.appendChild(element);
  });
  return fragment;
}
