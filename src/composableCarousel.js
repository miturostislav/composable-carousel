import { noop } from './utils/utils';

const composeCarousel = (carouselEl, { onInit, onChange } = {}) => (
  ...composers
) => {
  let carousel = {
    carouselEl,
    slides: Array.from(carouselEl.children),
    nrOfSlides: carouselEl.children.length,
    api: {},
  };
  let api;
  let goTo;

  composers.forEach(composer => composer(carousel));
  goTo = carousel.goTo;
  carousel.build().then(onInit || noop);
  carousel.goTo(carousel.activeSlideIndex);
  carousel.goTo = (...args) => goTo(...args).then(onChange || noop);

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
      });
    },
    ...carousel.api,
  };

  return api;
};

export default composeCarousel;
