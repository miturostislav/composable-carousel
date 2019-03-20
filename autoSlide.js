const autoSlide = time => carousel => {
  let intervalID;
  const buildCarousel = carousel.build;
  function startAutoSlide() {
    intervalID = setInterval(() => {
      carousel.goToNext();
    }, time);
  }

  carousel.build = () => {
    buildCarousel();
    startAutoSlide();
  };
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
