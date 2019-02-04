import invariant from 'invariant';

const defaultOptions = {
  visibleSlides: 2,
  slidesToScroll: 2,
  duration: 200,
  easing: 'ease-out',
};

export default function composeCarousel({ selector, ...restOfOptions }) {
  invariant(selector, 'Upss, something is wrong with your selector!!!');
  const options = Object.assign(defaultOptions, restOfOptions, {
    selector,
    nrOfSlides: selector.children.length,
  });

  return {
    goTo(index) {
      goTo(options, index);
    },
    goToNext() {
      goToNext(options);
    },
    goToPrev() {
      goToPrev(options);
    },
    getCurrentIndex() {
      return getCurrentIndex(options);
    },
    compose(fn, ...params) {
      return fn(options, ...params);
    },
  };
}

export function buildSliderFrame({
  selector,
  nrOfSlides,
  visibleSlides,
  duration,
  easing,
}) {
  const frame = document.createElement('div');
  selector.style.setProperty('overflow', 'hidden');
  frame.style.setProperty('width', `${(100 * nrOfSlides) / visibleSlides}%`);
  frame.style.setProperty('transition', `transform ${duration}ms ${easing}`);
  [...selector.children].forEach(slide => {
    slide.style.setProperty('display', 'inline-block');
    slide.style.setProperty('width', `${100 / nrOfSlides}%`);
    frame.appendChild(slide);
  });
  selector.appendChild(frame);
}

export function autoSlide(options, time) {
  setInterval(() => {
    goToNext(options);
  }, time);
}

function goToNext(options) {
  goTo(options, nextIndexToScroll(options));
}

function goToPrev(options) {
  goTo(options, prevIndexToScroll(options));
}

function goTo({ selector, nrOfSlides }, index) {
  selector.children[0].style.setProperty(
    'transform',
    `translateX(-${(100 / nrOfSlides) * index}%)`
  );
  selector.dispatchEvent(
    new CustomEvent('change', {
      detail: {
        index,
      },
    })
  );
}

function getCurrentIndex({ selector, nrOfSlides }) {
  const transformStyle = selector.children[0].style.transform;
  return transformStyle
    ? transformStyle.match(/\d+/g)[0] / (100 / nrOfSlides)
    : 0;
}

export function nextIndexToScroll({
  selector,
  slidesToScroll,
  nrOfSlides,
  visibleSlides,
}) {
  const currentIndex = getCurrentIndex({ selector, nrOfSlides });
  const nextIndex = currentIndex + slidesToScroll;
  const maxIndex = nrOfSlides - visibleSlides;

  if (currentIndex === maxIndex) {
    return 0;
  } else if (nextIndex > maxIndex) {
    return maxIndex;
  } else {
    return nextIndex;
  }
}

export function prevIndexToScroll({
  selector,
  slidesToScroll,
  nrOfSlides,
  visibleSlides,
}) {
  const currentIndex = getCurrentIndex({ selector, nrOfSlides });
  const nextIndex = currentIndex - slidesToScroll;

  if (currentIndex === 0) {
    return nrOfSlides - visibleSlides;
  } else if (nextIndex < 0) {
    return 0;
  } else {
    return nextIndex;
  }
}
