"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sliderFrameUtils = require("./utils/sliderFrameUtils");

var finiteSliderFrame = function finiteSliderFrame(options) {
  return function (carousel) {
    (0, _sliderFrameUtils.createSliderFrame)(options, Object.assign(carousel, {
      nextIndexToScroll: nextIndexToScroll(carousel),
      prevIndexToScroll: prevIndexToScroll(carousel)
    }));
  };
};

var _default = finiteSliderFrame;
exports["default"] = _default;

var nextIndexToScroll = function nextIndexToScroll(carousel) {
  return function () {
    var nextIndex = carousel.activeSlideIndex + carousel.slidesToScroll;
    var maxIndex = carousel.nrOfSlides - carousel.visibleSlides;

    if (nextIndex >= maxIndex) {
      return maxIndex;
    } else {
      return nextIndex;
    }
  };
};

var prevIndexToScroll = function prevIndexToScroll(carousel) {
  return function () {
    var nextIndex = carousel.activeSlideIndex - carousel.slidesToScroll;

    if (nextIndex < 0) {
      return 0;
    } else {
      return nextIndex;
    }
  };
};