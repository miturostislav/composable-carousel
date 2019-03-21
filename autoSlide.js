const autoSlide = (time = 2000) => carousel => {
  let intervalID;
  const buildCarousel = carousel.build;

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

  function startAutoSlide() {
    intervalID = setInterval(() => {
      carousel.goToNext();
    }, time);
  }
};

export default autoSlide;
