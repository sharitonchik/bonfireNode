/**
 * Created by Nastushka on 09.11.2014.
 */

document.addEventListener('DOMContentLoaded',loginAccess,false);

document.getElementById('singIn_id').addEventListener('click',checkUserInFile,false);


function checkUserInFile(){

    var userLogin = document.getElementById('inputUsername').value;
    var userPassword = document.getElementById('inputPassword').value;

    function userUnfo(userLogin,userPassword){
        this.username = userLogin;
        this.password = userPassword;
    }

    var userInfo = new userUnfo(userLogin,userPassword);

    var xhr = new XMLHttpRequest();
    var params = 'userInfo=' + JSON.stringify(userInfo);
    xhr.open('POST','/log',true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        try{
            var resp = JSON.parse(xhr.responseText);

            if(resp.redirect){

                var userObj = {};
                userObj[userLogin] = resp.userId;
                users.set('user',userObj,'object')

                window.location = resp.redirect;
            }

        }
        catch(e){
            alert('data are invalid');
        }

    }

    xhr.send(params);

}

function loginAccess(){

    var params = sentUser();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/loginAccess?' + params, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;

        var phoneResponse = JSON.parse(xhr.responseText);

        if(phoneResponse.redirect == '/'){
            window.location = phoneResponse.redirect;
        }

    }

    xhr.send(null);
}
