$(document).ready(function(){
	//переменные
	const headerHeight = $('.js-header').height();//высота шапки
	const widthScroll = window.innerWidth - document.documentElement.clientWidth + 'px';
	let keyLock = false; //ключ для блокирования, когда идет анимации 
	const body = $('body');
	const header = $('.header');
	const sectionIntro = $('.js-section-intro');
	const btns = $('.js-btn');
	const tags = $('.js-tag');
	const paddingLock = $('.js-padding-lock'); //body и фиксированные элементы 
	
	//переменные меню
	const menuBody = $('.js-menu__body');
	const menuBtn = $('.js-menu__btn');
	
	//переменные popup
	const popup = $('.js-popup');
	const popupBody = $('.popup__body');
	const popupContent = $('.popup__content')
	const popupClose = $('.js-popup__close-btn');
	const form = $('.js-popup__form');
	const result = $('.js-label__result');

	//удаление классов, которые работают если не работает js
	menuBody.removeClass('no-js');
	sectionIntro.removeClass('no-js');
	header.removeClass('no-js');

	tags.removeClass('tag-zero');//анимация тегов на сайте 

	// маска для телефона
	$('input[type = "tel"]').inputmask({"mask": "+7 (999) 999-99-99"}); //specifying options

	  // скролл плавный
	$('.menu__link').click(function (event){
		event.preventDefault();	  //удаляем поведение по умолчанию
		let href = $(this).attr('href'); //переменная в которой хронится id секции
		
		//offset - отступ от верха до определенной секции
		//top выбираем координату отступ с верху		
		let offset = $(href).offset().top - headerHeight;

		// закрываем меню
		body.removeClass('lock');
		menuBtn.removeClass('active');
		menuBody.removeClass('active');

		//анимация плавного скролла
		$('html, body').animate(
		{
			scrollTop: offset  //анимация скролла
		},700) //700ms - длится анимация
	});	

	//открывает и закрывает меню	
	menuBtn.click(function(event){
		$(this).toggleClass('active');
		menuBody.toggleClass('active');
		body.toggleClass('lock');
	});

	//открывает popup
	btns.click(function(event){
		if(body.hasClass('lock')) {
			popup.addClass('active');
			return keyLock = false;
		}		
		else {
			lock();
			popup.addClass('active');
			return keyLock = false;
		}
	});
	
	//закрыть popup
	// функция выполняет закрытие формы по нажатию на крестик
	 popupClose.click(function(event){
	 	if(keyLock){	
	 		return;
	 	}

	 	else {
	 		if(menuBody.hasClass('active')){ 		 	
	 			popup.removeClass('active');
	 			setTimeout(function (){
	 			rebootForm(form);
	 			}, 	500);
	 		}
	 		
	 		else {
	 			unlock();
	 			popup.removeClass('active');
	 			setTimeout(function (){
	 			rebootForm(form);
	 			}, 500);
	 		}

	 	keyLock = true;
	 	}	 	
	 });
 
 	// функция выполняет закрытие формы по нажатию на темную область
 	popupBody.click(function(event){
 		if(keyLock){	
	 			return;
	 		}
	
		else {	
			if (!event.target.closest('.popup__content')){//если в родителях нет .popup__content
 				if(menuBody.hasClass('active')){ 		 	
	 				popup.removeClass('active');
	 				setTimeout(function (){
	 				rebootForm(form);
	 				}, 500);

	 			}	

	 			else {
	 				unlock();
	 				popup.removeClass('active');
	 				setTimeout(function (){
	 				rebootForm(form);
	 				}, 500);
	 			}
			keyLock = true;
			}
 		}	
 	});
	// формы
 	form.each(function () {
		$(this).validate({
			focusInvalid: false,
				rules: {
					personName: {
						required: true,
						},
					personPhone: {
						required: true,
						},
					personEmail: {
						required: true,
						email: true,
						}
					},
					messages: {
						personName: {
							required: 'Введите имя'
						},
						personPhone: {
							required: 'Введите телефон'
							
						},
						personEmail: {
							required: 'Введите email',
							email: 'Неверный формат email'
						}
					},
			submitHandler(form) {
				result.text('Загрузка...');
				let subForm = $(form);

				$.ajax({
				type: 'POST',
				url: 'mail.php',
				data: subForm.serialize(),
				success: function(data){
					result.html(data);
					}
				}).done(() => {
					subForm.trigger('reset');
				});

				return false;
				}
			});
		});

 // очищает форму
	function rebootForm (elem){
		let validator = $(elem).validate();
		validator.resetForm();//удаляем класс erorr в элементах и очищаем историю
		$(elem).get(0).reset();//очищаем форму	
		result.text('');		
 	}
 
	//блокирует скролл 
	  function lock() {
	  	body.toggleClass('lock');
	  	$('html').toggleClass('html_lock');
		$(':input, a').attr('tabindex', '-1'); // блокирует табуляцию
		
		//чтобы не дергался скролл при открытие popUp
		paddingLock.css({
			'padding-right' : widthScroll
		});
  }

 	//разблокирует скролл 
  	function unlock() {
  		body.toggleClass('lock');
  		$('html').toggleClass('html_lock');
  		$(':input, a').attr('tabindex', '1'); // разблокирование табуляцию
  		
  		paddingLock.css({
			'padding-right' : 0
		});	  
  	}
});