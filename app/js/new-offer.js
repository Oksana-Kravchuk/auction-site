var inputImg = document.querySelector(".img-load__file");
	var imgPreview = document.querySelector(".img-preview");

	inputImg.addEventListener('change', function() {
		var curFiles = inputImg.files;

		if (curFiles.length == 0) {
			var note = document.createElement('p');
			note.textContent = 'Файл не выбран';
			imgPreview.appendChild(note);
			note.classList.add("img-preview__text");
		} else {
			for (var i = 0; i < curFiles.length; i++) {
				var imgItem = document.createElement('div');
				var note = document.createElement('p');
				note.classList.add("img-preview__text");

				if (validFileType(curFiles[i])) {
					note.textContent = 'Имя файла ' + curFiles[i].name + ', размер ' + returnFileSize(curFiles[i].size) + '.';
					var image = document.createElement('img');
					image.style.backgroundImage = "url(" + window.URL.createObjectURL(curFiles[i]) +")";
					imgItem.appendChild(image);
					image.classList.add("preview-picture");
					image.insertAdjacentHTML("afterEnd", "<span class = 'img-preview__delete'>x</span>")
					imgItem.appendChild(note);
				} else {
					note.textContent = 'Не допустимый тип файла';
					imgItem.appendChild(note);
				}

				imgPreview.appendChild(imgItem);
				imgItem.classList.add("img-preview__item");
			}
		}
		var delImgBtn = document.getElementsByClassName("img-preview__delete");
		
		for (var i = 0; i < delImgBtn.length; i++) {
			delImgBtn[i].addEventListener("click", function() {
				imgPreview.removeChild(this.parentNode);
			})
		}
	})

	var fileTypes = [
	'image/jpeg',
	'image/pjpeg',
	'image/png'
	]

	function validFileType(file) {
		for(var i = 0; i < fileTypes.length; i++) {
			if(file.type === fileTypes[i]) {
				return true;
			}
		}

		return false;
	}

	function returnFileSize(number) {
		if (number < 1024) {
			return number + 'bytes';
		} else if(number >= 1024 && number < 1048576) {
			return (number/1024).toFixed(1) + 'KB';
		} else if(number >= 1048576) {
			return (number/1048576).toFixed(1) + 'MB';
		}
	}