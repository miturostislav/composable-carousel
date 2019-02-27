const composeCarousel = (selector, { onInit } = {}) => (...composers) => {
  const carousel = {
    selector,
    slides: Array.from(selector.children),
    nrOfSlides: selector.children.length,
  };
  composers.forEach(composer => composer(carousel));

  if (typeof onInit === 'function') {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        onInit();
      });
    });
  }

  return {
    goToNext: carousel.goToNext,
    goToPrev: carousel.goToPrev,
    goTo: carousel.goTo,
    getActiveSlideIndex() {
      return carousel.activeSlideIndex;
    },
    compose(fn) {
      return fn(carousel);
    },
  };
};

export default composeCarousel;
