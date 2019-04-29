"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _responsiveUtils = require("./utils/responsiveUtils");

var _utils = require("./utils/utils");

var responsive = function responsive(responsiveOptions) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      onResize = _ref.onResize;

  return function (carousel) {
    var currentBreakpoint = (0, _responsiveUtils.getCurrentBreakpoint)(responsiveOptions);
    var buildCarousel = carousel.build;
    var destroyCarousel = carousel.destroy;

    carousel.build = function () {
      Object.assign(carousel, responsiveOptions.find(function (responsiveOption) {
        return responsiveOption.breakpoint === (0, _responsiveUtils.getCurrentBreakpoint)(responsiveOptions);
      }).options);
      return buildCarousel().then(function () {
        window.removeEventListener('resize', rebuildOnResize);
        window.addEventListener('resize', rebuildOnResize);
      });
    };

    carousel.destroy = function () {
      window.removeEventListener('resize', rebuildOnResize);
      return destroyCarousel();
    };

    function rebuildOnResize() {
      if (currentBreakpoint !== (0, _responsiveUtils.getCurrentBreakpoint)(responsiveOptions)) {
        currentBreakpoint = (0, _responsiveUtils.getCurrentBreakpoint)(responsiveOptions);
        carousel.build().then(onResize || _utils.noop);
        carousel.goTo(carousel.activeSlideIndex);
      }
    }
  };
};

var _default = responsive;
exports["default"] = _default;