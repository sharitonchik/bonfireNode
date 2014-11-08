
document.getElementById('find').addEventListener('click',sort,false);
document.addEventListener('DOMContentLoaded',phoneItemShow,false);



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










