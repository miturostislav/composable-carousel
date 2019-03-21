import {
  createFrame,
  isFrameReady,
  defaultOptions,
  destroyFrame,
} from './sliderFrameUtils';

const infiniteSliderFrame = options => carousel => {
  Object.assign(carousel, defaultOptions, options, {
    nextIndexToScroll: nextIndexToScroll(carousel),
    prevIndexToScroll: prevIndexToScroll(carousel),
    goTo: goTo(carousel),
    goToNext: goToNext(carousel),
    goToPrev: goToPrev(carousel),
    translateToSlide: translateToSlide(carousel),
    areEnoughSlides: () => carousel.nrOfSlides > carousel.visibleSlides,
    buildFrame: buildFrame(carousel),
    nrOfClonesPerSide: () => Math.ceil(carousel.visibleSlides - 1),
    build: () => carousel.buildFrame(),
    destroy: () => destroyFrame(carousel),
  });
};

export default infiniteSliderFrame;

const translateToSlide = carousel => slideIndex => {
  carousel.frame.style.setProperty(
    'transform',
    `translateX(-${(100 / carousel.nrOfTotalSlideElements) * slideIndex}%)`
  );
};

const goTo = carousel => index => {
  if (carousel.areEnoughSlides()) {
    carousel.translateToSlide(index + carousel.nrOfClonesPerSide());
    carousel.activeSlideIndex = index;
  }
};

const goToNext = carousel => () => carousel.goTo(carousel.nextIndexToScroll());

const goToPrev = carousel => () => carousel.goTo(carousel.prevIndexToScroll());

const nextIndexToScroll = carousel => () => {
  const nextIndex = carousel.activeSlideIndex + carousel.slidesToScroll;
  return nextIndex >= carousel.nrOfSlides
    ? nextIndex - carousel.nrOfSlides
    : nextIndex;
};
const prevIndexToScroll = carousel => () => {
  const prevIndex = carousel.activeSlideIndex - carousel.slidesToScroll;
  return prevIndex < 0 ? carousel.nrOfSlides + prevIndex : prevIndex;
};

const buildFrame = carousel => () => {
  carousel.nrOfTotalSlideElements = carousel.areEnoughSlides()
    ? carousel.nrOfSlides + carousel.nrOfClonesPerSide() * 2
    : carousel.nrOfSlides;
  carousel.frame = createFrame(carousel);
  if (carousel.areEnoughSlides()) {
    cloneSlides(carousel);
  }
  carousel.goTo(carousel.activeSlideIndex);
  return isFrameReady();
};

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
