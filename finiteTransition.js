import { createSlideTransition, defaultOptions } from './utils/transitionUtils';

const goTo = carousel => {
  const transitionToSlide = createSlideTransition(carousel);
  return index => {
    if (index !== carousel.activeSlideIndex) {
      carousel.activeSlideIndex = index;
      return transitionToSlide(index);
    } else {
      return Promise.resolve();
    }
  };
};

const finiteTransition = options => carousel => {
  const finalOptions = Object.assign({}, defaultOptions, options);
  Object.assign(carousel, finalOptions, {
    goTo: goTo(carousel),
  });
};

export default finiteTransition;
