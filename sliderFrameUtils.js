export function createFrame({ nrOfTotalSlideElements, visibleSlides, slides }) {
  const frame = document.createElement('div');
  frame.classList.add('frame');
  frame.style.setProperty(
    'width',
    `${(100 * nrOfTotalSlideElements) / visibleSlides}%`
  );
  frame.style.setProperty('display', 'flex');
  slides.forEach(slide => {
    slide.style.setProperty('width', `${100 / nrOfTotalSlideElements}%`);
    frame.appendChild(slide);
  });
  return frame;
}

export const onSliderFrameInit = onInit => () => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      onInit();
    });
  });
};
