import composeCarousel from './composableCarousel';
import autoSlide from './autoSlide';
import dots from './dots';
import draggable from './draggable';
import finiteSliderFrame from './finiteSliderFrame';
import finiteTransition from './finiteTransition';
import infiniteSliderFrame from './infiniteSliderFrame';
import infiniteTransition from './infiniteTransition';
import responsive from './responsive';

export default function createCarousel({
  selector,
  onInit,
  options = {
    infinite: false,
    isAutoSlide: false,
    dots: false,
    isDraggable: false,
    responsiveOptions: [
      {
        breakpoint: Infinity,
      },
    ],
  },
}) {
  const sliderFrameOptions = {
    visibleSlides: options.visibleSlides,
    slidesToScroll: options.slidesToScroll,
    activeSlideIndex: options.activeSlideIndex,
  };
  const transitionOptions = {
    transitionTime: options.transitionTime,
    transitionEasing: options.transitionEasing,
  };

  return composeCarousel(selector, { onInit: onInit })(
    options.infinite
      ? infiniteSliderFrame(sliderFrameOptions)
      : finiteSliderFrame(sliderFrameOptions),
    options.infinite
      ? infiniteTransition(transitionOptions)
      : finiteTransition(transitionOptions),
    dots({ dots: options.dots }),
    draggable({ isDraggable: options.isDraggable }),
    autoSlide({ isAutoSlide: options.isAutoSlide }),
    responsive(options.responsiveOptions)
  );
}
