/**
 * Created by sergey on 4/10/14.
 */

var http = require('http');
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

function getProductsDb(req, resp){
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
app.get('/login', getPageRelatedPath);
app.get('/registration', getPageRelatedPath);


http.createServer(app).listen(8081, function () {
    console.log('Working http://localhost:8081/');
});
