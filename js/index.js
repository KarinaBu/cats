
let assignedHearts = [];

window.addEventListener('DOMContentLoaded', function () {

	//Бургер-меню

	document.querySelector('#burger').addEventListener('click', function () {
		document.querySelector('#menu').classList.toggle('is-active')
	})

	document.getElementById('#close').addEventListener('click', function () {
		document.querySelector('#menu').classList.toggle('is-active');
	})


	//Карточки Gallery

	if (window.innerWidth < 630) {
		jQuery(document).ready(function ($) {
			if ($('.gallery__list').find('.gallery__item').length > 4) {
				$('.gallery__item:nth-child(n+5)').slideToggle('');
				$('.gallery__cards-btn').click(function () {
					$('.gallery__item:nth-child(n+5)').slideToggle('');
					$(this).toggleClass('opnd_g');
					if ($(this).hasClass('opnd_g')) {
						$(this).html('Показать меньше');
					} else {
						$(this).html('Показать еще 20');
					}
				});
			} else {
				$('.gallery__cards-btn').hide();
			}
		});
	}

	//Валидация формы

	new JustValidate('.news__right-form', {
		colorWrong: '#F06666',
		rules: {
			mail: {
				required: true,
				email: true,
			},
		},
		messages: {
			mail: 'Недопустимый формат',
		},
	});



	//Избранное

	function assignLikes() {
		let hearts = document.querySelectorAll('.gallery__item-like');
		let favorites = document.getElementsByClassName('like');

		assignedHearts.forEach(el => {
			el.element.removeEventListener('click', el.likeHandler)
		})
		assignedHearts = [];

		hearts.forEach(element => {
			assignedHearts.push({
				element,
				likeHandler() {likeHandler(element)}
			})
		})

		assignedHearts.forEach(el => {
			el.element.addEventListener("click", el.likeHandler);
		})

		function likeHandler(element) {

			element.classList.toggle('gallery__item-like-white');
			if (element.classList.contains('gallery__item-like-white'))
			{
				let node = element.nextSibling.nextSibling;
				console.log(node);
				node.classList.toggle('like-show');
				setTimeout(like, 3000, node);
				}
		};

		function like(element) {
			element.classList.remove('like-show');
		}
	}
	assignLikes();

	//Кнопка наверх

	let scroller;
	let timer;
	document.getElementById('#top').onclick = function () {
		scroller = window.pageYOffset;
		scrollToTop();
	}

	function scrollToTop() {
		if (scroller > 0) {
			window.scrollTo(0, scroller);
			scroller = scroller - 100;
			timer = setTimeout(scrollToTop, 10)
		} else {
			clearTimeout(timer);
			window.scrollTo(0, 0);
		}
	}

	window.onscroll = function () {
		let scrolled = window.pageYOffset || document.documentElement.scrollTop;
		if (scrolled > 100) {
			document.getElementById('#top').style.display = 'block';
		} else {
			document.getElementById('#top').style.display = 'none';
		}
	}

	//Сортировка котиков

	let priceBtn = document.getElementById('price-btn');
	let ageBtn = document.getElementById('age-btn');

	function sortByPrice(asc) {
		if (asc) {
			Array.from(document.querySelectorAll(".gallery__list > li[data-cat-price]"))
				.sort(({
					dataset: {
						catPrice: a
					}
				}, {
					dataset: {
						catPrice: b
					}
				}) => Number(a) - Number(b))
				.forEach((item) => {
					item.parentNode.appendChild(item);
				});
		} else {
			Array.from(document.querySelectorAll(".gallery__list > li[data-cat-price]"))
				.sort(({
					dataset: {
						catPrice: a
					}
				}, {
					dataset: {
						catPrice: b
					}
				}) => Number(b) - Number(a))
				.forEach((item) => {
					item.parentNode.appendChild(item);
				});
		}
	}

	function sortByAge(asc) {
		if (asc) {
			Array.from(document.querySelectorAll(".gallery__list > li[data-cat-age]"))
				.sort(({
					dataset: {
						catAge: a
					}
				}, {
					dataset: {
						catAge: b
					}
				}) => Number(a) - Number(b))
				.forEach((item) => {
					item.parentNode.appendChild(item);
				});
		} else {
			Array.from(document.querySelectorAll(".gallery__list > li[data-cat-age]"))
				.sort(({
					dataset: {
						catAge: a
					}
				}, {
					dataset: {
						catAge: b
					}
				}) => Number(b) - Number(a))
				.forEach((item) => {
					item.parentNode.appendChild(item);
				});
		}
	}

	priceBtn.addEventListener("click", function () {
		let arrow = this.children[0].classList.toggle('arrow-up');
		let asc = Number(this.dataset.sortAsc);
		sortByPrice(asc);
		this.dataset.sortAsc = Number(!asc);
		assignLikes();
	});

	ageBtn.addEventListener("click", function () {
		let arrow = this.children[0].classList.toggle('arrow-up');
		let asc = Number(this.dataset.sortAsc);
		sortByAge(asc);
		this.dataset.sortAsc = Number(!asc);
		assignLikes();
	});

})
