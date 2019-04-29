"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentBreakpoint = getCurrentBreakpoint;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function getCurrentBreakpoint(responsiveOptions) {
  return Math.min.apply(Math, _toConsumableArray(responsiveOptions.map(function (responsiveOption) {
    return responsiveOption.breakpoint;
  }).filter(function (breakpoint) {
    return window.matchMedia("only screen and (max-width: ".concat(breakpoint, "px)")).matches;
  })));
}