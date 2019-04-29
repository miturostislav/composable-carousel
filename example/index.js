import composeCarousel from '../composable-carousel';
import infiniteSliderFrame from '../src/infiniteSliderFrame';
import responsive from '../src/responsive';
import draggable from '../src/draggable';
import responsiveDraggable from '../responsiveDraggable';

const carousel = composeCarousel(document.querySelector('#selector'))(
  infiniteSliderFrame(),
  responsive([
    {
      breakpoint: 1200,
      options: {
        visibleSlides: 1,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 2000,
      options: {
        visibleSlides: 2,
        slidesToScroll: 2,
      }
    }
  ]),
  draggable(),
  responsiveDraggable([
    {
      breakpoint: 1200,
      isDraggable: true
    },
    {
      breakpoint: 2000,
      isDraggable: false
    },
  ])
);

document.querySelector('#next').addEventListener('click', carousel.goToNext);
document.querySelector('#prev').addEventListener('click', carousel.goToPrev);