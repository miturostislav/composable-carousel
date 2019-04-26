import composeCarousel from './composableCarousel';
import autoSlide from './autoSlide';
import dots from './dots';
import draggable from './draggable';
import finiteSliderFrame from './finiteSliderFrame';
import finiteTransition from './finiteTransition';
import infiniteSliderFrame from './infiniteSliderFrame';
import infiniteTransition from './infiniteTransition';
import responsive from './responsive';

const defaultOptions = {
  infinite: false,
  isAutoSlide: false,
  hasDots: false,
  isDraggable: false,
};

export default function createCarousel({ selector, onInit, options }) {
  const finalOptions = Object.assign({}, defaultOptions, options);
  return composeCarousel(selector, { onInit: onInit })(
    finalOptions.infinite
      ? infiniteSliderFrame(finalOptions)
      : finiteSliderFrame(finalOptions),
    finalOptions.infinite
      ? infiniteTransition(finalOptions)
      : finiteTransition(finalOptions),
    dots({ hasDots: finalOptions.isDraggable }),
    draggable({ isDraggable: finalOptions.isDraggable }),
    autoSlide({ isAutoSlide: finalOptions.isAutoSlide }),
    finalOptions.responsiveOptions && responsive(finalOptions.responsiveOptions)
  );
}
