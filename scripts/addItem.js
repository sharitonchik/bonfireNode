
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

    function birthdayObj(value){
        this.title = 'Production date';
        this.value = value;
    }

    var birthdayObj = new birthdayObj(birthdayValue);

    var band = document.getElementById('band');
    var bandValue = band.value;
    var bandName = band.name;

    function bandObj(value){
        this.title = 'Standard connection';
        this.value = value;
    }

    var bandObj = new bandObj(bandValue);

    var mobileType = document.getElementById('mobile_type');
    var mobileTypeValue = mobileType.value;
    var mobileTypeName = mobileType.name;

    function mobileTypeObj(value){
        this.title = 'Type';
        this.value = value;
    }

    var mobileTypeObj = new  mobileTypeObj(mobileTypeValue);

    var thumbURL = document.getElementById('thumbURL');
    var thumbURLValue = thumbURL.value;
    var thumbURLName = thumbURL.name;

    var fullSizeURL = document.getElementById('fullSizeURL');
    var fullSizeURLValue = fullSizeURL.value;
    var fullSizeURLName = fullSizeURL.name;

    function thumbsArrayItem(thumbURL,fullSizeURL){
        this.thumbURL = thumbURL;
        this.fullSizeURL = fullSizeURL;
    }

    var thumbsArrayItem = new thumbsArrayItem(thumbURLValue,fullSizeURLValue);

    var thumbsArray = [];
    thumbsArray.push(thumbsArrayItem);

    function techInfoObj(thumbs,birthday,band,mobile_type){
        this.thumbs = thumbs;
        this.birthday = birthday;
        this.band = band;
        this.mobile_type = mobile_type;
    }

    var techInfoObj = new techInfoObj(thumbsArray,birthdayObj,bandObj,mobileTypeObj);


    function phoneInfoObj(itemTitle,itemThumbImgUrl,shortDescr,price,techInfo){
        this.itemTitle = itemTitle;
        this.itemThumbImgUrl = itemThumbImgUrl;
        this.shortDescr = shortDescr;
        this.price = price;
        this.techInfo = techInfo;
    }

    var phoneInfoObj = new phoneInfoObj(itemTitleValue,itemThumbImgUrlValue,shortDescrValue,priceObj,techInfoObj);


    var guid = (function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return function() {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };
    })();

    var uuid = guid();

    var params =  encodeURIComponent(uuid) + '=' + encodeURIComponent(JSON.stringify(phoneInfoObj));

    var xhr = new XMLHttpRequest();
    xhr.open('GET','/addProduct?' + params,true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
    }
    xhr.send(null);

}

<!--modal form-->

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




