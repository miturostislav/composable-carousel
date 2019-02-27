import composeCarousel from '../composable-carousel';
import infiniteSliderFrame from '../infiniteSliderFrame';
import responsiveSliderFrame from '../responsiveSliderFrame';
import draggable from '../draggable';

const carousel = composeCarousel(document.querySelector('#selector'))(
  infiniteSliderFrame(),
  responsiveSliderFrame([
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
  draggable
);

document.querySelector('#next').addEventListener('click', carousel.goToNext);
document.querySelector('#prev').addEventListener('click', carousel.goToPrev);