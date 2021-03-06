import { createSlideTransition, defaultOptions } from './utils/transitionUtils';

const transitionTo = (carousel, goTo) => {
  const transitionToSlide = createSlideTransition(carousel);
  return (index, { toRight, toLeft } = {}) => {
    if (index !== carousel.activeSlideIndex) {
      return transitionToSlide(
        getSlideIndexToTransit(carousel, index, { toRight, toLeft })
      ).then(() => {
        goTo(index);
        carousel.translateToSlide(index + carousel.nrOfClonesPerSide());
      });
    } else {
      goTo(index);
      carousel.translateToSlide(index + carousel.nrOfClonesPerSide());
      return Promise.resolve();
    }
  };
};

const goToNext = carousel => () =>
  carousel.goTo(carousel.nextIndexToScroll(), { toRight: true });
const goToPrev = carousel => () =>
  carousel.goTo(carousel.prevIndexToScroll(), { toLeft: true });

const infiniteTransition = options => carousel => {
  const finalOptions = Object.assign({}, defaultOptions, options);
  const buildCarousel = carousel.build;
  const goTo = carousel.goTo;

  Object.assign(carousel, finalOptions, {
    goTo: transitionTo(carousel, goTo),
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

function getSlideIndexToTransit(carousel, index, { toRight, toLeft }) {
  let slideIndexToTransit;
  if (toRight && index < carousel.activeSlideIndex) {
    slideIndexToTransit =
      carousel.nrOfClonesPerSide() + carousel.nrOfSlides + index;
  } else if (toLeft && index > carousel.activeSlideIndex) {
    slideIndexToTransit =
      carousel.nrOfClonesPerSide() - (carousel.nrOfSlides - index);
  } else {
    slideIndexToTransit = index + carousel.nrOfClonesPerSide();
  }
  return slideIndexToTransit;
}
