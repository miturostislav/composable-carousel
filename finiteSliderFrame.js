import { createSliderFrame } from './utils/sliderFrameUtils';

const finiteSliderFrame = options => carousel => {
  createSliderFrame(
    options,
    Object.assign(carousel, {
      nextIndexToScroll: nextIndexToScroll(carousel),
      prevIndexToScroll: prevIndexToScroll(carousel),
    })
  );
};

export default finiteSliderFrame;

const nextIndexToScroll = carousel => () => {
  const nextIndex = carousel.activeSlideIndex + carousel.slidesToScroll;
  const maxIndex = carousel.nrOfSlides - carousel.visibleSlides;

  if (nextIndex >= maxIndex) {
    return maxIndex;
  } else {
    return nextIndex;
  }
};
const prevIndexToScroll = carousel => () => {
  const nextIndex = carousel.activeSlideIndex - carousel.slidesToScroll;

  if (nextIndex < 0) {
    return 0;
  } else {
    return nextIndex;
  }
};
