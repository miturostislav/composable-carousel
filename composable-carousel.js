const composeCarousel = (selector, { onInit } = {}) => (...composers) => {
  const selectorClone = selector.cloneNode(true);
  const carousel = {
    selector,
    slides: Array.from(selector.children),
    nrOfSlides: selector.children.length,
    onInit,
    api: {},
  };
  composers.forEach(composer => composer(carousel));
  carousel.build();
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
    destroy() {
      selector.parentElement.replaceChild(selectorClone, selector);
    },
    ...carousel.api,
  };
};

export default composeCarousel;
