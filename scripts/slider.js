
  var swiper = new Swiper('.slider', {
      slidesPerView: 1,

      breakpoints: {//брейкпоинты

     992: {
      slidesPerView: 2,
       spaceBetween: 35
     },

      1240: {//(больше или равно 1240px)
        slidesPerView: 3, //число slider__item на экране
        spaceBetween: 30 //расстояние между слайдами
        
      }
    },

    loop: true,//позволяет листать по кругу
    wrapperClass: 'slider__wrapper',
    slideClass: 'slider__item',

    pagination: {//точки
      el: '.slider__pagination',// класс контейнира для pagination
      type: 'bullets', //тип - точки
      bulletClass: 'paginator__item',
      bulletActiveClass: 'paginator__item-active',
      clickable: true //можно листать слайдер нажимая на точки(только для точек)
    },

    navigation: { //кнопки
      nextEl: '.slider__next-arrow',
      prevEl: '.slider__previous-arrow',
      },
    });