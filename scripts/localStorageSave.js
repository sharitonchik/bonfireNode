function LocalStorageObj(){}

LocalStorageObj.prototype.get = function(key){

}

LocalStorageObj.prototype.set = function(key,value,type,keyObj){
    switch (type){
        case 'array':
            this.addArrayValue(key, value);
            break;
        case 'object':
            this.addObjectValue(key,value,keyObj);
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

LocalStorageObj.prototype.addObjectValue = function (key,value,keyObj){

    var newItemObjAdd = function(k,val,keyObj){
        var obj = {};
        obj[keyObj] = value;
        localStorage.setItem(k,JSON.stringify(obj));
    }

    var storageValue = localStorage.getItem(key);

    if(typeof value == 'object' && !(isEmpty(value))){
        localStorage.setItem(key, JSON.stringify(value));
        return;
    }

    if(!storageValue){
        newItemObjAdd(key,value,keyObj);
        return;
    }

    try {
        storageValue = JSON.parse(storageValue);
        if(!(isEmpty(storageValue))) {
            storageValue[keyObj] = value;
            localStorage.setItem(key, JSON.stringify(storageValue));
        } else {
            newItemObjAdd(key,value,keyObj);
        }
    } catch (e) {
        newItemObjAdd(key,value,keyObj);
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
            this.removeArrayValue();
            break;
    }
};

LocalStorageObj.prototype.removeArrayValue = function(key,value){
    var storageValue = localStorage.getItem(key);

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
        alert('byby');
    }






}