'use strict';

var products = [
    {
        id : 1,
        name : 'Apple',
        price : 0.25,
        description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        discount : null
    },
    {
        id : 2,
        name : 'Orange',
        price : 0.30,
        description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        discount : null
    },
    {
        id : 3,
        name : 'Garlic',
        price : 0.15,
        description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        discount : null
    },
    {
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
]

module.exports = {
    find:function(callback){
        return callback(null, products)
    },
    findById:function(id, callback){
        var product = products.filter(function(item){ return item.id == id})[0];
        return callback(null, product)
    }
}