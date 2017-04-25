var simpleReceipt = angular.module('simpleReceipt', []);

function mainController($scope, $http) {
    $scope.formData = {};
    $scope.products = [];
    $scope.cart = {};
    $scope.shopViewModel = [];

    // when landing on the page, get all todos and show them
    $http.get('/api/products')
        .success(function (data) {
            $scope.products = data;
            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    $http.get('/api/cart')
        .success(function (data) {
            $scope.cart = data;
            updateShopViewModel(data)
            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    function updateShopViewModel(cart){
        $scope.products.forEach(function(product){
            var shopViewModelItem = $scope.shopViewModel.filter(function(item){ return item.id == product.id})[0]
            var cartItem = cart.items.filter(function(item){ return item.id == product.id })[0];
            if (!shopViewModelItem){
                $scope.shopViewModel.push({
                    id : product.id,
                    name : product.name,
                    description : product.description,
                    discount : product.discount,
                    hasDiscount : product.discount != undefined,
                    qty : cartItem ? cartItem.qty : 0,
                    price : product.price
                });
            } else {
                shopViewModelItem.qty = cartItem ? cartItem.qty : 0
            }
        })
    }

    // when submitting the add form, send the text to the node API
    $scope.addToCart = function (id) {
        $http.post('/api/add-to-cart', {itemId : id})
            .success(function (data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.cart = data;
                updateShopViewModel(data)
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
    $scope.removeFromCart = function (id) {
        $http.post('/api/remove-from-cart', {itemId : id})
            .success(function (data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.cart = data;
                updateShopViewModel(data)
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

}