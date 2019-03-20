const autoSlide = time => carousel => {
  let intervalID;
  function startAutoSlide() {
    intervalID = setInterval(() => {
      carousel.goToNext();
    }, time);
  }

  startAutoSlide();
  carousel.api.autoSlide = {
    start() {
      clearInterval(intervalID);
      startAutoSlide();
    },
    stop() {
      clearInterval(intervalID);
    },
  };
};

export default autoSlide;
