import {
  setCarouselTransition,
  removeCarouselTransition,
  defaultOptions,
} from './transitionUtils';

const goTo = (parentGoTo, carousel) => {
  let isAnimating = false;
  return index =>
    new Promise(resolve => {
      if (carousel.areEnoughSlides() && !isAnimating) {
        if (index !== carousel.activeSlideIndex) {
          isAnimating = true;
          setCarouselTransition(carousel);
          parentGoTo(index);
          carousel.frame.addEventListener(
            'transitionend',
            function onTransitionEnd() {
              carousel.selector.removeEventListener(
                'transitionend',
                onTransitionEnd
              );
              removeCarouselTransition(carousel);
              isAnimating = false;
              resolve();
            }
          );
        } else {
          parentGoTo(index);
          resolve();
        }
      }
    });
};

const finiteTransition = options => carousel => {
  Object.assign(carousel, {
    goTo: goTo(carousel.goTo, carousel),
    transitionOptions: Object.assign({}, defaultOptions, options),
  });
};

export default finiteTransition;
