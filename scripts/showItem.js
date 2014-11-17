
document.getElementById('find').addEventListener('click',sort,false);
document.addEventListener('DOMContentLoaded',phoneItemShow,false);
document.addEventListener('DOMContentLoaded',loggedUser,false);

function sort(event){

    var childNodes = document.getElementById('list_id').childNodes;
    for (var i=childNodes.length-1;i>=0;i--){
        document.getElementById('list_id').removeChild(childNodes[i]);
    }



    var params = sentUser();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/phoneAccess?' + params, true);
    xhr.onreadystatechange = function () {

        var pr_price_from_item = document.getElementById('pr-price-from');
        var pr_price_from = +pr_price_from_item.value;
        var pr_price_till_item = document.getElementById('pr-price-till');
        var pr_price_till = +pr_price_till_item.value;
        var pr_date_item = document.getElementById('pr-date');
        var pr_date = +pr_date_item.value;


        var pr_opsystem = run();
        var pr_type_item = document.getElementById('pr-type');
        var pr_type = runType();
        var pr_memory_item = document.getElementById('pr-memory');
        var pr_memory = +pr_memory_item.value;
        var pr_tali_time_item = document.getElementById('pr-talk-time');
        var pr_tali_time = +pr_tali_time_item.value;

        if (xhr.readyState != 4) return;

        var phoneResponse = JSON.parse(xhr.responseText);

        if(phoneResponse.redirect == '/registration'){
            window.location = phoneResponse.redirect;
        }
        else{
            var respProd = phoneResponse.path;

            for (var key in respProd) {

                var phoneItem = respProd[key];

                if (phoneItem['price'].min >= pr_price_from && phoneItem['price'].max <= pr_price_till) {
                    if (phoneItem['techInfo'].birthday.value >= pr_date) {
                        if (phoneItem['techInfo'].band.value == pr_opsystem) {
                            if (phoneItem['techInfo'].mobile_type.value == pr_type) {
                                if(phoneItem['techInfo'].thumbs[0].thumbURL >= pr_memory) {
                                    if(phoneItem['techInfo'].thumbs[0].fullSizeURL >= pr_tali_time)

                                    var nameDiv = createItemWrap(key);

                                    for (var keyInner in phoneItem) {

                                        if (keyInner == 'itemTitle') {
                                            var prName = itemTitleWrap(phoneItem, keyInner);
                                            nameDiv.appendChild(prName);
                                        }

                                        if (keyInner == 'itemThumbImgUrl') {
                                            var prImage = imgWrap(phoneItem, keyInner);
                                            nameDiv.insertBefore(prImage, prName);
                                        }

                                        if (keyInner == 'shortDescr') {
                                            var prDescr = shortDescWtap(phoneItem, keyInner);
                                            nameDiv.appendChild(prDescr);
                                        }

                                        if (keyInner == 'price') {
                                            var newPrice = phoneItem[keyInner];
                                            for (var key1 in newPrice) {
                                                var prPrice = priceWrap(newPrice, key1);
                                                nameDiv.insertBefore(prPrice, prDescr);

                                            }

                                        }
                                    }
                                }

                            }
                        }
                    }
                }


            }
            addListenerToAddButton();
            checkDelBut(key);
        }
    }

    xhr.send(null);


    event = event || window.event; // Кроссбраузерно получить событие

    if (event.stopPropagation) { // существует ли метод?
        // Стандартно:
        event.stopPropagation();
    } else {
        // Вариант IE
        event.cancelBubble = true;
    }

}

function run(){
    return document.getElementById('pr-os').value;
}

function runType(){
    return document.getElementById('pr-type').value;
}

function phoneItemShow() {

    var params = sentUser();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/phoneAccess?' + params, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;

        var phoneResponse = JSON.parse(xhr.responseText);

        if(phoneResponse.redirect == '/registration'){
            window.location = phoneResponse.redirect;
        }
        else{
            var respProd = phoneResponse.path;

            for (var key in respProd){

                var nameDiv = createItemWrap(key);

                var phoneItem = respProd[key];

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
                }
            }
            addListenerToAddButton();
            checkDelBut(key);
        }
    }

    xhr.send(null);
}



function addListenerToAddButton() {
    var addToCartButtonArray = document.getElementsByClassName('addToCartButton');
    for (var i = 0; i < addToCartButtonArray.length; i++) {
        addToCartButtonArray[i].addEventListener('click', addToCart, false);
    }
}










