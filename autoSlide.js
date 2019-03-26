const autoSlide = ({
  autoSlideTime = 2000,
  isAutoSlideActive = true,
} = {}) => carousel => {
  let intervalID;
  const buildCarousel = carousel.build;
  const destroyCarousel = carousel.destroy;

  Object.assign(carousel, {
    autoSlideTime,
    isAutoSlideActive,
    build: () =>
      buildCarousel().then(() => {
        clearInterval(intervalID);
        if (isAutoSlideActive) {
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
    intervalID = setInterval(() => {
      carousel.goToNext();
    }, carousel.autoSlideTime);
  }
};

export default autoSlide;
