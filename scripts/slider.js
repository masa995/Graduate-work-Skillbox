
var swiper = new Swiper('.slider', {
  slidesPerView: 1,

  breakpoints: {

    992: {
      slidesPerView: 2,
      spaceBetween: 35
    },

    1240: {
      slidesPerView: 3,
      spaceBetween: 30

    }
  },

  loop: true,
  wrapperClass: 'slider__wrapper',
  slideClass: 'slider__item',

  pagination: {
    el: '.slider__pagination',
    type: 'bullets',
    bulletClass: 'paginator__item',
    bulletActiveClass: 'paginator__item-active',
    clickable: true
  },

  navigation: {
    nextEl: '.slider__next-arrow',
    prevEl: '.slider__previous-arrow',
  },
});