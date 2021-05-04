const Product = require('../Models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('Shop/product-list', {
            pageTitle: 'All products', 
            prods: products, 
            docTitle: 'Shop', 
            path: '/products'
        });
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('Shop/index', {
            pageTitle: 'Shop', 
            prods: products, 
            docTitle: 'Shop', 
            path: '/'
        });
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    });
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
}