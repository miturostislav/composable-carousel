const dots = () => carousel => {
  let dotsList = document.createElement('ul');
  const goTo = carousel.goTo;
  const buildCarousel = carousel.build;
  const destroyCarousel = carousel.destroy;

  dotsList.classList.add('carousel-dots');
  Object.assign(carousel, {
    goTo: (...args) => goTo(...args).then(() => setActiveDot(carousel)),
    build() {
      dotsList.innerHTML = '';
      dotsList.appendChild(createDots(carousel));
      return buildCarousel();
    },
    destroy() {
      if (dotsList.parentElement) {
        dotsList.parentElement.removeChild(dotsList);
      }
      return destroyCarousel();
    },
  });
  carousel.api.dots = {
    getNrOfDots() {
      return nrOfDots(carousel);
    },
    nrOfActiveDot() {
      return nrOfActiveDot(carousel);
    },
    goToDot(index) {
      carousel.goTo(index * carousel.slidesToScroll);
    },
    dotsList,
  };
};

export default dots;

function createDots(carousel) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < nrOfDots(carousel); i++) {
    fragment.appendChild(createDotItem(carousel, i));
  }
  return fragment;
}

function createDotItem(carousel, index) {
  const dotItem = document.createElement('li');
  dotItem.classList.add('dot');
  dotItem.addEventListener('click', () =>
    carousel.goTo(index * carousel.slidesToScroll)
  );
  return dotItem;
}

function setActiveDot(carousel) {
  const dots = carousel.api.dots.dotsList.children;
  const activeDotIndex = nrOfActiveDot(carousel);
  [].forEach.call(dots, dot => {
    dot.classList.remove('active');
  });
  dots[activeDotIndex].classList.add('active');
}

function nrOfDots({ nrOfSlides, slidesToScroll }) {
  return Math.ceil(nrOfSlides / slidesToScroll);
}

function nrOfActiveDot(carousel) {
  return parseInt(carousel.activeSlideIndex / carousel.slidesToScroll);
}
