/**
 * Created by Nastushka on 28.10.2014.
 */

var list = document.getElementById('list_id');

function newItemReturn(){
    var newItem = document.createElement('li'); //create li
    newItem.id = 'newItem_id';
    return newItem;
}

function createItemWrap(key){
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
    prDescr.className = 'p-main';
    prDescr.innerHTML = phoneItem[keyInner];

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