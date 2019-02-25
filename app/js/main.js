document.addEventListener("DOMContentLoaded", function() {
	//проверяю наличие товаров в корзине
	if (localStorage.getItem('cart') != null) {
		cart = JSON.parse (localStorage.getItem('cart'));
	}
		//проверяем ставки в LS
		showMiniCart()
	});


//загрузка товаров
var myObj;
var arrauxiliary = []; //допмассив для фильтров и сортировки
var arr = []; //основной
var catalog;
var startCoast = []; 
var	maxNumber;
var minNumber;
var newArr; // равный дефолтному
var bidArray = [];
var	catalog;;

var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "goods.txt", true);

xmlhttp.onreadystatechange = function() {
	if ((this.readyState == 4) && (this.status == 200)) {
		myObj = JSON.parse(this.responseText);
		for (var key in myObj) {
			arr.push(myObj[key])
		}
		if (localStorage.getItem('bidItem') != null) {
			bidArray = JSON.parse (localStorage.getItem('bidItem'));
			for (var i = 0; i < arr.length; i++) {
				for (var j = 0; j < bidArray.length; j++) {
					if (arr[i]['id'] == bidArray[j]['id']) {
						arr[i]["start-coast"] = bidArray[j]["start-coast"]
					}
				}
			}
		}

	//загружаем товары
	showGoods()

	newArr = arr.slice(0); //копируем дефолтный массив
	for (var i = 0; i < arr.length; i++) {
		startCoast.push(arr[i]['start-coast']);
	}

	maxNumber = Math.max.apply(null, startCoast);
	minNumber = Math.min.apply(null, startCoast);

}
}
xmlhttp.send();


function showGoods() {
	goods = "";
	for (var i = 0; i < arr.length; i++) {
		goods += '<div class = "product-cell">';
		goods += '<a class = "product-cell__picture" href = '+ arr[i]['href'] +'>' + '<img class = "product-img" src = "' + arr[i]['image'] +'">' + '</a>';
		goods += '<div class = "product-cell__time">' + "До окончания аукциона: " + Math.floor((new Date(arr[i]['start sale']) - Date.now())/86400000) + " дн." +'</div>';
		goods += '<h4 class = "product-cell__title">' + arr[i]['name'] + '</h4>';
		goods += '<div class = "product-cell__price">'
		goods += '<div class = "price-title">' + "Текущая цена:" + '</div>';
		goods += '<div class = "product-price" data-art = "'+ arr[i]['id']+'">' + arr[i]['start-coast'] + '</div>';
		goods += '</div>'
		goods += '<div class = "product-cell__price">'
		goods += '<div class = "price-title">' + "Купить сейчас:" + '</div>';
		goods += '<div class = "product-price">' + arr[i]['coast'] + '</div>';
		goods += '</div>'
		goods += '<div class = "product-cell__btn">'
		goods += '<div class = "product-btn-bid" data-art = "'+arr[i]['id'] + '">' + "<p class = product-btn-title>" + "Сделать ставку" + "</p>" + '</div>';
		goods += '<div class = "product-btn-buy" data-art = "'+ arr[i]['id']+'">' + "<p class = product-btn-title>" + "Купить" + "</p>" + '</div>';
		goods += '</div>'
		goods += '</div>';
	}
	catalog = document.querySelector(".catalog-products");
	catalog.innerHTML = goods;
	var buyProduct = document.getElementsByClassName("product-btn-buy");
	for ( var i = 0; i < buyProduct.length; i++) {
		buyProduct[i].addEventListener('click', addToCart);
		buyProduct[i].addEventListener('click', showModalCart);
	}
	var bidProduct = document.getElementsByClassName("product-btn-bid");
	for (var i = 0; i < bidProduct.length; i++) {
		bidProduct[i].addEventListener("click", makeBid)
	}
}

//Добавляем товар в корзину
var cart = {}; //корзина
function addToCart() {
	var articul = this.getAttribute('data-art');
	if (cart[articul]!=undefined) {
		cart[articul]++;
	} else cart[articul] = 1;

	localStorage.setItem('cart', JSON.stringify(cart));
	showMiniCart();
	showCart()
}


