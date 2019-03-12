**Work in progress**

Lightweight and composable carousel with no dependencies

composable-carousel is a very lightweight library formed from small composable functions with no dependencies and no styling. Each composable function can be imported independently. You can compose your carousel for your own needs without importing unused code. You are free to reuse some composable functions from this library with the possibility to create your own composable functions and to use them together. Your suggestions and pull requests are welcome.

## Quick start

### Installation

```
npm install composable-carousel
```
or
```
yarn add composable-carousel
```

### Usage

#### HTML

```
<div id="selector">
  <div>slide 1</div>
  <div>slide 2</div>
  <div>slide 3</div>
  <div>slide 4</div>
</div>
```

#### Javascript

```
import composeCarousel from 'composable-carousel';
import finiteSliderFrame form 'composable-carousel/finiteSliderFrame';
import finiteTransition frorm 'composable-carousel/finiteTransition'
import autoSlide form 'composable-carousel/autoSlide';
import draggable form 'composable-carousel/draggable';
import dots form 'composable-carousel/dots';

const selector = document.querySelector('#selector');
const carousel = composeCarousel(selector, {
    onInit() {...}
})(
    finiteSliderFrame({visibleSlides: 1, slidesToScroll: 1 }),
    finiteTransition(),
    autoSlide(3000),
    draggable(),
    ...
);
const dotsListEl = carousel.compose(dots);

selector.appendChild(dotsListEl);
```

### Composable functions

**`finiteSliderFrame`** <br />
This function creates the frame element. It implements the interface of the carousel such as: goToNext(), goToPrev, etc.

**`infiniteSliderFrame`** <br />
This function is the same as the function described above but it is used for infinite carousels. It creates the clone slides and manage the infinite logic.

**`finiteTransition`** <br />
This function is used to animate slide transitions for finite carousel.

**`infiniteTransition`** <br />
This function is used to animate slide transitions for infinite carousel.

**`draggable`** <br />
This function implements the drag and drop functionality.

**`dots`** <br />
This function creates a list of dots elements and also implements all the logic related to active dot and dots clicks.

**`...`** <br />

### API

**`goToNext()`** <br />
Go to next slide.

**`goToPrev()`** <br />
Go to previous slide.

**`goTo(slideIndex)`** <br />
Go to a particular (slideIndex) slide.

**`getActiveSlideIndex()`** <br />
Returns the current slide index.

**`compose(fn)`** <br />
Compose the carousel with an additional composable function.