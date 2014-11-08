/**
 * Created by Nastushka on 08.11.2014.
 */

document.addEventListener('DOMContentLoaded',homeAccess,false);

function homeAccess(){
    var params = sentUser();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/homeAccess?' + params, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        var phoneResponse = JSON.parse(xhr.responseText);

        if(phoneResponse.redirect == '/registration'){
            window.location = phoneResponse.redirect;
        }


    }

    xhr.send(null);
}