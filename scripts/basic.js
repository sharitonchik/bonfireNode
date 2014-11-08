/**
 * Created by Nastushka on 28.10.2014.
 */
function listReturn(){
    var list = document.getElementById('list_id');
    return list;
}

function newItemReturn(){
    var newItem = document.createElement('li'); //create li
    newItem.id = 'newItem_id';
    return newItem;
}

function createItemWrap(key){
    var list = listReturn();
    var newItem = newItemReturn();
    newItem.className = 'widgets-list-item'; // assign class
    list.appendChild(newItem); //move li under ul

    var nameDiv = document.createElement('div'); // create div
    nameDiv.className = 'widgets-list-item-inner';
    newItem.appendChild(nameDiv);

    var prButton = prButtonWrap(key);
    newItem.appendChild(prButton);

    return nameDiv;
}

function imgWrap(phoneItem,keyInner){
    var prImage = document.createElement('img');
    prImage.className = 'phone-image';
    prImage.setAttribute("src", phoneItem[keyInner]);

    return prImage;
}

function itemTitleWrap(phoneItem,keyInner){
    var prName = document.createElement('a');
    prName.className = 'links-main';
    prName.innerHTML = phoneItem[keyInner];

    return prName;
}

function shortDescWtap(phoneItem,keyInner){
    var prDescr = document.createElement('p');
    prDescr.className = 'p-main phone-desc-wrap';
    var strDesc = truncate(phoneItem[keyInner],60)
    prDescr.innerHTML = strDesc;

    return prDescr;
}

function priceWrap(newPrice,key1){
    var prPrice = document.createElement('h4');
    prPrice.className = 'header-main';
    prPrice.innerHTML = newPrice[key1];

    return prPrice;
}

function prButAdd(key){
    var prButtonAdd = document.createElement('button');
    prButtonAdd.className = 'addToCartButton';
    prButtonAdd.innerHTML = 'Add to cart';
    prButtonAdd.dataset.itemId = key;

    return prButtonAdd;
}

function prButtonWrap(key){

    var prButtonWrap = document.createElement('div');
    prButtonWrap.className = 'widgets-list-item-buttons-wrap btn-group clearfix';
    var prButtonAdd = prButAdd(key);
    prButtonWrap.appendChild(prButtonAdd);

    return prButtonWrap;
}

function truncate(str, maxlength) {
    if (str.length > maxlength) {
        return str.slice(0, maxlength - 1) + '…';
    }

    return str;
}

function clearList(){
    var list = listReturn();
    var childNodes = list.childNodes;
    for (var i=childNodes.length-1;i>=0;i--){
        list.removeChild(childNodes[i]);
    }

}

function checkDelBut(key){
    var c = cart.get('cart');
    var b = document.getElementsByClassName('addToCartButton');
    for (var i=0;i<c.length;i++){
        for (var j=0;j< b.length;j++){
            if (b[j].dataset.itemId == c[i]){
                b[j].disabled = true;
                b[j].innerHTML = 'Added';
            }
        }
    }
}

function sentUser(){
    var storageValue = users.get('user');

    for (var key in storageValue){
        var userLogin = key;
        var userToken = storageValue[key];
    }

    var params = 'userLogin=' + encodeURIComponent(userLogin) + '&userToken=' + encodeURIComponent(userToken);

    return params;
}

function loggedUser(){
    var storageValue = users.get('user');

    for (var key in storageValue){
        var userLogin = key;
    }

    var userLink = document.getElementById('loggedUser');
    userLink.innerHTML = userLogin;

}


