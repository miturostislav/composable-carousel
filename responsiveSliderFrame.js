import { getCurrentBreakpoint } from './responsiveUtils';

const responsiveSliderFrame = responsiveOptions => carousel => {
  let currentBreakpoint = getCurrentBreakpoint(responsiveOptions);

  carousel.build = () => {
    buildFrame(responsiveOptions, carousel);
    window.addEventListener('resize', () => {
      if (currentBreakpoint !== getCurrentBreakpoint(responsiveOptions)) {
        currentBreakpoint = getCurrentBreakpoint(responsiveOptions);
        buildFrame(responsiveOptions, carousel);
      }
    });
  };
};

export default responsiveSliderFrame;

function buildFrame(responsiveOptions, carousel) {
  const currentOptions = responsiveOptions.find(
    responsiveOption =>
      responsiveOption.breakpoint === getCurrentBreakpoint(responsiveOptions)
  ).options;
  Object.assign(carousel, currentOptions);
  carousel.buildFrame();
}
