export function getCurrentBreakpoint(responsiveOptions) {
  return Math.min(
    ...responsiveOptions
      .map(responsiveOption => responsiveOption.breakpoint)
      .filter(
        breakpoint =>
          window.matchMedia(`only screen and (max-width: ${breakpoint}px)`)
            .matches
      )
  );
}
