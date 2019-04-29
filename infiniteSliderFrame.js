"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sliderFrameUtils = require("./utils/sliderFrameUtils");

var infiniteSliderFrame = function infiniteSliderFrame(options) {
  return function (carousel) {
    (0, _sliderFrameUtils.createSliderFrame)(options, Object.assign(carousel, {
      nextIndexToScroll: nextIndexToScroll(carousel),
      prevIndexToScroll: prevIndexToScroll(carousel)
    }));
  };
};

var _default = infiniteSliderFrame;
exports["default"] = _default;

var nextIndexToScroll = function nextIndexToScroll(carousel) {
  return function () {
    var nextIndex = carousel.activeSlideIndex + carousel.slidesToScroll;
    return nextIndex >= carousel.nrOfSlides ? nextIndex - carousel.nrOfSlides : nextIndex;
  };
};

var prevIndexToScroll = function prevIndexToScroll(carousel) {
  return function () {
    var prevIndex = carousel.activeSlideIndex - carousel.slidesToScroll;
    return prevIndex < 0 ? carousel.nrOfSlides + prevIndex : prevIndex;
  };
};