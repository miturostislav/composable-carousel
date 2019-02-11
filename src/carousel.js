import invariant from 'invariant';

const composeCarousel = ({ selector }) => (...composers) => {
  invariant(selector, 'Upss, something is wrong with your selector!!!');
  const carousel = { selector };
  composers.forEach(composer => composer(carousel));
  return {
    goToNext: carousel.goToNext,
    goToPrev: carousel.goToPrev,
    goTo: carousel.goTo,
    getActiveSlideIndex() {
      carousel.activeSlideIndex;
    },
  };
};

export default composeCarousel;