function showMiniCart() {
	var count = 0;
	//показываем содеримое корзины
	for (var j in cart) {
		count++;
	}

	document.querySelector(".count-goods").innerHTML = count;
}

function showCart() {
	var result = "";
	var totalSum = 0;

	for (var key in cart) {
		result += '<div class = "cart-info">';
		result += '<button class = "cart-info__delete" data-art = "'+key+'">X</button>';
		result += '<img src = "'+ myObj[key].image +'" class = "cart-info__img">';
		result += '<div class = "cart-info__title">'+ myObj[key]['name']+'</div>';
		result += '<div class = "cart-info__amount">';
		result += '<button class = "cart-amount-minus" data-art = "'+key+'">&ndash;</button>';
		result += '<input class = "cart-amount" type = "text" value = "'+cart[key]+'">';
		result += '<button class = "cart-amount-plus" data-art = "'+key+'">+</button>';
		result += '</div>';
		result += '<div class = "cart-info__price">';
		result += '<span class = "cart-sum">'+ cart[key]*myObj[key]['coast']+'</span>';
		result += '<span class = "cart-currency">грн</span>';
		result += '</div>';
		result += '</div>';
		totalSum += cart[key]*myObj[key]['coast'];
	}

	document.querySelector(".cart-popup__content").innerHTML = result;
	document.querySelector(".cart-total-sum").innerHTML = totalSum;

	var plusProduct = document.getElementsByClassName("cart-amount-plus");
	var minusProduct = document.getElementsByClassName("cart-amount-minus");
	var btnDelete = document.getElementsByClassName("cart-info__delete");
	for ( var i = 0; i < plusProduct.length; i++) {
		plusProduct[i].addEventListener('click', plusGoods);
	}

	for ( var k = 0; k < minusProduct.length; k++) {
		minusProduct[k].addEventListener('click', minusGoods);
	}

	for ( var j = 0; j < btnDelete.length; j++) {
		btnDelete[j].addEventListener('click', deleteGoods);
	}
}

function plusGoods() {
	var articul = this.getAttribute('data-art');
	cart[articul]++;
	saveCartToLS();
	showCart();       
}

function minusGoods() {
	var articul = this.getAttribute('data-art');
	if (cart[articul] > 1) cart[articul]--;
	else delete cart[articul];
	saveCartToLS();
	showCart();
	showMiniCart()
}

function deleteGoods() {
	var articul = this.getAttribute('data-art');
	delete cart[articul];
	saveCartToLS();
	showCart();
	showMiniCart()
}

function saveCartToLS() {
	localStorage.setItem('cart', JSON.stringify(cart))
}

//модальное окно корзина
var headerCart = document.querySelector(".header-cart");
headerCart.addEventListener("click", showModalCart);
headerCart.addEventListener("click", showCart);

function showModalCart() {
	var cartPopup = document.querySelector(".page__cart");
	cartPopup.style.display = "block";
	document.querySelector(".cart-popup__close").addEventListener("click", cartClose);
	document.querySelector(".overlay-modal").addEventListener("click", cartClose);
	document.querySelector(".cart-popup").onclick = function(event) {event.stopPropagation()};
	document.querySelector(".btn-continue").addEventListener("click", cartClose);

	document.onkeydown = function(event) {
		if (event.keyCode == 27) { 
			cartClose();
		}
	}

	function cartClose() {
		cartPopup.style.display = 'none';
		return false;
	}
}


