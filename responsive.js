import { getCurrentBreakpoint } from './responsiveUtils';

const responsive = responsiveOptions => carousel => {
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
      window.removeEventListener('resize', onResize);
      window.addEventListener('resize', onResize);
    });
  };

  carousel.destroy = () => {
    window.removeEventListener('resize', onResize);
    return destroyCarousel();
  };

  function onResize() {
    if (currentBreakpoint !== getCurrentBreakpoint(responsiveOptions)) {
      currentBreakpoint = getCurrentBreakpoint(responsiveOptions);
      carousel.build();
    }
  }
};

export default responsive;
