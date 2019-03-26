import { createSliderFrame } from './utils/sliderFrameUtils';

const infiniteSliderFrame = options => carousel => {
  createSliderFrame(
    options,
    Object.assign(carousel, {
      nextIndexToScroll: nextIndexToScroll(carousel),
      prevIndexToScroll: prevIndexToScroll(carousel),
    })
  );
};

export default infiniteSliderFrame;

const nextIndexToScroll = carousel => () => {
  const nextIndex = carousel.activeSlideIndex + carousel.slidesToScroll;
  return nextIndex >= carousel.nrOfSlides
    ? nextIndex - carousel.nrOfSlides
    : nextIndex;
};
const prevIndexToScroll = carousel => () => {
  const prevIndex = carousel.activeSlideIndex - carousel.slidesToScroll;
  return prevIndex < 0 ? carousel.nrOfSlides + prevIndex : prevIndex;
};
