const composeCarousel = (selector, { onInit } = {}) => (...composers) => {
  let carousel = {
    selector,
    slides: Array.from(selector.children),
    nrOfSlides: selector.children.length,
    onInit,
    api: {},
  };
  let api;

  composers.forEach(composer => composer(carousel));
  carousel.build().then(onInit || noop);
  api = {
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
      carousel.destroy().then(() => {
        Object.keys(api).forEach(key => {
          delete api[key];
        });
      });
      api = null;
    },
    ...carousel.api,
  };

  return api;
};

export default composeCarousel;

function noop() {}
