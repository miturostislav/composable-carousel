const defaultOptions = {
  ms: 200,
  easing: 'ease-out',
};

const goTo = (parentGoTo, carousel) => index => {
  return new Promise(resolve => {
    carousel.frame.addEventListener(
      'transitionend',
      function onTransitionEnd() {
        carousel.selector.removeEventListener('transitioned', onTransitionEnd);
        resolve();
      }
    );
    parentGoTo(index);
  });
};

const finiteTransition = options => carousel => {
  const finalOptions = Object.assign({}, defaultOptions, options);
  Object.assign(carousel, { goTo: goTo(carousel.goTo, carousel) });
  carousel.frame.style.setProperty(
    'transition',
    `transform ${finalOptions.ms}ms ${finalOptions.easing}`
  );
};

export default finiteTransition;