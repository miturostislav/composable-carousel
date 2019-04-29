"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _transitionUtils = require("./utils/transitionUtils");

var goTo = function goTo(carousel) {
  var transitionToSlide = (0, _transitionUtils.createSlideTransition)(carousel);
  return function (index) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        toRight = _ref.toRight,
        toLeft = _ref.toLeft;

    if (index !== carousel.activeSlideIndex) {
      return transitionToSlide(getSlideIndexToTransit(carousel, index, {
        toRight: toRight,
        toLeft: toLeft
      })).then(function () {
        carousel.activeSlideIndex = index;
        carousel.translateToSlide(index + carousel.nrOfClonesPerSide());
      });
    } else {
      carousel.translateToSlide(index + carousel.nrOfClonesPerSide());
      return Promise.resolve();
    }
  };
};

var goToNext = function goToNext(carousel) {
  return function () {
    return carousel.goTo(carousel.nextIndexToScroll(), {
      toRight: true
    });
  };
};

var goToPrev = function goToPrev(carousel) {
  return function () {
    return carousel.goTo(carousel.prevIndexToScroll(), {
      toLeft: true
    });
  };
};

var infiniteTransition = function infiniteTransition(options) {
  return function (carousel) {
    var finalOptions = Object.assign({}, _transitionUtils.defaultOptions, options);
    var buildCarousel = carousel.build;
    Object.assign(carousel, finalOptions, {
      goTo: goTo(carousel),
      goToNext: goToNext(carousel),
      goToPrev: goToPrev(carousel),
      nrOfClonesPerSide: function nrOfClonesPerSide() {
        return carousel.areEnoughSlides() ? Math.ceil(carousel.visibleSlides + carousel.slidesToScroll - 1) : 0;
      },
      nrOfSlideElements: function nrOfSlideElements() {
        return carousel.areEnoughSlides() ? carousel.nrOfSlides + carousel.nrOfClonesPerSide() * 2 : carousel.nrOfSlides;
      },
      build: function build() {
        var buildPromise = buildCarousel();
        cloneSlides(carousel);
        return buildPromise;
      }
    });
  };
};

var _default = infiniteTransition;
exports["default"] = _default;

function cloneSlides(carousel) {
  for (var i = 0; i < carousel.nrOfClonesPerSide(); i++) {
    var indexToClone = i - carousel.nrOfSlides < 0 ? i : i - carousel.nrOfSlides;
    var slideToPrepend = carousel.slides[carousel.nrOfSlides - 1 - indexToClone].cloneNode(true);
    var slideToAppend = carousel.slides[indexToClone].cloneNode(true);
    carousel.frame.insertBefore(slideToPrepend, carousel.frame.children[0]);
    carousel.frame.appendChild(slideToAppend);
  }
}

function getSlideIndexToTransit(carousel, index, _ref2) {
  var toRight = _ref2.toRight,
      toLeft = _ref2.toLeft;
  var slideIndexToTransit;

  if (toRight && index < carousel.activeSlideIndex) {
    slideIndexToTransit = carousel.nrOfClonesPerSide() + carousel.nrOfSlides + index;
  } else if (toLeft && index > carousel.activeSlideIndex) {
    slideIndexToTransit = carousel.nrOfClonesPerSide() - (carousel.nrOfSlides - index);
  } else {
    slideIndexToTransit = index + carousel.nrOfClonesPerSide();
  }

  return slideIndexToTransit;
}