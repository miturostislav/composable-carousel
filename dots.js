const goTo = (parentGoTo, carousel) => (...args) => {
  parentGoTo(...args);
  carousel.onDotChange();
};

export default function dots(carousel) {
  const dotsList = createDotsList(carousel);
  Object.assign(carousel, {
    goTo: goTo(carousel.goTo, carousel),
    onDotChange: () => setActiveDot(dotsList.children, nrOfActiveDot(carousel)),
  });
  setActiveDot(dotsList.children, 0);
  return dotsList;
}

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

function setActiveDot(dots, activeDotIndex) {
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
