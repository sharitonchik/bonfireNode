/**
 * Created by Nastushka on 27.10.2014.
 */

document.addEventListener('DOMContentLoaded',showCartCount,false);



function addToCart() {

    var itemId = this.dataset.itemId;
    cart.set('cart',itemId,'array');
    showCartCount();
    //this.innerHTML = 'Added';
    checkDelBut();
}

function showCartCount() {
    var cartCount = document.getElementById('cartCountId');
    var cartLenght = cart.showLenght('cart');
    cartCount.innerHTML = cartLenght;

}

function delButton() {
    var deleteCartButtonArray = document.getElementsByClassName('addToCartButton');
    for (var i = 0; i < deleteCartButtonArray.length; i++) {
        deleteCartButtonArray[i].addEventListener('click', delFromCart, false);
        deleteCartButtonArray[i].innerHTML = 'Delete';
    }
}

function delFromCart(){
    var itemId = this.dataset.itemId;
    cart.remove('cart',itemId,'array');
    showCartCount();
    clearList();
    showCartItems();
}


