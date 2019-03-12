import { getCurrentBreakpoint } from './responsiveUtils';

const responsiveDraggable = responsiveOptions => carousel => {
  let currentBreakpoint = getCurrentBreakpoint(responsiveOptions);
  handleDraggingByBreakpoint(responsiveOptions, carousel);

  window.addEventListener('resize', () => {
    if (currentBreakpoint !== getCurrentBreakpoint(responsiveOptions)) {
      currentBreakpoint = getCurrentBreakpoint(responsiveOptions);
      handleDraggingByBreakpoint(responsiveOptions, carousel);
    }
  });
};

export default responsiveDraggable;

function handleDraggingByBreakpoint(responsiveOptions, carousel) {
  carousel.draggableApi.stop();
  if (
    responsiveOptions.find(
      responsiveOption =>
        responsiveOption.breakpoint === getCurrentBreakpoint(responsiveOptions)
    ).isDraggable
  ) {
    carousel.draggableApi.start();
  }
}
