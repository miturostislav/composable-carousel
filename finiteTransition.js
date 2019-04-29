"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _transitionUtils = require("./utils/transitionUtils");

var goTo = function goTo(carousel) {
  var transitionToSlide = (0, _transitionUtils.createSlideTransition)(carousel);
  return function (index) {
    if (index !== carousel.activeSlideIndex) {
      return transitionToSlide(index).then(function () {
        carousel.activeSlideIndex = index;
      });
    } else {
      return Promise.resolve();
    }
  };
};

var finiteTransition = function finiteTransition(options) {
  return function (carousel) {
    var finalOptions = Object.assign({}, _transitionUtils.defaultOptions, options);
    Object.assign(carousel, finalOptions, {
      goTo: goTo(carousel)
    });
  };
};

var _default = finiteTransition;
exports["default"] = _default;