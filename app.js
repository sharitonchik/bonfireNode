/**
 * Created by sergey on 4/10/14.
 */

var http = require('http');
var url = require('url');
var fs = require('fs');
var express = require('express');
var app = express();

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

function fileSend(req, resp) {
    console.log(req.method + ': ' + req.path);
    resp.sendfile(__dirname + req.path);
}

function getPageRelatedPath(req, resp) {
    console.log(req.method + ': ' + req.path);
    resp.sendfile(__dirname + '/pages' + req.path + '.html');

}

function getProductsDb(req, resp) {
    var productsPath = '/db/products.json';
    console.log(req.method + ': ' + productsPath);
    resp.sendfile(__dirname + productsPath);
}

app.get('/', function (req, resp) {
    console.log(req.method + ': ' + req.path);
    resp.sendfile(__dirname + "/index.html");
});

app.get('/scripts/*', fileSend);
app.get('/pages/*', fileSend);
app.get('/images/*', fileSend);
app.get('/styles/*', fileSend);

app.get('/getProducts', getProductsDb);
app.get('/phone', getPageRelatedPath);
app.get('/display', function (req, resp){

    var db = fs.readFileSync('db/users.json', {
        encoding: 'utf8'
    });

    db = JSON.parse(db);

    var params = url.parse(req.url, true).query;
    console.log('req.params', params);

    var username = params['userLogin'];
    console.log(username)
    var token = params['userToken'];
    console.log(token);

    var count = 0;

    for (var key in db){
        console.log('db=',key);
        if (key == username){
            console.log('0=',key,username);
            count++;
            if (db[key] == token){
                console.log('1');
                return;
            }
        }
        else{
            console.log('2=',key,username);
            console.log('count=',count);
        }
    }

    if (count == 0){
        resp.send({redirect:'/registration'});
        console.log('not logged');
    }
    else{
        //resp.writeHead(302,{'Location':'/'});
        //resp.redirect(200,'/');
        resp.send({redirect:'/'});
        console.log('logged');
    }


    //resp.send();
    resp.end();

});


app.get('/cart', getPageRelatedPath);
app.get('/login', getPageRelatedPath);
app.get('/registration', getPageRelatedPath);

app.get('/addProduct', function (req, resp) {
    var db = fs.readFileSync('db/products.json', {
        encoding: 'utf8'
    });

    db = JSON.parse(db);

    var params = url.parse(req.url, true).query;
    console.log('req.params', params);

    var idPhone = params['id'];
    var titlePar = params['itemTitle'];
    var itemThumbImgUrlPar = params['itemThumbImgUrl'];
    var shortDescPar = params['shortDesc'];
   // params['price'] = JSON.parse(params['price']);
    params['techInfo'] = JSON.parse(params['techInfo']);
    var pricePar = JSON.parse(params['price']);
    var techPar = params['techInfo'];

    function phoneInfoObj(titlePar, itemThumbImgUrlPar, shortDescPar, pricePar, techPar) {
        this.itemTitle = titlePar;
        this.itemThumbImgUrl = itemThumbImgUrlPar;
        this.shortDescr = shortDescPar;
        this.price = pricePar;
        this.techInfo = techPar;
    }

    var phoneInfoObj = new phoneInfoObj(titlePar, itemThumbImgUrlPar, shortDescPar, pricePar, techPar);

    db[idPhone] = phoneInfoObj;

    fs.writeFile('db/products.json', JSON.stringify(db, null, 4), function (err) {
        if (err) {
            console.log('err add', err);
        } else {
            console.log('Product saved');
        }
    });
    resp.send(params);
    resp.end();
});



app.post('/auth', function (req, resp) {
    console.log('post');
    var dbLogin = fs.readFileSync('db/users.json', {
        encoding: 'utf8'
    });

    console.log('dbLogin', dbLogin);
    dbLogin = JSON.parse(dbLogin);

    var body = req.body;
    console.log('body', body);

    var userLogin = body['login'];
    var userInfo =  JSON.parse(body['userInfo']);

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

    userInfo.userToken = uuid;

    dbLogin[userLogin] = userInfo;


    fs.writeFile('db/users.json', JSON.stringify(dbLogin, null, 4), function (err) {
        if (err) {
            console.log('err add', err);
        } else {
            console.log('User saved');
        }
    });


    resp.send(uuid);
    resp.end();
});


http.createServer(app).listen(8081, function () {
    console.log('Working http://localhost:8081/');
});
