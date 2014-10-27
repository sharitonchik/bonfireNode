/**
 * Created by Nastushka on 25.10.2014.
 */

var list = document.getElementById('list_id');

document.addEventListener('DOMContentLoaded',showCartItems,false);


function showCartItems(){

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/getProducts', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        var phoneResponse = JSON.parse(xhr.responseText);



        for (var key in phoneResponse){

            if (localStorage.getItem(key) == key){

                var newItem = document.createElement('li'); //create li
                newItem.className = 'widgets-list-item'; // assign class
                list.appendChild(newItem); //move li under ul
                var nameDiv = document.createElement('div'); // crete div1
                nameDiv.className = 'widgets-list-item-inner';
                newItem.appendChild(nameDiv);

                var phoneItem = phoneResponse[key];

                for (var keyInner in phoneItem){

                    if (keyInner == 'itemThumbImgUrl') {
                        var prImage = document.createElement('img');
                        prImage.className = 'phone-image';
                        prImage.setAttribute("src", phoneItem[keyInner]);
                        nameDiv.insertBefore(prImage, prName);
                    }
                    if (keyInner == 'itemTitle') {
                        var prName = document.createElement('a');
                        prName.className = 'links-main';
                        prName.innerHTML = phoneItem[keyInner];
                        nameDiv.appendChild(prName);
                    }

                    if (keyInner == 'shortDescr') {
                        var prDescr = document.createElement('p');
                        prDescr.className = 'p-main';
                        prDescr.innerHTML = phoneItem[keyInner];
                        nameDiv.appendChild(prDescr);
                    }

                    if (keyInner == 'price') {
                        var newPrice = phoneItem[keyInner];
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
                prButtonAdd.className = 'delCartBut';
                prButtonAdd.innerHTML = 'Delete';
                prButtonAdd.dataset.itemId = key;
                prButtonWrap.appendChild(prButtonAdd);

            }
            delButton();

        }
    }


    xhr.send(null);

}


