# simple_receipt

This is simple Node.js receipt app with a basic Angular frontend

## Setup

Clone this repository and then you can install dependncies with npm

### npm

```shell
npm install
```

## Run

You can run with the following command

```shell
node server.js
```
And then browse to http://127.0.0.1:8080/

## Run Test

You can run the test with the following command

```shell
mocha test/cart-test.js
```

## Information

Most of the interesting work is done on the Node side. The Angular app is a very basic view to driving the functionality in Node.
The cart.js class contains the cart functionality.
No Database connection was added as it doesn't offer much that is interesting for this excercise, however a MongoDB layer could be added trivially.