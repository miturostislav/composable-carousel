export function createSlideTransition(carousel) {
  let isAnimating = false;
  return (slideIndexToTransit) =>
    new Promise(resolve => {
      if (carousel.areEnoughSlides() && !isAnimating) {
        isAnimating = true;
        setCarouselTransition(carousel);
        carousel.translateToSlide(slideIndexToTransit);
        carousel.frame.addEventListener(
          'transitionend',
          function onTransitionEnd() {
            carousel.frame.removeEventListener(
              'transitionend',
              onTransitionEnd
            );
            removeCarouselTransition(carousel);
            isAnimating = false;
            resolve();
          }
        );
      }
    });
}

export function setCarouselTransition(carousel) {
  carousel.frame.style.setProperty(
    'transition',
    `transform ${carousel.transitionTime}ms ${carousel.transitionEasing}`
  );
}

export function removeCarouselTransition(carousel) {
  carousel.frame.style.setProperty('transition', `transform 0ms`);
}

export const defaultOptions = {
  transitionTime: 200,
  transitionEasing: 'ease-out',
};
