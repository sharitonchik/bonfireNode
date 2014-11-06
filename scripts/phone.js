/**
 * Created by Nastushka on 06.11.2014.
 */

document.addEventListener('DOMContentLoaded',checkUser,false);

function checkUser(){

    var storageValue = users.get('user');

    for (var key in storageValue){
        var userLogin = key;
        var userToken = storageValue[key];
    }

    var params = 'userLogin=' + encodeURIComponent(userLogin) + '&userToken=' + encodeURIComponent(userToken);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/display?' + params, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;


    }
    xhr.send(null);


}
