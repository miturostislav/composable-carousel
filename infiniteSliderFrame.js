import {
  createFrame,
  onSliderFrameInit,
  defaultOptions,
} from './sliderFrameUtils';

const infiniteSliderFrame = options => carousel => {
  Object.assign(carousel, defaultOptions, options, {
    nextIndexToScroll: nextIndexToScroll(carousel),
    prevIndexToScroll: prevIndexToScroll(carousel),
    goTo: goTo(carousel),
    goToNext: goToNext(carousel),
    goToPrev: goToPrev(carousel),
    translateToSlide: translateToSlide(carousel),
    buildFrame: buildFrame(carousel),
    onInit: onSliderFrameInit(carousel.onInit),
    nrOfClonesPerSide: Math.ceil(carousel.visibleSlides - 1),
    build: () => carousel.buildFrame(carousel),
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
  carousel.translateToSlide(index + carousel.nrOfClonesPerSide);
  carousel.activeSlideIndex = index;
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

const buildFrame = carousel => options => {
  Object.assign(carousel, defaultOptions, options);
  carousel.nrOfTotalSlideElements =
    carousel.nrOfSlides + carousel.nrOfClonesPerSide * 2;
  carousel.frame = createFrame(carousel);
  carousel.selector.style.setProperty('overflow', 'hidden');
  carousel.selector.appendChild(carousel.frame);
  cloneSlides(carousel);
  carousel.goTo(carousel.activeSlideIndex);
};

function cloneSlides(carousel) {
  for (let i = 0; i < carousel.nrOfClonesPerSide; i++) {
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
