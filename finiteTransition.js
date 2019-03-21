const defaultOptions = {
  ms: 200,
  easing: 'ease-out',
};

const goTo = (parentGoTo, carousel) => index => {
  return new Promise(resolve => {
    carousel.frame.addEventListener(
      'transitionend',
      function onTransitionEnd() {
        carousel.selector.removeEventListener('transitionend', onTransitionEnd);
        resolve();
      }
    );
    parentGoTo(index);
  });
};

const finiteTransition = options => carousel => {
  const finalOptions = Object.assign({}, defaultOptions, options);
  const buildCarousel = carousel.build;
  const destroyCarousel = carousel.destroy;
  Object.assign(carousel, { goTo: goTo(carousel.goTo, carousel) });
  carousel.build = () => {
    return buildCarousel().then(() => {
      carousel.frame.style.setProperty(
        'transition',
        `transform ${finalOptions.ms}ms ${finalOptions.easing}`
      );
    });
  };
  carousel.destroy = () => {
    carousel.frame.style.removeProperty('transition');
    return destroyCarousel();
  };
};

export default finiteTransition;
