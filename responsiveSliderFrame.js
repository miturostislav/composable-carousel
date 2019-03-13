import { getCurrentBreakpoint } from './responsiveUtils';

const responsiveSliderFrame = responsiveOptions => carousel => {
  let currentBreakpoint = getCurrentBreakpoint(responsiveOptions);
  reCreateFrame(responsiveOptions, carousel);

  window.addEventListener('resize', () => {
    if (currentBreakpoint !== getCurrentBreakpoint(responsiveOptions)) {
      currentBreakpoint = getCurrentBreakpoint(responsiveOptions);
      reCreateFrame(responsiveOptions, carousel);
    }
  });
};

export default responsiveSliderFrame;

function reCreateFrame(responsiveOptions, carousel) {
  const currentOptions = responsiveOptions.find(
    responsiveOption =>
      responsiveOption.breakpoint === getCurrentBreakpoint(responsiveOptions)
  ).options;
  carousel.selector.removeChild(carousel.frame);
  carousel.buildFrame(currentOptions);
}
