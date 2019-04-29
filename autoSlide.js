"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var autoSlide = function autoSlide() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$autoSlideTime = _ref.autoSlideTime,
      autoSlideTime = _ref$autoSlideTime === void 0 ? 2000 : _ref$autoSlideTime,
      _ref$isAutoSlide = _ref.isAutoSlide,
      isAutoSlide = _ref$isAutoSlide === void 0 ? true : _ref$isAutoSlide;

  return function (carousel) {
    var intervalID;
    var buildCarousel = carousel.build;
    var destroyCarousel = carousel.destroy;
    Object.assign(carousel, {
      autoSlideTime: autoSlideTime,
      isAutoSlide: isAutoSlide,
      build: function build() {
        return buildCarousel().then(function () {
          clearInterval(intervalID);

          if (isAutoSlide) {
            startAutoSlide();
          }
        });
      },
      destroy: function destroy() {
        return destroyCarousel().then(function () {
          return clearInterval(intervalID);
        });
      }
    });
    carousel.api.autoSlide = {
      start: function start() {
        startAutoSlide();
      },
      stop: function stop() {
        clearInterval(intervalID);
      }
    };

    function startAutoSlide() {
      clearInterval(intervalID);
      intervalID = setInterval(function () {
        carousel.goToNext();
      }, carousel.autoSlideTime);
    }
  };
};

var _default = autoSlide;
exports["default"] = _default;