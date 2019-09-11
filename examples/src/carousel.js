import React, { useEffect, useRef } from 'react';
import createCarousel from '../../src/createCarousel';

function Carousel({ options }) {
  const carouselSelectorRef = useRef(null);
  const carouselRef = useRef(null);
  const activeSlideIndexRef = useRef(0);
  const nrOfSlides = options.nrOfSlides || 9;

  useEffect(() => {
    carouselRef.current = createCarousel({
      carouselEl: carouselSelectorRef.current,
      onChange: () => activeSlideIndexRef.current = carouselRef.current.getActiveSlideIndex(),
      options: Object.assign({}, options, { activeSlideIndex: activeSlideIndexRef.current })
    });
    return carouselRef.current.destroy;
  }, [options]);

  return (
    <div className="carousel">
      <div className="carousel-selector" id="selector" ref={carouselSelectorRef}>
        {
          [...Array(nrOfSlides)].map((noop, index) => (
            <div key={index} className="carousel-slide">
              <img src={`https://picsum.photos/id/${index * 100}/200/300`} />
            </div>
          ))
        }
      </div>
      <button onClick={() => carouselRef.current.goToNext()}>Next</button>
      <button onClick={() => carouselRef.current.goToPrev()}>Prev</button>
    </div>
  );
}

export default Carousel;