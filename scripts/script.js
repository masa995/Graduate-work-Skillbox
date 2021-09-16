$(document).ready(function () {

	const headerHeight = $('.js-header').height();
	const widthScroll = window.innerWidth - document.documentElement.clientWidth + 'px';
	let keyLock = false; //animation lock key 
	const body = $('body');
	const header = $('.header');
	const sectionIntro = $('.js-section-intro');
	const btnsPopUp = $('.js-btn');
	const tags = $('.js-tag');
	const paddingLock = $('.js-padding-lock');

	const menuBody = $('.js-menu__body');
	const menuBtn = $('.js-menu__btn');

	const popup = $('.js-popup');
	const popupBody = $('.popup__body');
	const popupContent = $('.popup__content')
	const popupClose = $('.js-popup__close-btn');
	const form = $('.js-popup__form');
	const result = $('.js-label__result');

	menuBody.removeClass('no-js');
	sectionIntro.removeClass('no-js');
	header.removeClass('no-js');

	tags.removeClass('tag-zero');

	$('input[type = "tel"]').inputmask({ "mask": "+7 (999) 999-99-99" });

	$('.menu__link').click(function (event) {
		event.preventDefault();
		let href = $(this).attr('href');
		let offset = $(href).offset().top - headerHeight;

		body.removeClass('lock');
		menuBtn.removeClass('active');
		menuBody.removeClass('active');

		$('html, body').animate(
			{
				scrollTop: offset
			}, 700)
	});

	menuBtn.click(function (event) {
		$(this).toggleClass('active');
		menuBody.toggleClass('active');
		body.toggleClass('lock');
	});

	//Open PopUp
	btnsPopUp.click(function (event) {
		if (body.hasClass('lock')) {
			popup.addClass('active');
			return keyLock = false;
		}
		else {
			lock();
			popup.addClass('active');
			return keyLock = false;
		}
	});

	//Close PopUp
	popupClose.click(function (event) {
		if (keyLock) {
			return;
		}

		else {
			if (menuBody.hasClass('active')) {
				popup.removeClass('active');
				setTimeout(function () {
					rebootForm(form);
				}, 500);
			}

			else {
				unlock();
				popup.removeClass('active');
				setTimeout(function () {
					rebootForm(form);
				}, 500);
			}

			keyLock = true;
		}
	});

	popupBody.click(function (event) {
		if (keyLock) {
			return;
		}

		else {
			if (!event.target.closest('.popup__content')) {
				if (menuBody.hasClass('active')) {
					popup.removeClass('active');
					setTimeout(function () {
						rebootForm(form);
					}, 500);

				}

				else {
					unlock();
					popup.removeClass('active');
					setTimeout(function () {
						rebootForm(form);
					}, 500);
				}
				keyLock = true;
			}
		}
	});

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
					success: function (data) {
						result.html(data);
					}
				}).done(() => {
					subForm.trigger('reset');
				});

				return false;
			}
		});
	});

	function rebootForm(elem) {
		let validator = $(elem).validate();
		validator.resetForm();
		$(elem).get(0).reset();
		result.text('');
	}

	function lock() {
		body.toggleClass('lock');
		$('html').toggleClass('html_lock');
		$(':input, a').attr('tabindex', '-1');

		paddingLock.css({
			'padding-right': widthScroll
		});
	}

	function unlock() {
		body.toggleClass('lock');
		$('html').toggleClass('html_lock');
		$(':input, a').attr('tabindex', '1');

		paddingLock.css({
			'padding-right': 0
		});
	}
});