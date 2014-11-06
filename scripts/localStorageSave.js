function LocalStorageObj(){}


LocalStorageObj.prototype.get = function (key) {

    var storageValue = localStorage.getItem(key);

    try{
        storageValue = JSON.parse(storageValue);
        return storageValue;
    }
    catch (e){
        return storageValue;
    }

};

LocalStorageObj.prototype.set = function(key,value,type){
    switch (type){
        case 'array':
            this.addArrayValue(key, value);
            break;
        case 'object':
            this.addObjectValue(key,value);
            break;
        default: this.addStringValue(key, value);
            break;
    }
};

function isEmpty(obj) {
    for (var key in obj) {
        return false; // key exists
    }
    // empty
    return true;
}

LocalStorageObj.prototype.addObjectValue = function (key,value){

    if(typeof value == 'object' && !(isEmpty(value))){

        localStorage.setItem(key, JSON.stringify(value));
        return;
    }
    else if(typeof value == 'string'){
        localStorage.setItem(key, value);
        return;
    }
    else{
        localStorage.setItem(key, JSON.stringify(value));
        return;
    }

}

LocalStorageObj.prototype.addArrayValue = function (key, value) {

    var newItemAdd = function(k, val){
        var arr = [];
        arr.push(val);
        localStorage.setItem(k, JSON.stringify(arr));
    };

    var storageValue = localStorage.getItem(key);


    if(typeof value == "object" && value.length && value.length > 0){
        localStorage.setItem(key, JSON.stringify(value));
        return;
    }


    if(!storageValue){
        newItemAdd(key, value);
        return;
    }

    try {
        storageValue = JSON.parse(storageValue);
        if(storageValue.length && storageValue.length > 0) {
            storageValue.push(value);
            localStorage.setItem(key, JSON.stringify(storageValue));
        } else {
            newItemAdd(key, value);
        }
    } catch (e) {
        newItemAdd(key, value);
    }
};

LocalStorageObj.prototype.addStringValue = function (key, value) {
    localStorage.setItem(key, value);
};

LocalStorageObj.prototype.remove = function(key,value,type){
    switch (type){
        case 'array':
            this.removeArrayValue(key,value);
            break;
        case 'object':
            this.removeObjectValue(key,value);
            break;
        default :
            this.removeStringValue(key);
    }
};

LocalStorageObj.prototype.removeArrayValue = function(key,value){
    var storageValue = localStorage.getItem(key);

    if(typeof value == "object" && value.length && value.length > 0){
        localStorage.removeItem(key);
        return;
    }

    if(!storageValue){
        return;
    }

    try{
        storageValue = JSON.parse(storageValue);
        for (var i=0;i<storageValue.length;i++){

            if(storageValue[i] == value){
                storageValue.splice(i,1);
            }
        }
        localStorage.setItem(key,JSON.stringify(storageValue));
    }
    catch (e){
        return;
    }
};

LocalStorageObj.prototype.removeObjectValue = function(key,value){

    var storageValue = localStorage.getItem(key);

    if(typeof value == 'object' && !(isEmpty(value))){
        localStorage.removeItem(key);
        return;
    }

    if(!storageValue){
        return;
    }

    try {
        storageValue = JSON.parse(storageValue);
        if(!(isEmpty(storageValue))) {
            for(var k in storageValue){
                if (k = value){
                    delete storageValue[k];
                }
            }
            localStorage.setItem(key, JSON.stringify(storageValue));
        } else {
            localStorage.removeItem(key);
        }
    } catch (e) {
        localStorage.removeItem(key);
    }

};

LocalStorageObj.prototype.removeStringValue = function(key){
    localStorage.removeItem(key);
};

LocalStorageObj.prototype.showLenght = function(key){

    var storageValue = localStorage.getItem(key);

    if(!storageValue){
        return 0;
    }

    try{
        storageValue = JSON.parse(storageValue);

        if(typeof storageValue == "object" && storageValue.length && storageValue.length > 0){

            return storageValue.length;
        }
    }
    catch (e){
        return;
    }
}

var cart = new LocalStorageObj();
var users = new LocalStorageObj();