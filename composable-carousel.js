import { noop } from './utils';

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
      return carousel.goToNext();
    },
    goToPrev() {
      return carousel.goToPrev();
    },
    goTo(index) {
      return carousel.goTo(index);
    },
    getActiveSlideIndex() {
      return carousel.activeSlideIndex;
    },
    areEnoughSlides() {
      return carousel.areEnoughSlides();
    },
    destroy() {
      carousel.destroy().then(() => {
        Object.keys(api).forEach(key => {
          delete api[key];
        });
        api = null;
      });
    },
    ...carousel.api,
  };

  return api;
};

export default composeCarousel;
