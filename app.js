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

app.get('/addProduct', function(req, resp){
    var db = fs.readFileSync('db/products.json', {
        encoding: 'utf8'
    });
    db = JSON.parse(db);

    var params = url.parse(req.url,true).query;
    console.log('req.params', params);

    params['price'] = JSON.parse(params['price']);
    params['techInfo'] = JSON.parse(params['techInfo']);


    db.push(params);
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


http.createServer(app).listen(8081, function () {
    console.log('Working http://localhost:8081/');
});
