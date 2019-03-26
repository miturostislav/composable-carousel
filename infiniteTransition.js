import {
  setCarouselTransition,
  removeCarouselTransition,
  defaultOptions,
} from './transitionUtils';

const goTo = carousel => {
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
              carousel.translateToSlide(index + carousel.nrOfClonesPerSide());
              carousel.activeSlideIndex = index;
              isAnimating = false;
              resolve();
            }
          );
        } else {
          carousel.translateToSlide(index + carousel.nrOfClonesPerSide());
          resolve();
        }
      }
    });
};

const goToNext = carousel => () =>
  carousel.goTo(carousel.nextIndexToScroll(), { toRight: true });
const goToPrev = carousel => () =>
  carousel.goTo(carousel.prevIndexToScroll(), { toLeft: true });

const infiniteTransition = (options = defaultOptions) => carousel => {
  const buildCarousel = carousel.build;

  Object.assign(carousel, options, {
    goTo: goTo(carousel),
    goToNext: goToNext(carousel),
    goToPrev: goToPrev(carousel),
    nrOfClonesPerSide: () =>
      carousel.areEnoughSlides()
        ? Math.ceil(carousel.visibleSlides + carousel.slidesToScroll - 1)
        : 0,
    nrOfSlideElements: () =>
      carousel.areEnoughSlides()
        ? carousel.nrOfSlides + carousel.nrOfClonesPerSide() * 2
        : carousel.nrOfSlides,
    build() {
      const buildPromise = buildCarousel();
      cloneSlides(carousel);
      return buildPromise;
    },
  });
};

export default infiniteTransition;

function cloneSlides(carousel) {
  for (let i = 0; i < carousel.nrOfClonesPerSide(); i++) {
    const indexToClone =
      i - carousel.nrOfSlides < 0 ? i : i - carousel.nrOfSlides;
    const slideToPrepend = carousel.slides[
      carousel.nrOfSlides - 1 - indexToClone
    ].cloneNode(true);
    const slideToAppend = carousel.slides[indexToClone].cloneNode(true);
    carousel.frame.insertBefore(slideToPrepend, carousel.frame.children[0]);
    carousel.frame.appendChild(slideToAppend);
  }
}
