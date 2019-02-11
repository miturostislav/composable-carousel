const goTo = carousel => index => {
  carousel.frame.style.setProperty(
    'transform',
    `translateX(-${(100 / carousel.nrOfSlides) * index}%)`
  );
  carousel.activeSlideIndex = String(index);
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
const defaultOptions = {
  visibleSlides: 2,
  slidesToScroll: 2,
  activeSlideIndex: 0,
};
const buildFiniteSliderFrame = options => carousel => {
  Object.assign(carousel, defaultOptions, options, {
    nextIndexToScroll: nextIndexToScroll(carousel),
    prevIndexToScroll: prevIndexToScroll(carousel),
    goTo: goTo(carousel),
    goToNext: goToNext(carousel),
    goToPrev: goToPrev(carousel),
    slides: carousel.selector.children,
    nrOfSlides: carousel.selector.children.length,
  });
  carousel.frame = createFrame(carousel);
  carousel.selector.style.setProperty('overflow', 'hidden');
  carousel.selector.appendChild(carousel.frame);
};

export default buildFiniteSliderFrame;

function createFrame(carousel) {
  const frame = document.createElement('div');
  frame.style.setProperty(
    'width',
    `${(100 * carousel.nrOfSlides) / carousel.visibleSlides}%`
  );
  [...carousel.selector.children].forEach(slide => {
    slide.style.setProperty('display', 'inline-block');
    slide.style.setProperty('width', `${100 / carousel.nrOfSlides}%`);
    frame.appendChild(slide);
  });
  return frame;
}
