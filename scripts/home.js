
function Product(itemTitle,itemThumbImgUrl,shortDescr,price,birthday,band,mobile_type){
    this.itemTitle = itemTitle;
    this.itemThumbImgUrl = itemThumbImgUrl;
    this.shortDescr = shortDescr;
    this.price = price;
    this.birthday = birthday;
    this.band = band;
    this.mobile_type = mobile_type;

}


function saveChanges(){
    var itemTitle = document.getElementById('itemTitle').value;
    var itemThumbImgUrl = document.getElementById('itemThumbImgUrl').value;
    var shortDescr = document.getElementById('shortDescr').value;
    var price = document.getElementById('price').value;
    var birthday = document.getElementById('birthday').value;
    var band = document.getElementById('band').value;
    var mobile_type = document.getElementById('mobile_type').value;
    var newProduct = new Product(itemTitle,itemThumbImgUrl,shortDescr,price,birthday,band,mobile_type);

    testJson.push(newProduct);

    displayAddedProduct(newProduct);

    return window.testJson; //window.testJson

}