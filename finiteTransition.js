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

const finiteTransition = (options = defaultOptions) => carousel => {
  Object.assign(carousel, options, {
    goTo: goTo(carousel),
  });
};

export default finiteTransition;
