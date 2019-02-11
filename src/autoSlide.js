const autoSlide = time => carousel => {
  setInterval(() => {
    carousel.goToNext();
  }, time);
};

export default autoSlide;
