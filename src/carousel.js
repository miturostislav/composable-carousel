import invariant from 'invariant';

const composeCarousel = ({ selector }) => (...composers) => {
  invariant(selector, 'Upss, something is wrong with your selector!!!');
  const carousel = {
    selector,
    slides: selector.children,
    nrOfSlides: selector.children.length,
  };
  composers.forEach(composer => composer(carousel));
  return carousel;
};

export default composeCarousel;
