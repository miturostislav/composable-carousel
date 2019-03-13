const composeCarousel = (selector, { onInit } = {}) => (...composers) => {
  const carousel = {
    selector,
    slides: Array.from(selector.children),
    nrOfSlides: selector.children.length,
    onInit,
  };
  composers.forEach(composer => composer(carousel));
  if (typeof onInit === 'function') {
    carousel.onInit();
  }
  return {
    goToNext() {
      carousel.goToNext();
    },
    goToPrev() {
      carousel.goToPrev();
    },
    goTo(index) {
      carousel.goTo(index);
    },
    getActiveSlideIndex() {
      return carousel.activeSlideIndex;
    },
    compose(fn) {
      return fn(carousel);
    },
  };
};

export default composeCarousel;
