const defaultOptions = {
  ms: 200,
  easing: 'ease-out',
};

const goTo = (parentGoTo, carousel) => (index, { toRight, toLeft } = {}) => {
  return new Promise(resolve => {
    let slideIndexToTransit;
    if (toRight && index < carousel.activeSlideIndex) {
      slideIndexToTransit =
        carousel.nrOfClonesPerSide + carousel.nrOfSlides + index;
    } else if (toLeft && index > carousel.activeSlideIndex) {
      slideIndexToTransit =
        carousel.nrOfClonesPerSide - (carousel.nrOfSlides - index);
    } else {
      slideIndexToTransit = index + carousel.nrOfClonesPerSide;
    }
    carousel.translateToSlide(slideIndexToTransit);
    carousel.frame.addEventListener(
      'transitionend',
      function onTransitionEnd() {
        carousel.frame.removeEventListener('transitionend', onTransitionEnd);
        removeCarouselTransition(carousel);
        parentGoTo(index);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setCarouselTransition(carousel);
          });
        });
        resolve();
      }
    );
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
    transitionOptions: Object.assign({}, defaultOptions, options),
  });
  setCarouselTransition(carousel);
};

export default infiniteTransition;

function setCarouselTransition(carousel) {
  const { ms, easing } = carousel.transitionOptions;
  carousel.frame.style.setProperty('transition', `transform ${ms}ms ${easing}`);
}

function removeCarouselTransition(carousel) {
  carousel.frame.style.setProperty('transition', `transform 0ms`);
}
