"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var dots = function dots() {
  return function (carousel) {
    var dotsList = document.createElement('ul');
    var _goTo = carousel.goTo;
    var buildCarousel = carousel.build;
    var destroyCarousel = carousel.destroy;
    dotsList.classList.add('carousel-dots');
    Object.assign(carousel, {
      goTo: function goTo() {
        return _goTo.apply(void 0, arguments).then(function () {
          return setActiveDot(carousel);
        });
      },
      build: function build() {
        dotsList.innerHTML = '';
        dotsList.appendChild(createDots(carousel));
        return buildCarousel();
      },
      destroy: function destroy() {
        if (dotsList.parentElement) {
          dotsList.parentElement.removeChild(dotsList);
        }

        return destroyCarousel();
      }
    });
    carousel.api.dots = {
      getNrOfDots: function getNrOfDots() {
        return nrOfDots(carousel);
      },
      nrOfActiveDot: function nrOfActiveDot() {
        return _nrOfActiveDot(carousel);
      },
      goToDot: function goToDot(index) {
        carousel.goTo(index * carousel.slidesToScroll);
      },
      dotsList: dotsList
    };
  };
};

var _default = dots;
exports["default"] = _default;

function createDots(carousel) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < nrOfDots(carousel); i++) {
    fragment.appendChild(createDotItem(carousel, i));
  }

  return fragment;
}

function createDotItem(carousel, index) {
  var dotItem = document.createElement('li');
  dotItem.classList.add('dot');
  dotItem.addEventListener('click', function () {
    return carousel.goTo(index * carousel.slidesToScroll);
  });
  return dotItem;
}

function setActiveDot(carousel) {
  var dots = carousel.api.dots.dotsList.children;

  var activeDotIndex = _nrOfActiveDot(carousel);

  [].forEach.call(dots, function (dot) {
    dot.classList.remove('active');
  });
  dots[activeDotIndex].classList.add('active');
}

function nrOfDots(_ref) {
  var nrOfSlides = _ref.nrOfSlides,
      slidesToScroll = _ref.slidesToScroll;
  return Math.ceil(nrOfSlides / slidesToScroll);
}

function _nrOfActiveDot(carousel) {
  return parseInt(carousel.activeSlideIndex / carousel.slidesToScroll);
}