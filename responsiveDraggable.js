import draggable from './draggable';
import { getCurrentBreakpoint } from './responsiveUtils';

const responsiveDraggable = responsiveOptions => carousel => {
  let currentBreakpoint = getCurrentBreakpoint(responsiveOptions);
  draggable()(carousel);
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
  carousel.api.dragging.stop();
  if (
    responsiveOptions.find(
      responsiveOption =>
        responsiveOption.breakpoint === getCurrentBreakpoint(responsiveOptions)
    ).isDraggable
  ) {
    carousel.api.dragging.start();
  }
}
