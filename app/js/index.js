var slideIndex = 1;
var slideInterval = setInterval(plusSlide, 9000);
document.querySelector(".next-slider").addEventListener('click', plusSlide);
document.querySelector(".prev-slider").addEventListener('click', minusSlide);

function plusSlide() {
	moveSlide(slideIndex++);
}

function minusSlide() {
	moveSlide(slideIndex--);
}

function moveSlide() {
	var slidesArray = document.getElementsByClassName("slider__item");
	var current = slidesArray.length;

	if (slideIndex > slidesArray.length) {
		slideIndex = 1;
	}

	if (slideIndex < 1) {
		slideIndex = slidesArray.length;
	}

	for (var i = 0; i < slidesArray.length; i++) {
		slidesArray[i].style.display = "none";
	}

	slidesArray[current - slideIndex].style.display = "block";

}



	//галерея
	var galleryRow = document.getElementsByClassName("gallery-row__img");
	var galleryPreview = document.getElementsByClassName("modal-row__img");
	var galleryModal = document.querySelector(".gallery-modal");
	var galleryIndex = 1;
	showSlides(galleryIndex);

	document.querySelector(".gallery-row").addEventListener("click", function (event) {
		for (var i = 0; i <= galleryRow.length; i++) {
			if (event.target == galleryRow[i]) {
				currentSlide(i);
				galleryModal.style.display = "block";
			}
		}
	})

	document.querySelector(".modal-row").onclick= function (event) {
		for (var i = 0; i <= galleryPreview.length; i++) {
			if (event.target == galleryPreview[i]) {
				currentSlide(i);
			}
		}
	}

	document.onkeydown = function(event) {
		if (event.keyCode == 27) { 
			galleryClose();
		}
	}


	document.querySelector(".gallery-modal__close").onclick = galleryClose;

	function galleryClose() {
		galleryModal.style.display = "none";
	}


	document.querySelector(".modal-main__prev").onclick = function() {
		showSlides(galleryIndex--);
	}

	document.querySelector(".modal-main__next").onclick = function() {
		showSlides(galleryIndex++);
	}

	function currentSlide(n) {
		showSlides(galleryIndex = n+1);
	}

	function showSlides(n) {
		var slides = document.getElementsByClassName("modal-main__img");
		if (galleryIndex > slides.length) {galleryIndex = 1}
			if (galleryIndex < 1) {galleryIndex = slides.length}
				for (var i = 0; i < slides.length; i++) {
					slides[i].style.display = "none";
				}

				slides[galleryIndex - 1].style.display = "block";
	}
