export function createFrame({
  nrOfTotalSlideElements,
  visibleSlides,
  slides,
  frame,
}) {
  const newFrame = frame || document.createElement('div');
  newFrame.innerHTML = '';
  newFrame.classList.add('frame');
  newFrame.style.setProperty(
    'width',
    `${(100 * nrOfTotalSlideElements) / visibleSlides}%`
  );
  newFrame.style.setProperty('display', 'flex');
  slides.forEach(slide => {
    slide.style.setProperty('width', `${100 / nrOfTotalSlideElements}%`);
    newFrame.appendChild(slide);
  });
  return newFrame;
}

export const isFrameReady = () => {
  return new Promise(resolve => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resolve();
      });
    });
  });
};

export const defaultOptions = {
  visibleSlides: 1,
  slidesToScroll: 1,
  activeSlideIndex: 0,
};
