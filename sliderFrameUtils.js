export function createFrame({
  nrOfTotalSlideElements,
  visibleSlides,
  slides,
  frame,
}) {
  const newFrame = frame
    ? frame.cloneNode(false)
    : document.createElement('div');
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

export const onSliderFrameInit = onInit => () => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      onInit();
    });
  });
};
