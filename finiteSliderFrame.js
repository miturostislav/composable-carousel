const goTo = carousel => index => {
  carousel.frame.style.setProperty(
    'transform',
    `translateX(-${(100 / carousel.nrOfSlides) * index}%)`
  );
  carousel.activeSlideIndex = index;
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
  visibleSlides: 1,
  slidesToScroll: 1,
  activeSlideIndex: 0,
};
const finiteSliderFrame = options => carousel => {
  const slides = carousel.slides || Array.from(carousel.selector.children);
  Object.assign(carousel, defaultOptions, options, {
    nextIndexToScroll: nextIndexToScroll(carousel),
    prevIndexToScroll: prevIndexToScroll(carousel),
    goTo: goTo(carousel),
    goToNext: goToNext(carousel),
    goToPrev: goToPrev(carousel),
    slides,
    nrOfSlides: slides.length,
    buildFrame: finiteSliderFrame,
  });
  carousel.frame = createFrame(carousel);
  carousel.selector.style.setProperty('overflow', 'hidden');
  carousel.selector.appendChild(carousel.frame);
  carousel.goTo(carousel.activeSlideIndex);
};

export default finiteSliderFrame;

function createFrame(carousel) {
  const frame = document.createElement('div');
  frame.classList.add('frame');
  frame.style.setProperty(
    'width',
    `${(100 * carousel.nrOfSlides) / carousel.visibleSlides}%`
  );
  carousel.slides.forEach(slide => {
    slide.style.setProperty('display', 'inline-block');
    slide.style.setProperty('width', `${100 / carousel.nrOfSlides}%`);
    frame.appendChild(slide);
  });
  return frame;
}
