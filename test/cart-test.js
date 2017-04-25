/*global describe,it*/
'use strict';
var assert = require('assert');

describe('test cart', function () {
    it('should not apply discount', function (done) {
        
        var Cart = require('../lib/cart');
        var cart = new Cart({});

        var papaya = {
            id : 4,
            name : 'Papaya',
            price : 0.50,
            description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            discount : {
                itemCount : 3,
                discount : 1/3,
                description : 'Three for the price of two'
            }
        }

        cart.add(papaya)
        cart.add(papaya)
        assert.equal(cart.totalPrice, 1.00);
        done();

    });
    it('should apply discount', function (done) {
        
        var Cart = require('../lib/cart');
        var cart = new Cart({});

        var papaya = {
            id : 4,
            name : 'Papaya',
            price : 0.50,
            description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            discount : {
                itemCount : 3,
                discount : 1/3,
                description : 'Three for the price of two'
            }
        }

        cart.add(papaya)
        cart.add(papaya)
        cart.add(papaya)
        assert.equal(cart.totalPrice, 1.00);
        assert.equal(cart.totalDiscount, 0.5);
        done();

    });

    it('should apply discount with multiple items and removal', function (done) {
        
        var Cart = require('../lib/cart');
        var cart = new Cart({});

        var papaya = {
            id : 4,
            name : 'Papaya',
            price : 0.50,
            description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            discount : {
                itemCount : 3,
                discount : 1/3,
                description : 'Three for the price of two'
            }
        }

        var apple = {
            id : 1,
            name : 'Apple',
            price : 0.25,
            description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            discount : null
        }

        cart.add(papaya)
        cart.add(papaya)
        cart.add(papaya)
        cart.add(papaya)
        cart.remove(papaya)
        cart.add(apple)
        cart.add(apple)
        cart.add(apple)
        cart.add(apple)
        assert.equal(cart.totalPrice, 2.00);
        done();

    });

    it('should not go negative', function (done) {
        
        var Cart = require('../lib/cart');
        var cart = new Cart({});

        var papaya = {
            id : 4,
            name : 'Papaya',
            price : 0.50,
            description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            discount : {
                itemCount : 3,
                discount : 1/3,
                description : 'Three for the price of two'
            }
        }

        var apple = {
            id : 1,
            name : 'Apple',
            price : 0.25,
            description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            discount : null
        }

        cart.add(papaya)
        cart.remove(papaya)
        cart.remove(papaya)
        cart.remove(papaya)
        cart.add(apple)
        assert.equal(cart.totalPrice, 0.25);
        done();

    });
});