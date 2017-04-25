'use strict';

var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var repository = require('./lib/repository'); //mock data
var Cart = require('./lib/cart');   //The main functionality

//server

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(session({
    secret: 'supersecret',
    resave: true,
    saveUninitialized: true
}));


//routes - Possibly pull out to separate file if it gets too big

app.get('/api/products', function(req, res) {
    repository.find(function(err, products) {
        if (err) res.send(err)

        res.json(products);
    });
});

app.get('/api/cart', function(req, res) {
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    res.json(cart);
});

app.post('/api/add-to-cart', function(req, res) {
    repository.findById(req.body.itemId, function(err, product) {
        if (err) res.send(err)

        var cart = new Cart(req.session.cart ? req.session.cart : {});
        cart.add(product)
        req.session.cart = cart;
        res.json(cart);
    });
});

app.post('/api/remove-from-cart', function(req, res) {
    repository.findById(req.body.itemId, function(err, product) {
        if (err) res.send(err)

        var cart = new Cart(req.session.cart ? req.session.cart : {});
        cart.remove(product)
        req.session.cart = cart;
        res.json(cart);
    });
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

app.listen(8080);
console.log("App listening on port 8080");
