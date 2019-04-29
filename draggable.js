"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var draggable = function draggable() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$isDraggable = _ref.isDraggable,
      isDraggable = _ref$isDraggable === void 0 ? true : _ref$isDraggable;

  return function (carousel) {
    function onStartDragging(onStartEvent) {
      var initialTranslateValue = getTranslateValue(carousel);
      var draggedValue = 0;

      function onMove(onMoveEvent) {
        var startPageX = onStartEvent.pageX || onStartEvent.changedTouches[0].pageX;
        var movePageX = onMoveEvent.pageX || onMoveEvent.changedTouches[0].pageX;
        onMoveEvent.preventDefault();
        carousel.frame.style.setProperty('transform', "translateX(".concat(initialTranslateValue - (startPageX - movePageX) * 100 / carousel.frame.offsetWidth, "%)"));
      }

      function onEnd() {
        draggingApi.stop();
        draggedValue = getTranslateValue(carousel) - initialTranslateValue;
        carousel.frame.removeEventListener('mousemove', onMove);
        carousel.frame.removeEventListener('mouseup', onEnd);
        carousel.frame.removeEventListener('mouseleave', onEnd);
        carousel.frame.removeEventListener('touchmove', onMove);
        carousel.frame.removeEventListener('touchend', onEnd);
        carousel.frame.removeEventListener('touchcancel', onEnd);

        if (draggedValue) {
          if (draggedValue < 0) {
            carousel.goToNext().then(draggingApi.start);
          } else {
            carousel.goToPrev().then(draggingApi.start);
          }
        } else {
          carousel.goTo(carousel.activeSlideIndex).then(draggingApi.start);
        }
      }

      carousel.frame.addEventListener('mousemove', onMove);
      carousel.frame.addEventListener('mouseup', onEnd);
      carousel.frame.addEventListener('mouseleave', onEnd);
      carousel.frame.addEventListener('touchmove', onMove);
      carousel.frame.addEventListener('touchend', onEnd);
      carousel.frame.addEventListener('touchcancel', onEnd);
      carousel.frame.addEventListener('click', function onClick(onClickEvent) {
        carousel.frame.removeEventListener('click', onClick, true);

        if (draggedValue) {
          onClickEvent.preventDefault();
        }
      }, true);
    }

    var buildCarousel = carousel.build;
    var destroyCarousel = carousel.destroy;
    var draggingApi = {
      start: function start() {
        if (carousel.areEnoughSlides()) {
          carousel.frame.addEventListener('mousedown', onStartDragging);
          carousel.frame.addEventListener('touchstart', onStartDragging);
        }
      },
      stop: function stop() {
        carousel.frame.removeEventListener('mousedown', onStartDragging);
        carousel.frame.removeEventListener('touchstart', onStartDragging);
      }
    };
    Object.assign(carousel, {
      isDraggable: isDraggable
    });
    carousel.api.dragging = draggingApi;

    carousel.build = function () {
      return buildCarousel().then(function () {
        draggingApi.stop();

        if (carousel.isDraggable) {
          draggingApi.start();
        }
      });
    };

    carousel.destroy = function () {
      draggingApi.stop();
      return destroyCarousel();
    };
  };
};

var _default = draggable;
exports["default"] = _default;

function getTranslateValue(_ref2) {
  var frame = _ref2.frame;
  return frame.style.transform ? Number(frame.style.transform.match(/[-+]?(?:\d*\.?\d+|\d+\.?\d*)/g)[0]) : 0;
}