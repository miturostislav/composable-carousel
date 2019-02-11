import composeCarousel from '../../src/carousel';
import buildFiniteSliderFrame from '../../src/buildFiniteSliderFrame';
import buildInfiniteSliderFrame from '../../src/buildInfiniteSliderFrame';
import draggable from '../../src/draggable';
import finiteTransition from '../../src/finiteTransition';
import infiniteTransition from '../../src/infiniteTransition';
import autoSlide from '../../src/autoSlide';

const selector = document.querySelector('#selector');
const carousel = composeCarousel({ selector })(
  buildInfiniteSliderFrame(),
  infiniteTransition({ ms: 200, easing: 'ease-out' }),
  draggable
  // autoSlide(1500)
);

const nextButton = document.createElement('button');
const prevButton = document.createElement('button');
nextButton.innerHTML = 'next';
prevButton.innerHTML = 'prev';
nextButton.addEventListener('click', carousel.goToNext);
prevButton.addEventListener('click', carousel.goToPrev);

selector.appendChild(nextButton);
selector.appendChild(prevButton);
