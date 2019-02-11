export const getTranslateValue = frame => {
  return frame.style.transform
    ? Number(frame.style.transform.match(/[-+]?(?:\d*\.?\d+|\d+\.?\d*)/g)[0])
    : 0;
};

export default function draggable(carousel) {
  const frame = carousel.selector.children[0];
  frame.addEventListener('mousedown', mouseDownEvent => {
    const initialTranslateValue = getTranslateValue(frame);

    function onMouseMove(mouseMoveEvent) {
      mouseMoveEvent.preventDefault();
      frame.style.setProperty(
        'transform',
        `translateX(${initialTranslateValue -
          ((mouseDownEvent.pageX - mouseMoveEvent.pageX) * 100) /
            carousel.selector.children[0].offsetWidth}%)`
      );
    }

    function onMouseStop() {
      const draggedValue = getTranslateValue(frame) - initialTranslateValue;
      frame.removeEventListener('mousemove', onMouseMove);
      frame.removeEventListener('mouseup', onMouseStop);
      frame.removeEventListener('mouseleave', onMouseStop);
      if (draggedValue) {
        if (draggedValue < 0) {
          carousel.goToNext();
        } else {
          carousel.goToPrev();
        }
      } else {
        carousel.goTo(carousel.activeSlideIndex);
      }
    }

    frame.addEventListener('mousemove', onMouseMove);
    frame.addEventListener('mouseup', onMouseStop);
    frame.addEventListener('mouseleave', onMouseStop);
  });
}
