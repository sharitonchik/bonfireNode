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

    var xhr = new XMLHttpRequest();
    xhr.open('GET','/getProducts',true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        var event = JSON.parse(xhr.responseText);

        var itemTitle = document.getElementById('itemTitle').value;
        var itemThumbImgUrl = document.getElementById('itemThumbImgUrl').value;
        var shortDescr = document.getElementById('shortDescr').value;
        var price = document.getElementById('price').value;
        var birthday = document.getElementById('birthday').value;
        var band = document.getElementById('band').value;
        var mobile_type = document.getElementById('mobile_type').value;

        var newPhone = new Phone(itemTitle,itemThumbImgUrl,shortDescr,price,birthday,band,mobile_type);

        event.push(newPhone);

        phoneItemShow();
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
        alert('Hi');
    };

    form.elements.cancel.onclick = function() {
        complete();
    };

    container.style.display = 'block';
    form.elements.text.focus();
}

document.getElementById('show-button').onclick = function() {
    showPrompt();
};