export default function draggable(carousel) {
  carousel.frame.addEventListener('mousedown', mouseDownEvent => {
    const initialTranslateValue = getTranslateValue(carousel);

    function onMouseMove(mouseMoveEvent) {
      mouseMoveEvent.preventDefault();
      carousel.frame.style.setProperty(
        'transform',
        `translateX(${initialTranslateValue -
          ((mouseDownEvent.pageX - mouseMoveEvent.pageX) * 100) /
            carousel.frame.offsetWidth}%)`
      );
    }

    function onMouseStop() {
      const draggedValue = getTranslateValue(carousel) - initialTranslateValue;
      carousel.frame.removeEventListener('mousemove', onMouseMove);
      carousel.frame.removeEventListener('mouseup', onMouseStop);
      carousel.frame.removeEventListener('mouseleave', onMouseStop);
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

    carousel.frame.addEventListener('mousemove', onMouseMove);
    carousel.frame.addEventListener('mouseup', onMouseStop);
    carousel.frame.addEventListener('mouseleave', onMouseStop);
  });
}

function getTranslateValue({ frame }) {
  return frame.style.transform
    ? Number(frame.style.transform.match(/[-+]?(?:\d*\.?\d+|\d+\.?\d*)/g)[0])
    : 0;
}
