document.querySelector(".catalog-sort__list").addEventListener("change", function sort() {
	if (this.value == "price-desc") {
		arr.sort(function(a,b) {
			return a['start-coast'] - b['start-coast'];
		});
		showGoods();
	}
	if (this.value == "price-asc") {
		arr.sort(function(a,b) {
			return b['start-coast'] - a['start-coast'];
		});
		showGoods()
	}
	if (this.value == "recommend") {
		arr.sort(function(a,b) {
			return b['recommend'] - a['recommend'];
		});
		showGoods()
	}
})

//фильтр по цене
var priceMin = document.querySelector(".filter-price__min");
var priceMax = document.querySelector(".filter-price__max")

priceMin.addEventListener("change", function() {
	if (this.value < minNumber || this.value > maxNumber) {
		this.value = minNumber;
	}
})

priceMax.addEventListener("change", function() {
	if (this.value > maxNumber || this.value < minNumber) {
		this.value = maxNumber;
	}
})


document.querySelector(".filter-price__btn").addEventListener("click", function() {
	if (arrauxiliary.length > 0) {
		arr = arrauxiliary.slice(0);
	} else {
		arr = newArr.slice(0);
	}
	var priceMinValue = priceMin.value;
	var priceMaxValue = priceMax.value;
	if ((priceMaxValue == "" && priceMinValue == "") || (priceMaxValue == "")) {
		return false;
	} else {
		arr = arr.filter(function (elem) {
			if (elem['start-coast'] >= priceMinValue && elem['start-coast'] <= priceMaxValue) {
				return true;
			}

			return false;
		});

		for (var i = 0; i < arr.length; i++) {
			arrauxiliary.push(arr[i]);
		}
		showGoods()
	}
})

//фильтр по состоянию

document.querySelector(".filter-condition-new").addEventListener("change", function() {
	if (this.checked) {
		if (arrauxiliary.length > 0) {
			arr = arrauxiliary.slice(0);
		} else {
			arr = newArr.slice(0);
		}

		for (var i = 0; i < newArr.length; i++) {
			if (newArr[i]["product condition"] == "new") {
				arrauxiliary.push(newArr[i]);
			}
		}
		arr = arrauxiliary.slice(0);
		showGoods();
	} else {
		arrauxiliary = arrauxiliary.filter(function(elem) {
			if (elem["product condition"] == "not new") {
				return true;
			}

			return false
		});
		if (arrauxiliary.length == 0) {
			arr = newArr.slice(0)
			showGoods();
		} else {
			arr = arrauxiliary.slice(0)
			showGoods();
		}
	}
})

document.querySelector(".filter-condition-notNew").addEventListener("change", function() {
	if (this.checked) {
		if (arrauxiliary.length > 0) {
			arr = arrauxiliary.slice(0);
		} else {
			arr = newArr.slice(0);
		}
		for (var i = 0; i < newArr.length; i++) {
			if (newArr[i]["product condition"] == "not new") {
				arrauxiliary.push(newArr[i]);
			}
		}
		arr = arrauxiliary.slice(0);
		showGoods();
	} else {
		arrauxiliary = arrauxiliary.filter(function(elem) {
			if (elem["product condition"] == "new") {
				return true;
			}
			return false
		});
		if (arrauxiliary.length == 0) {
			arr = newArr.slice(0)
			showGoods();
		} else {
			arr = arrauxiliary.slice(0)
			showGoods();
		}
	}
})

//фильтр-техническое состояние

document.querySelector(".filter-repair-ok").addEventListener("change", function() {
	if (this.checked) {
		if (arrauxiliary.length > 0) {
			arr = arrauxiliary.slice(0);
		} else {
			arr = newArr.slice(0);
		}

		for (var i = 0; i < newArr.length; i++) {
			if (newArr[i]["repair"] == "ok") {
				arrauxiliary.push(newArr[i]);
			}
		}
		arr = arrauxiliary.slice(0);
		showGoods();
	} else {
		arrauxiliary = arrauxiliary.filter(function(elem) {
			if (elem["repair"] != "ok") {
				return true;
			}

			return false
		});
		if (arrauxiliary.length == 0) {
			arr = newArr.slice(0)
			showGoods();
		} else {
			arr = arrauxiliary.slice(0)
			showGoods();
		}
	}
})

