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
    var storageValue = JSON.parse(localStorage.getItem(key));

    if(!storageValue || typeof storageValue !== 'object'){
        var arr = [];
        arr.push(value);
        localStorage.setItem(key, JSON.stringify(arr));

        return;
    }

    storageValue.push(value);
    localStorage.setItem(key, JSON.stringify(storageValue));
};

LocalStorageObj.prototype.addStringValue = function (key, value) {
    localStorage.setItem(key, value);
};

LocalStorageObj.prototype.remove = function(key){

}