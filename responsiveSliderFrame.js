const responsiveSliderFrame = responsiveOptions => carousel => {
  const breakpoints = getBreakpoints(responsiveOptions);
  let currentBreakpoint = getCurrentBreakpoint(breakpoints);
  reCreateFrame(responsiveOptions, carousel);

  window.addEventListener('resize', () => {
    if (currentBreakpoint !== getCurrentBreakpoint(breakpoints)) {
      currentBreakpoint = getCurrentBreakpoint(breakpoints);
      reCreateFrame(responsiveOptions, carousel);
    }
  });
};

export default responsiveSliderFrame;

function reCreateFrame(responsiveOptions, carousel) {
  const currentOptions = responsiveOptions.find(
    responsiveOption =>
      responsiveOption.breakpoint ===
      getCurrentBreakpoint(getBreakpoints(responsiveOptions))
  ).options;
  carousel.selector.removeChild(carousel.frame);
  carousel.buildFrame(currentOptions)(carousel);
}

function getCurrentBreakpoint(breakpoints) {
  return Math.min(
    ...breakpoints.filter(
      breakpoint =>
        window.matchMedia(`only screen and (max-width: ${breakpoint}px)`)
          .matches
    )
  );
}

function getBreakpoints(responsiveOptions) {
  return responsiveOptions.map(responsiveOption => responsiveOption.breakpoint);
}
