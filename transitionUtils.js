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
