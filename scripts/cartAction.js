/**
 * Created by Nastushka on 25.10.2014.
 */

document.addEventListener('DOMContentLoaded',showCartItems,false);
document.addEventListener('DOMContentLoaded',loggedUser,false);

function showCartItems(){

    var params = sentUser();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/cartAccess?' + params, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;

        var phoneResponse = JSON.parse(xhr.responseText);

        if(phoneResponse.redirect == '/registration'){
            window.location = phoneResponse.redirect;
        }
        else{
            var respProd = phoneResponse.path;

            for (var key in respProd){

                var savedItems = cart.get('cart');

                for(var i=0;i<savedItems.length;i++){
                    if(savedItems[i] == key){
                        var phoneItem = respProd[key];

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
    }

    xhr.send(null);

}


