function LocalStorageObj(){}

LocalStorageObj.prototype.get = function(key){

}

LocalStorageObj.prototype.set = function(key,value, type){
    switch (type){
        case 'array':
            this.addArrayValue(key, value);
            break;
        default: this.addStringValue(key, value);
            break;
    }
};

LocalStorageObj.prototype.addArrayValue = function (key, value) {
    var storageValue = localStorage.getItem(key);

    if(typeof value == "object" && value.length && value.length > 0){
        localStorage.setItem(key, JSON.stringify(value));
        return;
    }

    var newItemAdd = function(k, val){
        var arr = [];
        arr.push(val);
        localStorage.setItem(k, JSON.stringify(arr));
    };

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

LocalStorageObj.prototype.remove = function(key){

}