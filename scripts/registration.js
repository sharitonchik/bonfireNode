/**
 * Created by Nastushka on 06.10.14.
 */
function CountLogin(item){
    var item_view = 'login_view'; // var for displaying count of elements
    var item_correct = 'login_correct'; // var for displaying message about error
    document.getElementById(item_view).innerHTML = document.getElementById(item).value.length++;
    if (document.getElementById(item).value.length >= 5) {
        document.getElementById(item_correct).innerHTML = 'correct';
        document.getElementById(item_correct).className = 'correct';
        document.getElementById('check_login').value = 1;
    }
    else{
        document.getElementById(item_correct).innerHTML = 'no less than 5 symbols';
        document.getElementById(item_correct).className = 'acorrect';
        document.getElementById('check_login').value = 0;
    }
    checkAll();
}

function CountPass(item){
    var item_view = 'pass_view';
    var item_correct = 'pass_correct';// var for displaying message about error
    var item_login_value = document.getElementById('login_id').value;
    var item_login_length = document.getElementById('login_id').value.length;
    document.getElementById(item_view).innerHTML = document.getElementById(item).value.length++;
    if (document.getElementById(item).value == item_login_value && item_login_length >= 5) {
        document.getElementById(item_correct).innerHTML = 'password matches to login';
        document.getElementById(item_correct).className = 'acorrect';
        document.getElementById('check_pass').value = 0;
    } else {
        if (document.getElementById(item).value.length >= 4) {
            document.getElementById(item_correct).innerHTML = 'correct';
            document.getElementById(item_correct).className = 'correct';
            document.getElementById('check_pass').value = 1;
        } else if (document.getElementById(item).value.length < 4) {
            document.getElementById(item_correct).innerHTML = 'password should contain from 4 to 10 symbols';
            document.getElementById(item_correct).className = 'acorrect';
            document.getElementById('check_pass').value = 0;
        }
    }
    checkAll();
}

function CorrectPass(item){
    var item_pass_value = document.getElementById('pass_id').value;// var for displaying message about error
    var item_pass_length = document.getElementById('pass_id').value.length; // length of the password
    var item_correct = 'repass_correct';
    if (item_pass_length >= 4){
        if (document.getElementById(item).value == item_pass_value){
            document.getElementById(item_correct).innerHTML = 'passwords match';
            document.getElementById(item_correct).className = 'correct';
            document.getElementById('check_repass').value = 1;
        }
        else if (document.getElementById(item).value.length >= 4){
            document.getElementById(item_correct).innerHTML = 'passwords do not match';
            document.getElementById(item_correct).className = 'acorrect';
            document.getElementById('check_repass').value = 0;
        }
    }
    checkAll();
}

//check email address

function isEmail(item){
    var at = '@';
    var dot = '.';
    var lat = item.indexOf(at);
    var litem = item.length;
    var ldot = item.indexOf(dot);
    if (item.indexOf(at)==-1) return false; // if there is no at
    if (item.indexOf(at)==-1 || item.indexOf(at) == 0 || item.indexOf(at) == litem) return false; // there is no, the 1st symbol, the last symbol
    if (item.indexOf(dot)==-1 || item.indexOf(dot) == 0 || item.indexOf(dot) >= litem - 2) return false;
    if (item.indexOf(at,(lat+1))!=-1) return false; // if we found multiple @
    if (item.substring(lat-1,lat)==dot || item.substring(lat+1,lat+2)==dot) return false;
    if (item.indexOf(dot,(lat+2))==-1) return false;
    if (item.indexOf(" ")!=-1) return false;
    return true;
}

// check correct email

function CorrectEmail(item) {
    var item_correct = 'email_correct'; // var to display message about error
    if (isEmail(item.value) == true){
        document.getElementById(item_correct).innerHTML = 'correct';
        document.getElementById(item_correct).className = 'correct';
        document.getElementById('check_email').value = 1;
    }
    else {
        document.getElementById(item_correct).innerHTML = 'please provide correct email';
        document.getElementById(item_correct).className = 'acorrect';
        document.getElementById('check_email').value = 0;
    }
    checkAll();
}

function checkAll(){
    var x;
    var check_login = document.getElementById('check_login').value;
    var check_pass = document.getElementById('check_pass').value;
    var check_repass = document.getElementById('check_repass').value;
    var check_email = document.getElementById('check_email').value;
    x = check_login + check_pass + check_repass + check_email;
    document.getElementById('check_all').value = x;
    if (document.getElementById('check_all').value == 1111){
        //unlock button
        document.getElementById('submit_id').disabled = false;
    }
    else {
        //lock button
        document.getElementById('submit_id').disabled = true;
    }
}
