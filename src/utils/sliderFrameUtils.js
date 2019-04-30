export function createSliderFrame(options, carousel) {
  Object.assign(carousel, defaultOptions, options, {
    goTo: goTo(carousel),
    goToNext: goToNext(carousel),
    goToPrev: goToPrev(carousel),
    translateToSlide: translateToSlide(carousel),
    nrOfSlideElements: () => carousel.nrOfSlides,
    areEnoughSlides: () => areEnoughSlides(carousel),
    build: () => createFrame(carousel),
    destroy: () => destroyFrame(carousel),
  });
}

export function createFrame(carousel) {
  const newFrame = carousel.frame || document.createElement('div');
  newFrame.innerHTML = '';
  newFrame.classList.add('frame');
  newFrame.style.setProperty(
    'width',
    `${(100 * carousel.nrOfSlideElements()) / carousel.visibleSlides}%`
  );
  newFrame.style.setProperty('display', 'flex');
  carousel.carouselEl.style.setProperty('overflow', 'hidden');
  carousel.carouselEl.appendChild(newFrame);
  carousel.frame = newFrame;
  insertSlidesIntoFrame(carousel);
  return isPaintReady();
}

export function destroyFrame(carousel) {
  removeSlidesFromFrame(carousel);
  carousel.carouselEl.style.removeProperty('overflow');
  carousel.carouselEl.removeChild(carousel.frame);
  carousel.frame = null;
  return isPaintReady();
}

export function insertSlidesIntoFrame(carousel) {
  carousel.slides.forEach(slide => {
    slide.style.setProperty('width', `${100 / carousel.nrOfSlideElements()}%`);
    carousel.frame.appendChild(slide);
  });
}

export function removeSlidesFromFrame({ slides, carouselEl }) {
  slides.forEach(slide => {
    slide.style.removeProperty('width');
    carouselEl.appendChild(slide);
  });
}

export function areEnoughSlides(carousel) {
  return carousel.nrOfSlides > carousel.visibleSlides;
}

export const translateToSlide = carousel => index => {
  carousel.frame.style.setProperty(
    'transform',
    `translateX(-${(100 / carousel.nrOfSlideElements()) * index}%)`
  );
};

export const goTo = carousel => index => {
  if (carousel.areEnoughSlides()) {
    carousel.translateToSlide(index);
    carousel.activeSlideIndex = index;
  }
  return Promise.resolve();
};

export const goToNext = carousel => () =>
  carousel.goTo(carousel.nextIndexToScroll());

export const goToPrev = carousel => () =>
  carousel.goTo(carousel.prevIndexToScroll());

export const isPaintReady = () => {
  return new Promise(resolve => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resolve();
      });
    });
  });
};

export const defaultOptions = {
  visibleSlides: 1,
  slidesToScroll: 1,
  activeSlideIndex: 0,
};
