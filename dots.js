const dots = carousel => () => {
  const dotsList = createDotsList(carousel);
  const goTo = carousel.goTo;
  Object.assign(carousel, {
    goTo: (...args) => {
      goTo(...args);
      setActiveDot(carousel);
    },
  });
  carousel.api.dots = {
    dotsList,
  };
  setActiveDot(carousel);
};

export default dots;

function createDotsList(carousel) {
  const dotsList = document.createElement('ul');
  dotsList.classList.add('carousel-dots');
  for (let i = 0; i < nrOfDots(carousel); i++) {
    dotsList.appendChild(createDotItem(carousel, i));
  }
  return dotsList;
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
