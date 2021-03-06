var Big = require('big.js');

module.exports = function Cart(oldCart) {
    this.items = oldCart.items || [];
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    this.totalDiscount = oldCart.totalDiscount || 0.00;

    this.add = function(item) {
        var storedItem = this.items.filter(function(x){ return x.id == item.id})[0]
        if (!storedItem) {
            storedItem = {id : item.id,  item: item, qty: 0, itemTotal: 0, itemDiscount : 0};
            this.items.push(storedItem)
        }
        storedItem.qty++;
        storedItem.itemTotal = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.calculateTotal();
    };

    this.remove = function(item) {
        var storedItem = this.items.filter(function(x){ return x.id == item.id})[0]
        if (!storedItem) return;

        storedItem.qty--;
        this.totalQty--;
        this.calculateTotal();

        if (storedItem.qty <= 0) {
            this.items = this.items.filter(function(x){ return x.id != item.id});
        }
    };

    this.calculateTotal = function(){
        var tempTotalDiscount = 0.00;
        this.totalPrice = this.items.reduce(function(a, b){
            var discount = 0;
            if (b.item.discount){
                var discounts = Math.floor(b.qty/b.item.discount.itemCount);
                discount = new Big(b.item.price).times(b.item.discount.itemCount).times(discounts).times(b.item.discount.discount).toFixed(2) //get the discount value
            }
            b.itemDiscount = discount;
            tempTotalDiscount = new Big(tempTotalDiscount).plus(discount).toFixed(2);
            return new Big(a).plus(new Big(b.item.price).times(b.qty).minus(discount)).toFixed(2); //apply the discount value to the sum
        }, 0);
        this.totalDiscount = tempTotalDiscount;
    }
};