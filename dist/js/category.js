document.querySelector(".catalog-sort__list").addEventListener("change",function(){"price-desc"==this.value&&(arr.sort(function(r,a){return r["start-coast"]-a["start-coast"]}),showGoods()),"price-asc"==this.value&&(arr.sort(function(r,a){return a["start-coast"]-r["start-coast"]}),showGoods()),"recommend"==this.value&&(arr.sort(function(r,a){return a.recommend-r.recommend}),showGoods())});var priceMin=document.querySelector(".filter-price__min"),priceMax=document.querySelector(".filter-price__max");priceMin.addEventListener("change",function(){(this.value<minNumber||this.value>maxNumber)&&(this.value=minNumber)}),priceMax.addEventListener("change",function(){(this.value>maxNumber||this.value<minNumber)&&(this.value=maxNumber)}),document.querySelector(".filter-price__btn").addEventListener("click",function(){0<arrauxiliary.length?arr=arrauxiliary.slice(0):arr=newArr.slice(0);var a=priceMin.value,e=priceMax.value;if(""==e&&""==a||""==e)return!1;arr=arr.filter(function(r){return r["start-coast"]>=a&&r["start-coast"]<=e});for(var r=0;r<arr.length;r++)arrauxiliary.push(arr[r]);showGoods()}),document.querySelector(".filter-condition-new").addEventListener("change",function(){if(this.checked){0<arrauxiliary.length?arr=arrauxiliary.slice(0):arr=newArr.slice(0);for(var r=0;r<newArr.length;r++)"new"==newArr[r]["product condition"]&&arrauxiliary.push(newArr[r]);arr=arrauxiliary.slice(0),showGoods()}else arrauxiliary=arrauxiliary.filter(function(r){return"not new"==r["product condition"]}),0==arrauxiliary.length?arr=newArr.slice(0):arr=arrauxiliary.slice(0),showGoods()}),document.querySelector(".filter-condition-notNew").addEventListener("change",function(){if(this.checked){0<arrauxiliary.length?arr=arrauxiliary.slice(0):arr=newArr.slice(0);for(var r=0;r<newArr.length;r++)"not new"==newArr[r]["product condition"]&&arrauxiliary.push(newArr[r]);arr=arrauxiliary.slice(0),showGoods()}else arrauxiliary=arrauxiliary.filter(function(r){return"new"==r["product condition"]}),0==arrauxiliary.length?arr=newArr.slice(0):arr=arrauxiliary.slice(0),showGoods()}),document.querySelector(".filter-repair-ok").addEventListener("change",function(){if(this.checked){0<arrauxiliary.length?arr=arrauxiliary.slice(0):arr=newArr.slice(0);for(var r=0;r<newArr.length;r++)"ok"==newArr[r].repair&&arrauxiliary.push(newArr[r]);arr=arrauxiliary.slice(0),showGoods()}else arrauxiliary=arrauxiliary.filter(function(r){return"ok"!=r.repair}),0==arrauxiliary.length?arr=newArr.slice(0):arr=arrauxiliary.slice(0),showGoods()}),document.querySelector(".filter-repair-faulty").addEventListener("change",function(){if(this.checked){0<arrauxiliary.length?arr=arrauxiliary.slice(0):arr=newArr.slice(0);for(var r=0;r<newArr.length;r++)"faulty"==newArr[r].repair&&arrauxiliary.push(newArr[r]);arr=arrauxiliary.slice(0),showGoods()}else arrauxiliary=arrauxiliary.filter(function(r){return"faulty"!=r.repair}),0==arrauxiliary.length?arr=newArr.slice(0):arr=arrauxiliary.slice(0),showGoods()}),document.querySelector(".filter-diagonal-wide").addEventListener("change",function(){if(this.checked){0<arrauxiliary.length?arr=arrauxiliary.slice(0):arr=newArr.slice(0);for(var r=0;r<newArr.length;r++)6<newArr[r].diagonal&&arrauxiliary.push(newArr[r]);arr=arrauxiliary.slice(0),showGoods()}else arrauxiliary=arrauxiliary.filter(function(r){return r.diagonal<6}),0==arrauxiliary.length?arr=newArr.slice(0):arr=arrauxiliary.slice(0),showGoods()}),document.querySelector(".filter-diagonal-middle").addEventListener("change",function(){if(this.checked){0<arrauxiliary.length?arr=arrauxiliary.slice(0):arr=newArr.slice(0);for(var r=0;r<newArr.length;r++)5<=newArr[r].diagonal&&newArr[r].diagonal<=6&&arrauxiliary.push(newArr[r]);arr=arrauxiliary.slice(0),showGoods()}else arrauxiliary=arrauxiliary.filter(function(r){return r.diagonal<5&&6<r.diagonal}),0==arrauxiliary.length?arr=newArr.slice(0):arr=arrauxiliary.slice(0),showGoods()}),document.querySelector(".filter-diagonal-small").addEventListener("change",function(){if(this.checked){0<arrauxiliary.length?arr=arrauxiliary.slice(0):arr=newArr.slice(0);for(var r=0;r<newArr.length;r++)newArr[r].diagonal<3&&arrauxiliary.push(newArr[r]);arr=arrauxiliary.slice(0),showGoods()}else arrauxiliary=arrauxiliary.filter(function(r){return 3<r.diagonal}),0==arrauxiliary.length?arr=newArr.slice(0):arr=arrauxiliary.slice(0),showGoods()});for(var filterBtn=document.getElementsByClassName("catalog-filter__title"),i=0;i<filterBtn.length;i++)filterBtn[i].addEventListener("click",function(){this.classList.toggle("show"),this.nextElementSibling.classList.toggle("catalog-filter__block_hide")});
//# sourceMappingURL=category.js.map
