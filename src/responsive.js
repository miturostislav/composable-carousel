import { getCurrentBreakpoint } from './utils/responsiveUtils';
import { noop } from './utils/utils';

const responsive = (responsiveOptions, { onResize } = {}) => carousel => {
  let currentBreakpoint = getCurrentBreakpoint(responsiveOptions);
  const buildCarousel = carousel.build;
  const destroyCarousel = carousel.destroy;

  carousel.build = () => {
    Object.assign(
      carousel,
      responsiveOptions.find(
        responsiveOption =>
          responsiveOption.breakpoint ===
          getCurrentBreakpoint(responsiveOptions)
      ).options
    );
    return buildCarousel().then(() => {
      window.removeEventListener('resize', rebuildOnResize);
      window.addEventListener('resize', rebuildOnResize);
    });
  };

  carousel.destroy = () => {
    window.removeEventListener('resize', rebuildOnResize);
    return destroyCarousel();
  };

  function rebuildOnResize() {
    if (currentBreakpoint !== getCurrentBreakpoint(responsiveOptions)) {
      currentBreakpoint = getCurrentBreakpoint(responsiveOptions);
      carousel.build().then(onResize || noop);
      carousel.goTo(carousel.activeSlideIndex);
    }
  }
};

export default responsive;
