const Product = require('../Models/product');
const Cart = require('../Models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    .then(products => {
        res.render('Shop/product-list', {
            pageTitle: 'All products', 
            prods: products, 
            docTitle: 'Shop', 
            path: '/products'
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getProduct = (req, res, netxt) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then (product => {
        res.render('shop/product-detail', {
            product: product, 
            pageTitle: product.title,
            path: '/products'
        });
    })
    .catch(err => console.log(err));
    
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
    .then(products => {
        res.render('Shop/index', {
            pageTitle: 'Shop', 
            prods: products, 
            docTitle: 'Shop', 
            path: '/'
        });
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    });
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });
    res.render('/cart');
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