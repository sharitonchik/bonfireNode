/**
 * Created by Nastushka on 27.10.2014.
 */

document.addEventListener('DOMContentLoaded',showCartCount,false);

function addToCart() {
    var itemId = this.dataset.itemId;
    localStorage.setItem(itemId,itemId);
    showCartCount();

    return localStorage;

}

function showCartCount() {

    var cartCount = document.getElementById('cartCountId');
    cartCount.innerHTML = localStorage.length;
}

function delButton() {
    var deleteCartButtonArray = document.getElementsByClassName('delCartBut');
    for (var i = 0; i < deleteCartButtonArray.length; i++) {
        deleteCartButtonArray[i].addEventListener('click', delFromCart, false);
    }
}

function delFromCart(){
    var itemId = this.dataset.itemId;
    localStorage.removeItem(itemId);

    var childNodes = list.childNodes;
    for (var i=childNodes.length-1;i>=0;i--){
        list.removeChild(childNodes[i]);
    }
    showCartCount();

    showCartItems();
}