//модальное окно сделать ставку
function makeBid() {
	var bidObj = {};
	var result = "";
	var bidBlock = document.querySelector(".bid-block");
	bidBlock.style.display = "block";
	var articul = this.getAttribute('data-art');
	bidObj[articul] = 1;
	for (var key in bidObj) {
		result += '<div class = "bid-info">';
		result += '<img src = "'+ myObj[key].image +'" class = "bid-info__img">';
		result += '<div class = "bid-info__title">'+ myObj[key]['name']+'</div>';
		result += '</div>';
		result += '<div class = "make-bid">';
		result += '<div class = "bid-current">';
		result += '<p class = "bid-current__title">Текущая цена</p>';
		result += '<div class = "bid-current__price">' + myObj[key]['start-coast'] + '</div>';
		result += '</div>';
		result += '<div class = "bid-offer">';
		result += '<p class = "bid-offer__title">Ставка</p>';
		result += '<input type = "number" class = "bid-offer__price">';
		result += '</div>';
		result += '<button class = "make-bid-btn">Сделать ставку</button>';
		result += '</div>';
		
	}

	document.querySelector(".bid-popup__content").innerHTML = result;

	var currentBid = document.querySelector(".bid-current__price");
	var offerBid = document.querySelector(".bid-offer__price");
	offerBid.value = parseInt(currentBid.innerHTML) + 20;

	document.querySelector(".make-bid-btn").addEventListener("click", function() {
		var offerValue = offerBid.value;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i]['id'] == articul) {
				arr[i]['start-coast'] = offerValue;
				currentBid.innerHTML = offerValue + " грн";
				bidArray.push(arr[i]);
				localStorage.setItem('bidItem', JSON.stringify(bidArray));
			}
		}
		var prodStartBid = document.getElementsByClassName("product-price");
		for (var i = 0; i < prodStartBid.length; i++) {
			if (prodStartBid[i].getAttribute("data-art") == articul) {
				prodStartBid[i].innerHTML = offerValue + " грн";
			}
		}
	})

	document.querySelector(".bid-popup__close").addEventListener("click", bidWindowClose);
	document.querySelector(".overlay-modal_bid").addEventListener("click", bidWindowClose);
	document.querySelector(".bid-popup").onclick = function(event) {event.stopPropagation()}
	document.querySelector(".btn-continue_size").addEventListener("click", bidWindowClose);

	document.onkeydown = function(event) {
		if (event.keyCode == 27) { 
			bidWindowClose();
		}
	}

	function bidWindowClose() {
		bidBlock.style.display = 'none';
		return false;
	}


}

//фиксация меню
var htmlHeight = document.documentElement.scrollHeight;
window.addEventListener('scroll', function() {
	var scrolling = document.documentElement.scrollTop;
	if (scrolling > 150 && htmlHeight > 800) {
		document.querySelector(".header__top").classList.add("fixed-line");
	} else {
		document.querySelector(".header__top").classList.remove('fixed-line');
	};
});


var scrollBtn = document.querySelector(".scroll-top");
var scrolled;
var timer;

window.addEventListener ("scroll", function() {
	scrolled = document.documentElement.scrollTop;
	if (scrolled > 100) {
		scrollBtn.style.display = "block";
	} else scrollBtn.style.display = "none";
})

document.querySelector(".scroll-top").addEventListener("click", function scrollTop() {
	if (scrolled > 0) {
		window.scrollBy(0, -140);
		timer = setTimeout(scrollTop, 80);
	} else {
		clearTimeout(timer);
	}
})

//поиск на сайте

var searchOut = document.querySelector(".search-result");
document.querySelector(".search-form__inner").onkeyup = function() {
	searchOut.innerHTML = "";
	var resultSerch = "";
	var searchInner = this.value.replace(/(^\s+|\s+$)/g, "");
	var myExp = new RegExp (searchInner, "i");
	for (var key in myObj) {
		if (myObj[key]['name'].search(myExp) != -1) {
			resultSerch += '<div class="search-result__list">' + myObj[key]['name'] + '</div>';
		}
	}
	searchOut.innerHTML += resultSerch;
	if (searchInner == "") searchOut.innerHTML = "";
}

document.querySelector(".nav-open").onclick = function() {
	document.querySelector(".menu-wrapper").classList.toggle("menu-wrapper_visible");
	var menuItem = document.getElementsByClassName("main-menu__item");
	for (var i = 0; i < menuItem.length; i ++) {
		menuItem[i].addEventListener("mouseover", function() {
			document.querySelector(".hidden-menu").style.display = "block";
		})
	}
}

