
function saveChanges(){

    var itemTitle = document.getElementById('itemTitle');
    var itemTitleValue = itemTitle.value;
    var itemTitleName = itemTitle.name;

    var itemThumbImgUrl = document.getElementById('itemThumbImgUrl');
    var itemThumbImgUrlValue = itemThumbImgUrl.value;
    var itemThumbImgUrlName = itemThumbImgUrl.name;

    var shortDescr = document.getElementById('shortDescr');
    var shortDescrValue = shortDescr.value;
    var shortDescrName = shortDescr.name;

    var priceMin = document.getElementById('priceMin');
    var priceMinValue = priceMin.value;
    var priceMinName = priceMin.name;

    var priceMax = document.getElementById('priceMax');
    var priceMaxValue = priceMax.value;
    var priceMaxName = priceMax.name;

    function priceObj(min,max){
        this.min = min;
        this.max = max;
    }

    var priceObj = new priceObj(priceMaxValue,priceMinValue);

    var birthday = document.getElementById('birthday');
    var birthdayValue = birthday.value;
    var birthdayName = birthday.name;

    var band = document.getElementById('band');
    var bandValue = band.value;
    var bandName = band.name;

    var mobileType = document.getElementById('mobile_type');
    var mobileTypeValue = mobileType.value;
    var mobileTypeName = mobileType.name;


    var params = 'itemTitle=' + encodeURIComponent(itemTitleValue) + '&itemThumbImgUrl=' + encodeURIComponent(itemThumbImgUrlValue)
        + '&shortDescr=' + encodeURIComponent(shortDescrValue) + '&price=' + encodeURIComponent(JSON.stringify(priceObj)) +
        '&birthday=' + encodeURIComponent(birthdayValue) + '&band=' + encodeURIComponent(bandName) +
        '&mobileType=' + encodeURIComponent(mobileTypeValue);

    var xhr = new XMLHttpRequest();
    xhr.open('GET','/addProduct?' + params,true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
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