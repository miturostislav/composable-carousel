const draggable = () => carousel => {
  function onStartDragging(onStartEvent) {
    const initialTranslateValue = getTranslateValue(carousel);
    let draggedValue = 0;

    function onMove(onMoveEvent) {
      const startPageX =
        onStartEvent.pageX || onStartEvent.changedTouches[0].pageX;
      const movePageX =
        onMoveEvent.pageX || onMoveEvent.changedTouches[0].pageX;
      onMoveEvent.preventDefault();
      carousel.frame.style.setProperty(
        'transform',
        `translateX(${initialTranslateValue -
          ((startPageX - movePageX) * 100) / carousel.frame.offsetWidth}%)`
      );
    }

    function onEnd() {
      draggedValue = getTranslateValue(carousel) - initialTranslateValue;
      carousel.frame.removeEventListener('mousemove', onMove);
      carousel.frame.removeEventListener('mouseup', onEnd);
      carousel.frame.removeEventListener('mouseleave', onEnd);
      carousel.frame.removeEventListener('touchmove', onMove);
      carousel.frame.removeEventListener('touchend', onEnd);
      carousel.frame.removeEventListener('touchcancel', onEnd);
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

    carousel.frame.addEventListener('mousemove', onMove);
    carousel.frame.addEventListener('mouseup', onEnd);
    carousel.frame.addEventListener('mouseleave', onEnd);
    carousel.frame.addEventListener('touchmove', onMove);
    carousel.frame.addEventListener('touchend', onEnd);
    carousel.frame.addEventListener('touchcancel', onEnd);
    carousel.frame.addEventListener(
      'click',
      function onClick(onClickEvent) {
        carousel.frame.removeEventListener('click', onClick, true);
        if (draggedValue) {
          onClickEvent.preventDefault();
        }
      },
      true
    );
  }

  const draggingApi = {
    start() {
      carousel.frame.addEventListener('mousedown', onStartDragging);
      carousel.frame.addEventListener('touchstart', onStartDragging);
    },
    stop() {
      carousel.frame.removeEventListener('mousedown', onStartDragging);
      carousel.frame.removeEventListener('touchstart', onStartDragging);
    },
  };

  draggingApi.start();
  carousel.api.dragging = draggingApi;
};

export default draggable;

function getTranslateValue({ frame }) {
  return frame.style.transform
    ? Number(frame.style.transform.match(/[-+]?(?:\d*\.?\d+|\d+\.?\d*)/g)[0])
    : 0;
}
