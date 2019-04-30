"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSliderFrame = createSliderFrame;
exports.createFrame = createFrame;
exports.destroyFrame = destroyFrame;
exports.insertSlidesIntoFrame = insertSlidesIntoFrame;
exports.removeSlidesFromFrame = removeSlidesFromFrame;
exports.areEnoughSlides = _areEnoughSlides;
exports.defaultOptions = exports.isPaintReady = exports.goToPrev = exports.goToNext = exports.goTo = exports.translateToSlide = void 0;

function createSliderFrame(options, carousel) {
  Object.assign(carousel, defaultOptions, options, {
    goTo: goTo(carousel),
    goToNext: goToNext(carousel),
    goToPrev: goToPrev(carousel),
    translateToSlide: translateToSlide(carousel),
    nrOfSlideElements: function nrOfSlideElements() {
      return carousel.nrOfSlides;
    },
    areEnoughSlides: function areEnoughSlides() {
      return _areEnoughSlides(carousel);
    },
    build: function build() {
      return createFrame(carousel);
    },
    destroy: function destroy() {
      return destroyFrame(carousel);
    }
  });
}

function createFrame(carousel) {
  var newFrame = carousel.frame || document.createElement('div');
  newFrame.innerHTML = '';
  newFrame.classList.add('frame');
  newFrame.style.setProperty('width', "".concat(100 * carousel.nrOfSlideElements() / carousel.visibleSlides, "%"));
  newFrame.style.setProperty('display', 'flex');
  carousel.carouselEl.style.setProperty('overflow', 'hidden');
  carousel.carouselEl.appendChild(newFrame);
  carousel.frame = newFrame;
  insertSlidesIntoFrame(carousel);
  return isPaintReady();
}

function destroyFrame(carousel) {
  removeSlidesFromFrame(carousel);
  carousel.carouselEl.style.removeProperty('overflow');
  carousel.carouselEl.removeChild(carousel.frame);
  carousel.frame = null;
  return isPaintReady();
}

function insertSlidesIntoFrame(carousel) {
  carousel.slides.forEach(function (slide) {
    slide.style.setProperty('width', "".concat(100 / carousel.nrOfSlideElements(), "%"));
    carousel.frame.appendChild(slide);
  });
}

function removeSlidesFromFrame(_ref) {
  var slides = _ref.slides,
      carouselEl = _ref.carouselEl;
  slides.forEach(function (slide) {
    slide.style.removeProperty('width');
    carouselEl.appendChild(slide);
  });
}

function _areEnoughSlides(carousel) {
  return carousel.nrOfSlides > carousel.visibleSlides;
}

var translateToSlide = function translateToSlide(carousel) {
  return function (index) {
    carousel.frame.style.setProperty('transform', "translateX(-".concat(100 / carousel.nrOfSlideElements() * index, "%)"));
  };
};

exports.translateToSlide = translateToSlide;

var goTo = function goTo(carousel) {
  return function (index) {
    if (carousel.areEnoughSlides()) {
      carousel.translateToSlide(index);
      carousel.activeSlideIndex = index;
    }

    return Promise.resolve();
  };
};

exports.goTo = goTo;

var goToNext = function goToNext(carousel) {
  return function () {
    return carousel.goTo(carousel.nextIndexToScroll());
  };
};

exports.goToNext = goToNext;

var goToPrev = function goToPrev(carousel) {
  return function () {
    return carousel.goTo(carousel.prevIndexToScroll());
  };
};

exports.goToPrev = goToPrev;

var isPaintReady = function isPaintReady() {
  return new Promise(function (resolve) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        resolve();
      });
    });
  });
};

exports.isPaintReady = isPaintReady;
var defaultOptions = {
  visibleSlides: 1,
  slidesToScroll: 1,
  activeSlideIndex: 0
};
exports.defaultOptions = defaultOptions;