# [Composable carousel](https://github.com/miturostislav/composable-carousel) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/miturostislav/composable-carousel/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/miturostislav/composable-carousel)

Composable carousel is a javascript library for building your own carousel with no dependencies

* **Composable:**  The library provides a set of composable functions which offer the possibility to create a carousel of your needs without unnecessary dependencies and unused code. 
* **Customisable:** Create your own composable functions compose them together with the provided composable functions.

## Quick start

### Installation

```
npm install composable-carousel
```
or
```
yarn add composable-carousel
```

### Example

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

##### The ```createCarousel``` accepts an option object and compose the carousel for you:

```
import createCarousel from 'composable-carousel';

const carousel = createCarousel({
    carouselEl: document.getElementById('selector'),
    onInit() {},
    onChange() {},
    onResize() {},
    options: {
        visibleSlides: 1,
        slidesToScroll: 1,
        activeSlideIndex: 0,
        transitionTime: 200,
        transitionEasing: 'ease-out',
        isAutoSlide: true,
        autoSlideTime: 2000,
        isDraggable: true,
        responsiveOptions: [{
            breakpoint: breakpoints.upToMedium,
            options: {
                isDraggable: true,
                visibleSlides: 1.5,
            },
        },
        {
            breakpoint: breakpoints.upToLarge,
            options: {
                isDraggable: true,
                visibleSlides: 2.5,
            },
        },
        {
            breakpoint: Infinity,
            options: {
                isDraggable: false,
                visibleSlides: 3,
            }
        }],
    },
})
```

##### The following example imports the composable functions that are needed and compose the carousel using these functions:

```
import composeCarousel from 'composable-carousel';
import finiteSliderFrame form 'composable-carousel/finiteSliderFrame';
import finiteTransition frorm 'composable-carousel/finiteTransition'
import autoSlide form 'composable-carousel/autoSlide';
import draggable form 'composable-carousel/draggable';
import dots form 'composable-carousel/dots';

const selector = document.querySelector('#selector');
const carousel = composeCarousel(carouselEl, {
    onInit() {...}
})(
    finiteSliderFrame({visibleSlides: 1, slidesToScroll: 1 }),
    finiteTransition({ transitionTime: 200 }),
    autoSlide({ autoSlideTime: 2000 }),
    draggable(),
    dots(),
    responsive([{
        breakpoint: breakpoints.Infinity,
        options: {
            isDraggable: false,
        }
    },
    {
        breakpoint: breakpoints.upToMedium,
        options: {
            isDraggable: true,
        }
    }])
);
```

### Composable functions

* **`finiteSliderFrame`** **`infiniteSliderFrame`** <br />
*options: { visibleSlides: number, slidesToScroll: number }*

* **`finiteTransition`** **`infiniteTransition`** <br />
*options: { transitionTime: number, transitionEasing: string }*

* **`draggable`** <br />
*options: {}*

* **`dots`** <br />
*options: {}*

* **`responsive`** <br />
*Options: [{ breakpoint: number, options: {\*/Override any options from above/*} }]*

### API

#### Each composer function exposes an API:

##### Main API:

**`goToNext()`** *Go to next slide* <br />

**`goToPrev()`** *Go to previous slide* <br />

**`goTo(slideIndex)`** *Go to a particular (slideIndex) slide* <br />

**`getActiveSlideIndex()`** *Returns the current slide index.* <br />

**`destroy()`** *Destroys the carousel* <br />

##### Dots API:

**`getNrOfDots()`** *Returns the nr of total dots* <br />

**`nrOfActiveDot()`** *Returns the index of active dot* <br />

**`goToDot(dotIndex)`** *Go to a particular (dotIndex) dot* <br />

**`dotsList()`** *Returns an element that is a list of dots* <br />

##### AutoSlide API:

**`stop()`** *Stops the auto slide interval* <br />

**`start()`** *Starts the auto slide interval* <br />

##### AutoSlide API:

**`stop()`** *Stops the draggable functionality* <br />

**`start()`** *Starts the draggable functionality* <br />

## LICENSE

MIT