document.querySelector(".filter-repair-faulty").addEventListener("change", function() {
	if (this.checked) {
		if (arrauxiliary.length > 0) {
			arr = arrauxiliary.slice(0);
		} else {
			arr = newArr.slice(0);
		}

		for (var i = 0; i < newArr.length; i++) {
			if (newArr[i]["repair"] == "faulty") {
				arrauxiliary.push(newArr[i]);
			}
		}
		arr = arrauxiliary.slice(0);
		showGoods();
	} else {
		arrauxiliary = arrauxiliary.filter(function(elem) {
			if (elem["repair"] != "faulty") {
				return true;
			}

			return false
		});
		if (arrauxiliary.length == 0) {
			arr = newArr.slice(0)
			showGoods();
		} else {
			arr = arrauxiliary.slice(0)
			showGoods();
		}
	}
})

// фильтр-диагональ

document.querySelector(".filter-diagonal-wide").addEventListener("change", function() {
	if (this.checked) {
		if (arrauxiliary.length > 0) {
			arr = arrauxiliary.slice(0);
		} else {
			arr = newArr.slice(0);
		}

		for (var i = 0; i < newArr.length; i++) {
			if (newArr[i]["diagonal"] > 6) {
				arrauxiliary.push(newArr[i]);
			}
		}
		arr = arrauxiliary.slice(0);
		showGoods();
	} else {
		arrauxiliary = arrauxiliary.filter(function(elem) {
			if (elem["diagonal"] < 6) {
				return true;
			}
			return false
		});

		if (arrauxiliary.length == 0) {
			arr = newArr.slice(0)
			showGoods();
		} else {
			arr = arrauxiliary.slice(0)
			showGoods();
		}
	}
})

document.querySelector(".filter-diagonal-middle").addEventListener("change", function() {
	if (this.checked) {
		if (arrauxiliary.length > 0) {
			arr = arrauxiliary.slice(0);
		} else {
			arr = newArr.slice(0);
		}

		for (var i = 0; i < newArr.length; i++) {
			if (newArr[i]["diagonal"] >= 5 && newArr[i]["diagonal"] <= 6) {
				arrauxiliary.push(newArr[i]);
			}
		}
		arr = arrauxiliary.slice(0);
		showGoods();
	} else {
		arrauxiliary = arrauxiliary.filter(function(elem) {
			if (elem["diagonal"] < 5 && elem["diagonal"] > 6 ) {
				return true;
			}
			return false
		});
		if (arrauxiliary.length == 0) {
			arr = newArr.slice(0)
			showGoods();
		} else {
			arr = arrauxiliary.slice(0)
			showGoods();
		}
	}
})

document.querySelector(".filter-diagonal-small").addEventListener("change", function() {
	if (this.checked) {
		if (arrauxiliary.length > 0) {
			arr = arrauxiliary.slice(0);
		} else {
			arr = newArr.slice(0);
		}
		for (var i = 0; i < newArr.length; i++) {
			if (newArr[i]["diagonal"] < 3) {
				arrauxiliary.push(newArr[i]);
			}
		}
		arr = arrauxiliary.slice(0);
		showGoods();
	} else {
		arrauxiliary = arrauxiliary.filter(function(elem) {
			if (elem["diagonal"] > 3 ) {
				return true;
			}
			return false
		});
		if (arrauxiliary.length == 0) {
			arr = newArr.slice(0)
			showGoods();
		} else {
			arr = arrauxiliary.slice(0)
			showGoods();
		}
	}
})

//фильтр-аккордеон
var filterBtn = document.getElementsByClassName("catalog-filter__title");

for (var i = 0; i < filterBtn.length; i++) {
	filterBtn[i].addEventListener("click", function() {
		this.classList.toggle("show")
		var block = this.nextElementSibling;
		block.classList.toggle('catalog-filter__block_hide');	
	})
}
