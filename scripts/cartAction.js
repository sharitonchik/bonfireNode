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

            var savedItems = cart.get('cart');

            for(var i=0;i<savedItems.length;i++){
                if(savedItems[i] == key){
                    var phoneItem = phoneResponse[key];

                    var nameDiv = createItemWrap(key);

                    for (var keyInner in phoneItem){

                        if (keyInner == 'itemTitle') {
                            var prName = itemTitleWrap(phoneItem,keyInner);
                            nameDiv.appendChild(prName);
                        }

                        if (keyInner == 'itemThumbImgUrl') {
                            var prImage = imgWrap(phoneItem,keyInner);
                            nameDiv.insertBefore(prImage, prName);
                        }

                        if (keyInner == 'shortDescr') {
                            var prDescr = shortDescWtap(phoneItem,keyInner);
                            nameDiv.appendChild(prDescr);
                        }

                        if (keyInner == 'price') {
                            var newPrice = phoneItem[keyInner];
                            for (var key1 in newPrice) {
                                var prPrice = priceWrap(newPrice,key1);
                                nameDiv.insertBefore(prPrice, prDescr);
                            }
                        }
                        delButton();
                    }
                }
            }
        }
    }

    xhr.send(null);

}


