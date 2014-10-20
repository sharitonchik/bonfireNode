function Phone(itemTitle,itemThumbImgUrl,shortDescr,price,birthday,band,mobile_type){
    this.itemTitle = itemTitle;
    this.itemThumbImgUrl = itemThumbImgUrl;
    this.shortDescr = shortDescr;
    this.price = price;
    this.birthday = birthday;
    this.band = band;
    this.mobile_type = mobile_type;

}


function saveChanges(){

    var itemTitleValue = document.getElementById('itemTitle').value;
    var itemTitleName = document.getElementById('itemTitle').name;

    var itemThumbImgUrlValue = document.getElementById('itemThumbImgUrl').value;
    var itemThumbImgUrlName = document.getElementById('itemThumbImgUrl').name;

    var shortDescrValue = document.getElementById('shortDescr').value;
    var shortDescrName = document.getElementById('shortDescr').name;

    var priceValue = document.getElementById('price').value;
    var priceName = document.getElementById('price').name;

    var birthdayValue = document.getElementById('birthday').value;
    var birthdayName = document.getElementById('birthday').name;

    var bandValue = document.getElementById('band').value;
    var bandName = document.getElementById('band').name;

    var mobileTypeValue = document.getElementById('mobile_type').value;
    var mobileTypeName = document.getElementById('mobile_type').name;

    //var newPhone = new Phone(itemTitle,itemThumbImgUrl,shortDescr,price,birthday,band,mobile_type);
    var params = 'itemTitle=' + encodeURIComponent(itemTitleValue) + '&itemThumbImgUrl=' + encodeURIComponent(itemThumbImgUrlValue)
        + '&shortDescr=' + encodeURIComponent(shortDescrValue) + '&price=' + encodeURIComponent(priceValue) +
        '&birthday=' + encodeURIComponent(birthdayValue) + '&band=' + encodeURIComponent(bandName) +
        '&mobileType=' + encodeURIComponent(mobileTypeValue);

    var xhr = new XMLHttpRequest();
    xhr.open('GET','/addProduct?' + params,true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        alert(xhr.responseText);

    }
    xhr.send(null);

}


function showCover() {
    var coverDiv = document.createElement('div');
    coverDiv.id = 'cover-div';
    document.body.appendChild(coverDiv);
}

function hideCover() {
    document.body.removeChild(document.getElementById('cover-div'));
}

function showPrompt() {
    showCover();
    var form = document.getElementById('prompt-form');
    var container = document.getElementById('prompt-form-container');

    function complete() {
        hideCover();
        container.style.display = 'none';
        document.onkeydown = null;
    }

    form.onsubmit = function() {
        saveChanges();
    };

    form.elements.cancel.onclick = function() {
        complete();
    };

    container.style.display = 'block';

}

document.getElementById('show-button').onclick = function() {
    showPrompt();
};