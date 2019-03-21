export function setCarouselTransition(carousel) {
  const { ms, easing } = carousel.transitionOptions;
  carousel.frame.style.setProperty('transition', `transform ${ms}ms ${easing}`);
}

export function removeCarouselTransition(carousel) {
  carousel.frame.style.setProperty('transition', `transform 0ms`);
}

export const defaultOptions = {
  ms: 200,
  easing: 'ease-out',
};
