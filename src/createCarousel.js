import composeCarousel from './composableCarousel';
import autoSlide from './autoSlide';
import dots from './dots';
import draggable from './draggable';
import finiteSliderFrame from './finiteSliderFrame';
import finiteTransition from './finiteTransition';
import infiniteSliderFrame from './infiniteSliderFrame';
import infiniteTransition from './infiniteTransition';
import responsive from './responsive';
import { noop } from './utils/utils';

const defaultOptions = {
  infinite: false,
  isAutoSlide: false,
  isDraggable: false,
};

export default function createCarousel({
  selector,
  onInit,
  onResize,
  onChange,
  options,
}) {
  const finalOptions = Object.assign({}, defaultOptions, options);
  return composeCarousel(selector, { onInit, onChange })(
    finalOptions.infinite
      ? infiniteSliderFrame(finalOptions)
      : finiteSliderFrame(finalOptions),
    finalOptions.infinite
      ? infiniteTransition(finalOptions)
      : finiteTransition(finalOptions),
    dots(),
    draggable(finalOptions),
    autoSlide(finalOptions),
    finalOptions.responsiveOptions
      ? responsive(finalOptions.responsiveOptions, { onResize })
      : noop
  );
}
