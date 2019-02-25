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

const defaultOptions = {
  visibleSlides: 1,
  slidesToScroll: 1,
  activeSlideIndex: 0,
};

const infiniteSliderFrame = options => carousel => {
  const slides = carousel.slides || Array.from(carousel.selector.children);
  Object.assign(carousel, defaultOptions, options, {
    nextIndexToScroll: nextIndexToScroll(carousel),
    prevIndexToScroll: prevIndexToScroll(carousel),
    goTo: goTo(carousel),
    goToNext: goToNext(carousel),
    goToPrev: goToPrev(carousel),
    translateToSlide: translateToSlide(carousel),
    slides,
    nrOfSlides: slides.length,
    buildFrame: infiniteSliderFrame,
  });
  carousel.nrOfClonesPerSide =
    carousel.visibleSlides + carousel.slidesToScroll - 1;
  carousel.nrOfTotalSlideElements =
    carousel.nrOfSlides + carousel.nrOfClonesPerSide * 2;
  carousel.frame = createFrame(carousel);
  carousel.selector.style.setProperty('overflow', 'hidden');
  carousel.selector.appendChild(carousel.frame);
  cloneSlides(carousel);
  carousel.goTo(carousel.activeSlideIndex);
};

export default infiniteSliderFrame;

function createFrame(carousel) {
  const frame = document.createElement('div');
  frame.style.setProperty(
    'width',
    `${(100 * carousel.nrOfTotalSlideElements) / carousel.visibleSlides}%`
  );
  carousel.slides.forEach(slide => {
    slide.style.setProperty('display', 'inline-block');
    slide.style.setProperty(
      'width',
      `${100 / carousel.nrOfTotalSlideElements}%`
    );
    frame.appendChild(slide);
  });
  return frame;
}

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
