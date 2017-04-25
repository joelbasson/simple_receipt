'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var repository = require('./lib/repository');
var Cart = require('./lib/cart');
var cart = new Cart({});

//server

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());


//routes - Possibly pull out to separate file if it gets too big

app.get('/api/products', function(req, res) {
    repository.find(function(err, products) {
        if (err) res.send(err)

        res.json(products);
    });
});

app.get('/api/cart', function(req, res) {
    res.json(cart);
});

app.post('/api/add-to-cart', function(req, res) {
    repository.findById(req.body.itemId, function(err, product) {
        if (err) res.send(err)

        cart.add(product)
        res.json(cart);
    });
});

app.post('/api/remove-from-cart', function(req, res) {
    repository.findById(req.body.itemId, function(err, product) {
        if (err) res.send(err)

        cart.remove(product)
        res.json(cart);
    });
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

app.listen(8080);
console.log("App listening on port 8080");
