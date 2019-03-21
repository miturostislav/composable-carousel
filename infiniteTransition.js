import {
  setCarouselTransition,
  removeCarouselTransition,
  defaultOptions,
} from './transitionUtils';

const goTo = (parentGoTo, carousel) => {
  let isAnimating = false;
  return (index, { toRight, toLeft } = {}) =>
    new Promise(resolve => {
      if (carousel.areEnoughSlides() && !isAnimating) {
        const nrOfClonesPerSide = carousel.nrOfClonesPerSide();
        let slideIndexToTransit;
        if (toRight && index < carousel.activeSlideIndex) {
          slideIndexToTransit = nrOfClonesPerSide + carousel.nrOfSlides + index;
        } else if (toLeft && index > carousel.activeSlideIndex) {
          slideIndexToTransit =
            nrOfClonesPerSide - (carousel.nrOfSlides - index);
        } else {
          slideIndexToTransit = index + nrOfClonesPerSide;
        }
        if (index !== carousel.activeSlideIndex) {
          isAnimating = true;
          setCarouselTransition(carousel);
          carousel.translateToSlide(slideIndexToTransit);
          carousel.frame.addEventListener(
            'transitionend',
            function onTransitionEnd() {
              carousel.frame.removeEventListener(
                'transitionend',
                onTransitionEnd
              );
              removeCarouselTransition(carousel);
              parentGoTo(index);
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

const goToNext = carousel => () =>
  carousel.goTo(carousel.nextIndexToScroll(), { toRight: true });
const goToPrev = carousel => () =>
  carousel.goTo(carousel.prevIndexToScroll(), { toLeft: true });

const infiniteTransition = options => carousel => {
  Object.assign(carousel, {
    goTo: goTo(carousel.goTo, carousel),
    goToNext: goToNext(carousel),
    goToPrev: goToPrev(carousel),
    nrOfClonesPerSide: () =>
      Math.ceil(carousel.visibleSlides + carousel.slidesToScroll - 1),
    transitionOptions: Object.assign({}, defaultOptions, options),
  });
};

export default infiniteTransition;
