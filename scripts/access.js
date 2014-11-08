/**
 * Created by Nastushka on 08.11.2014.
 */

document.getElementById('submit_id').addEventListener('click',checkUser,false);

function checkUser(){

    var storageValue = users.get('user');

    for (var key in storageValue){
        var userLogin = key;
        var userToken = storageValue[key];
    }

    var params = 'userLogin=' + encodeURIComponent(userLogin) + '&userToken=' + encodeURIComponent(userToken);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/access?' + params, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        var response = xhr.responseText;
        response = JSON.parse(response);

        window.location = response.redirect;

    }
    xhr.send(null);


}
