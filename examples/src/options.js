import React from 'react';

function Options({ options, setOptions }) {
  return (
    <div className="options">
      <label>
        isInfinite: <input type="checkbox" checked={options.infinite} onChange={(e) => setOptions({ ...options, infinite: e.target.checked })}/>
      </label>
      <label>
        visibleSlides: <input type="number" value={options.visibleSlides} onChange={(e) => setOptions({ ...options, visibleSlides: Number(e.target.value) || 1 })}/>
      </label>
      <label>
        slidesToScroll: <input type="number" value={options.slidesToScroll} onChange={(e) => setOptions({ ...options, slidesToScroll: Number(e.target.value) || 1 })}/>
      </label>
      <label>
        transitionTime: <input type="number" value={options.transitionTime} onChange={(e) => setOptions({ ...options, transitionTime: Number(e.target.value) || 200 })}/>
      </label>
      <label>
        isAutoSlide: <input type="checkbox" checked={options.isAutoSlide} onChange={(e) => setOptions({ ...options, isAutoSlide: e.target.checked })}/>
      </label>
      <label>
        autoSlideTime: <input type="number" value={options.autoSlideTime} onChange={(e) => setOptions({ ...options, autoSlideTime: Number(e.target.value) || 2000 })}/>
      </label>
      <label>
        isDraggable: <input type="checkbox" checked={options.isDraggable} onChange={(e) => setOptions({ ...options, isDraggable: e.target.checked })}/>
      </label>
    </div>
  );
}

export default Options;