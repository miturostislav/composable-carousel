import {
  createFrame,
  isFrameReady,
  defaultOptions,
  destroyFrame,
} from './sliderFrameUtils';

const finiteSliderFrame = options => carousel => {
  Object.assign(carousel, defaultOptions, options, {
    nextIndexToScroll: nextIndexToScroll(carousel),
    prevIndexToScroll: prevIndexToScroll(carousel),
    goTo: goTo(carousel),
    goToNext: goToNext(carousel),
    goToPrev: goToPrev(carousel),
    buildFrame: buildFrame(carousel),
    areEnoughSlides: () => carousel.nrOfSlides > carousel.visibleSlides,
    build: () => carousel.buildFrame(),
    destroy: () => destroyFrame(carousel),
  });
};

export default finiteSliderFrame;

const buildFrame = carousel => () => {
  carousel.nrOfTotalSlideElements = carousel.nrOfSlides;
  carousel.frame = createFrame(carousel);
  carousel.goTo(carousel.activeSlideIndex);
  return isFrameReady();
};

const goTo = carousel => index => {
  if (carousel.areEnoughSlides()) {
    carousel.frame.style.setProperty(
      'transform',
      `translateX(-${(100 / carousel.nrOfSlides) * index}%)`
    );
    carousel.activeSlideIndex = index;
  }
};
const goToNext = carousel => () => carousel.goTo(carousel.nextIndexToScroll());
const goToPrev = carousel => () => carousel.goTo(carousel.prevIndexToScroll());
const nextIndexToScroll = carousel => () => {
  const nextIndex = carousel.activeSlideIndex + carousel.slidesToScroll;
  const maxIndex = carousel.nrOfSlides - carousel.visibleSlides;

  if (nextIndex >= maxIndex) {
    return maxIndex;
  } else {
    return nextIndex;
  }
};
const prevIndexToScroll = carousel => () => {
  const nextIndex = carousel.activeSlideIndex - carousel.slidesToScroll;

  if (nextIndex < 0) {
    return 0;
  } else {
    return nextIndex;
  }
};
