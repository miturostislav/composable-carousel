import React, { useState } from 'react';
import { render } from 'react-dom';
import Carousel from './carousel';
import Options from './options';

render(<App />, document.getElementById('app'));

function App() {
  const [options, setOptions] = useState({
    infinite: false,
    visibleSlides: 1,
    slidesToScroll: 1,
    transitionTime: 200,
    isAutoSlide: false,
    autoSlideTime: 2000,
    isDraggable: false
  });

  return (
    <div className="app-container">
      <Carousel options={options} />
      <Options options={options} setOptions={setOptions} />
    </div>
  );
}