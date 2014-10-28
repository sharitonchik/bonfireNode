/**
 * Created by Nastushka on 28.10.2014.
 */

var list = document.getElementById('list_id');

function createItemWrap(){
    var newItem = document.createElement('li'); //create li
    newItem.className = 'widgets-list-item'; // assign class
    list.appendChild(newItem); //move li under ul

    var nameDiv = document.createElement('div'); // create div
    nameDiv.className = 'widgets-list-item-inner';
    newItem.appendChild(nameDiv);

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