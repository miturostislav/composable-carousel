export function createFrame({
  nrOfTotalSlideElements,
  visibleSlides,
  frame,
  selector,
  slides,
}) {
  const newFrame = frame || document.createElement('div');
  newFrame.innerHTML = '';
  newFrame.classList.add('frame');
  newFrame.style.setProperty(
    'width',
    `${(100 * nrOfTotalSlideElements) / visibleSlides}%`
  );
  newFrame.style.setProperty('display', 'flex');
  selector.style.setProperty('overflow', 'hidden');
  selector.appendChild(newFrame);
  insertSlidesIntoFrame({ frame, slides, nrOfTotalSlideElements });
  return newFrame;
}

export function insertSlidesIntoFrame({
  frame,
  slides,
  nrOfTotalSlideElements,
}) {
  slides.forEach(slide => {
    slide.style.setProperty('width', `${100 / nrOfTotalSlideElements}%`);
    frame.appendChild(slide);
  });
}

export function removeSlidesFromFrame({ slides, selector }) {
  slides.forEach(slide => {
    slide.style.removeProperty('width');
    selector.appendChild(slide);
  });
}

export function destroyFrame(carousel) {
  removeSlidesFromFrame(carousel);
  carousel.selector.style.removeProperty('overflow');
  carousel.selector.removeChild(carousel.frame);
  carousel.frame = null;
  return isFrameReady();
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
