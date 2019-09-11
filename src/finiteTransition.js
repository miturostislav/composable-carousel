import { createSlideTransition, defaultOptions } from './utils/transitionUtils';

const transitionTo = (carousel, goTo) => {
  const transitionToSlide = createSlideTransition(carousel);
  return index => {
    if (index !== carousel.activeSlideIndex) {
      return transitionToSlide(index).then(() => goTo(index));
    } else {
      return goTo(index);
    }
  };
};

const finiteTransition = options => carousel => {
  const goTo = carousel.goTo;
  const finalOptions = Object.assign({}, defaultOptions, options);
  Object.assign(carousel, finalOptions, {
    goTo: transitionTo(carousel, goTo),
  });
};

export default finiteTransition;
