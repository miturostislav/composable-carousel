"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createCarousel;

var _composableCarousel = _interopRequireDefault(require("./composableCarousel"));

var _autoSlide = _interopRequireDefault(require("./autoSlide"));

var _dots = _interopRequireDefault(require("./dots"));

var _draggable = _interopRequireDefault(require("./draggable"));

var _finiteSliderFrame = _interopRequireDefault(require("./finiteSliderFrame"));

var _finiteTransition = _interopRequireDefault(require("./finiteTransition"));

var _infiniteSliderFrame = _interopRequireDefault(require("./infiniteSliderFrame"));

var _infiniteTransition = _interopRequireDefault(require("./infiniteTransition"));

var _responsive = _interopRequireDefault(require("./responsive"));

var _utils = require("./utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var defaultOptions = {
  infinite: false,
  isAutoSlide: false,
  isDraggable: false
};

function createCarousel(_ref) {
  var selector = _ref.selector,
      onInit = _ref.onInit,
      onResize = _ref.onResize,
      onChange = _ref.onChange,
      options = _ref.options;
  var finalOptions = Object.assign({}, defaultOptions, options);
  return (0, _composableCarousel["default"])(selector, {
    onInit: onInit,
    onChange: onChange
  })(finalOptions.infinite ? (0, _infiniteSliderFrame["default"])(finalOptions) : (0, _finiteSliderFrame["default"])(finalOptions), finalOptions.infinite ? (0, _infiniteTransition["default"])(finalOptions) : (0, _finiteTransition["default"])(finalOptions), (0, _dots["default"])(), (0, _draggable["default"])({
    isDraggable: finalOptions.isDraggable
  }), (0, _autoSlide["default"])({
    isAutoSlide: finalOptions.isAutoSlide
  }), finalOptions.responsiveOptions ? (0, _responsive["default"])(finalOptions.responsiveOptions, {
    onResize: onResize
  }) : _utils.noop);
}