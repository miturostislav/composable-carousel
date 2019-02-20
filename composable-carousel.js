const composeCarousel = selector => (...composers) => {
  const carousel = { selector };
  composers.forEach(composer => composer(carousel));
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
