import composeCarousel, {
  buildSliderFrame,
  autoSlide,
} from '../../src/carousel';
import { createElement } from '../../src/carouselUtils';

const selector = document.querySelector('#selector');
const carousel = composeCarousel({ selector });
carousel.compose(buildSliderFrame);
// carousel.compose(autoSlide, 2000);

const nextButton = createElement({
  tagName: 'button',
  content: document.createTextNode('next'),
});

const prevButton = createElement({
  tagName: 'button',
  content: document.createTextNode('prev'),
});

nextButton.addEventListener('click', carousel.goToNext);
prevButton.addEventListener('click', carousel.goToPrev);

selector.appendChild(nextButton);
selector.appendChild(prevButton);
