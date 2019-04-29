"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSlideTransition = createSlideTransition;
exports.setCarouselTransition = setCarouselTransition;
exports.removeCarouselTransition = removeCarouselTransition;
exports.defaultOptions = void 0;

function createSlideTransition(carousel) {
  var isAnimating = false;
  return function (slideIndexToTransit) {
    return new Promise(function (resolve) {
      if (carousel.areEnoughSlides() && !isAnimating) {
        isAnimating = true;
        setCarouselTransition(carousel);
        carousel.translateToSlide(slideIndexToTransit);
        carousel.frame.addEventListener('transitionend', function onTransitionEnd() {
          carousel.frame.removeEventListener('transitionend', onTransitionEnd);
          removeCarouselTransition(carousel);
          isAnimating = false;
          resolve();
        });
      }
    });
  };
}

function setCarouselTransition(carousel) {
  carousel.frame.style.setProperty('transition', "transform ".concat(carousel.transitionTime, "ms ").concat(carousel.transitionEasing));
}

function removeCarouselTransition(carousel) {
  carousel.frame.style.setProperty('transition', "transform 0ms");
}

var defaultOptions = {
  transitionTime: 200,
  transitionEasing: 'ease-out'
};
exports.defaultOptions = defaultOptions;