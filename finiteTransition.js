import { createSlideTransition, defaultOptions } from './utils/transitionUtils';

const goTo = carousel => {
  const transitionToSlide = createSlideTransition(carousel);
  return index => {
    if (index !== carousel.activeSlideIndex) {
      return transitionToSlide(index).then(() => {
        carousel.activeSlideIndex = index;
      });
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
