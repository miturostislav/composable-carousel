const defaultOptions = {
  ms: 200,
  easing: 'ease-out',
};

const goTo = (parentGoTo, carousel) => (index, { toRight, toLeft } = {}) => {
  return new Promise(resolve => {
    const nrOfClonesPerSide = carousel.nrOfClonesPerSide();
    let slideIndexToTransit;
    if (toRight && index < carousel.activeSlideIndex) {
      slideIndexToTransit = nrOfClonesPerSide + carousel.nrOfSlides + index;
    } else if (toLeft && index > carousel.activeSlideIndex) {
      slideIndexToTransit = nrOfClonesPerSide - (carousel.nrOfSlides - index);
    } else {
      slideIndexToTransit = index + nrOfClonesPerSide;
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
  const buildCarousel = carousel.build;
  const destroyCarousel = carousel.destroy;

  Object.assign(carousel, {
    goTo: goTo(carousel.goTo, carousel),
    goToNext: goToNext(carousel),
    goToPrev: goToPrev(carousel),
    nrOfClonesPerSide: () =>
      Math.ceil(carousel.visibleSlides + carousel.slidesToScroll - 1),
    transitionOptions: Object.assign({}, defaultOptions, options),
    build: () =>
      buildCarousel().then(() => {
        setCarouselTransition(carousel);
      }),
    destroy: () => {
      removeCarouselTransition(carousel);
      return destroyCarousel();
    },
  });
};

export default infiniteTransition;

function setCarouselTransition(carousel) {
  const { ms, easing } = carousel.transitionOptions;
  carousel.frame.style.setProperty('transition', `transform ${ms}ms ${easing}`);
}

function removeCarouselTransition(carousel) {
  carousel.frame.style.setProperty('transition', `transform 0ms`);
}
