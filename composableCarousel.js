"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("./utils/utils");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var composeCarousel = function composeCarousel(selector) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      onInit = _ref.onInit,
      onChange = _ref.onChange;

  return function () {
    var carousel = {
      selector: selector,
      slides: Array.from(selector.children),
      nrOfSlides: selector.children.length,
      api: {}
    };
    var api;
    var goTo;

    for (var _len = arguments.length, composers = new Array(_len), _key = 0; _key < _len; _key++) {
      composers[_key] = arguments[_key];
    }

    composers.forEach(function (composer) {
      return composer(carousel);
    });
    goTo = carousel.goTo;
    carousel.build().then(onInit || _utils.noop);
    carousel.goTo(carousel.activeSlideIndex);

    carousel.goTo = function () {
      return goTo.apply(void 0, arguments).then(onChange || _utils.noop);
    };

    api = _objectSpread({
      goToNext: function goToNext() {
        return carousel.goToNext();
      },
      goToPrev: function goToPrev() {
        return carousel.goToPrev();
      },
      goTo: function goTo(index) {
        return carousel.goTo(index);
      },
      getActiveSlideIndex: function getActiveSlideIndex() {
        return carousel.activeSlideIndex;
      },
      areEnoughSlides: function areEnoughSlides() {
        return carousel.areEnoughSlides();
      },
      destroy: function destroy() {
        carousel.destroy().then(function () {
          Object.keys(api).forEach(function (key) {
            delete api[key];
          });
        });
      }
    }, carousel.api);
    return api;
  };
};

var _default = composeCarousel;
exports["default"] = _default;