const autoSlide = ({
  autoSlideTime = 2000,
  isAutoSlide = true,
} = {}) => carousel => {
  let intervalID;
  const buildCarousel = carousel.build;
  const destroyCarousel = carousel.destroy;

  Object.assign(carousel, {
    autoSlideTime,
    isAutoSlide,
    build: () =>
      buildCarousel().then(() => {
        clearInterval(intervalID);
        if (isAutoSlide) {
          startAutoSlide();
        }
      }),
    destroy: () => destroyCarousel().then(() => clearInterval(intervalID)),
  });
  carousel.api.autoSlide = {
    start() {
      startAutoSlide();
    },
    stop() {
      clearInterval(intervalID);
    },
  };

  function startAutoSlide() {
    clearInterval(intervalID);
    intervalID = setInterval(carousel.goToNext, carousel.autoSlideTime);
  }
};

export default autoSlide;
