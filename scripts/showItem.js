
var list = document.getElementById('list_id');

document.getElementById('find').addEventListener('click',sort,false);



function sort(event){
    var childNodes = document.getElementById('list_id').childNodes;
    for (var i=childNodes.length-1;i>=0;i--){
        document.getElementById('list_id').removeChild(childNodes[i]);
    }

    var pr_price_from = document.getElementById('pr-price-from').value;
    var pr_price_till = document.getElementById('pr-price-till').value;

    for (var i=0;i<testJson.length;i++){
        var item = testJson[i];
        for (var key in item){
            if (key=='category'){
                if (item[key]=='phone'){
                    displayAddedProduct(testJson[i]);
                }

            }
        }

    }
    event = event || window.event; // Кроссбраузерно получить событие

    if (event.stopPropagation) { // существует ли метод?
        // Стандартно:
        event.stopPropagation();
    } else {
        // Вариант IE
        event.cancelBubble = true;
    }

}

document.addEventListener('DOMContentLoaded',phoneItemShow,false);

function phoneItemShow(elem) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/getProducts', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        var event = JSON.parse(xhr.responseText);

        for (var i = 0; i < event.length; i++) {
            var newItem = document.createElement('li'); //create li
            newItem.className = 'widgets-list-item'; // assign class
            list.appendChild(newItem); //move li under ul
            var nameDiv = document.createElement('div'); // crete div1
            nameDiv.className = 'widgets-list-item-inner';
            newItem.appendChild(nameDiv);
            var item = event[i];
            for (var key in item) {
                if (key == 'itemThumbImgUrl') {
                    var prImage = document.createElement('img');
                    prImage.className = 'phone-image';
                    prImage.setAttribute("src", item[key]);
                    nameDiv.insertBefore(prImage, prName);
                }

                if (key == 'itemTitle') {
                    var prName = document.createElement('a');
                    prName.className = 'links-main';
                    prName.innerHTML = item[key];
                    nameDiv.appendChild(prName);
                }

                if (key == 'shortDescr') {
                    var prDescr = document.createElement('p');
                    prDescr.className = 'p-main';
                    prDescr.innerHTML = item[key];
                    nameDiv.appendChild(prDescr);
                }

                if (key == 'price') {
                    var newPrice = item[key];
                    for (var key1 in newPrice) {
                        var prPrice = document.createElement('h4');
                        prPrice.className = 'header-main';
                        prPrice.innerHTML = newPrice[key1];
                        nameDiv.insertBefore(prPrice, prDescr);

                    }

                }
            }

            var prButtonWrap = document.createElement('div');
            prButtonWrap.className = 'widgets-list-item-buttons-wrap btn-group clearfix';
            newItem.appendChild(prButtonWrap);

            var prButtonAdd = document.createElement('button');
            prButtonAdd.className = 'addToCartButton';
            prButtonAdd.innerHTML = 'Add to cart';
            prButtonAdd.dataset.itemName = item.itemTitle;
            prButtonWrap.appendChild(prButtonAdd);

        }

        a();
    }

    xhr.send(null);
}

function a() {
    var addToCartButtonArray = document.getElementsByClassName('addToCartButton');
    for (var i = 0; i < addToCartButtonArray.length; i++) {
        addToCartButtonArray[i].addEventListener('click', addToCart, false);
    }
}


function addToCart() {
    alert(this.dataset.itemName);
    var cartItem = [];
    cartItem.push(this.dataset.itemName);
    for (var i = 0; i <= cartItem.length; i++) {
        var cObj = cartItem[i];
        for (var key in cObj) {
            alert(key);
        }

    }
    var cartItemJson = JSON.stringify(cartItem);
    localStorage.setItem('Product', cartItemJson);
    alert(localStorage.getItem('Product'));
}







