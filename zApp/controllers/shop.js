//A copy of the product model to call functions
const Product = require('../models/airplane');

exports.getProducts = (req, res, next) => {
    Product.find()
    .then(products => {
        res.render('shop/index', {
            pageTitle: 'All planes', 
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
    .then(product => {
        res.render('shop/product-detail', {
            product: product, 
            pageTitle: `${product.make} ${product.model}`,
            path: '/products'
        });
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getIndex = (req, res, next) => {
    Product.find()
    .then(products => {
         //Extra filtering code
        let filteredProduct = [];
        criteria = req.body.filterCriteria;
        const categories = [];
        for (product of products) {
            if (!categories.includes(product.category)){
                categories.push(product.category);
            }
        }
        //Extra filtering code
        if(criteria === 'None' || !criteria){
            filteredProduct = products;
        } else {
            filteredProduct = products.filter(product => product.category === criteria); 
        }

        res.render('Shop/index', {
            pageTitle: 'Shop', 
            prods: products, 
            docTitle: 'Shop', 
            path: '/',
            categories: categories
        });
    })
    .catch(err => {
        console.log(err);
    });
}


//The issue is here, everything is null for some reason.
exports.getCart = (req, res, next) => {
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {   
        const products = user.cart.items;   
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products,
            total: 'Total Price Placeholder'
        });
    })
    .catch(err => console.log(err));
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
    .then(product => {
        return req.user.addToCart(product);
    })
    .then(result => {
        res.redirect('/cart');
        console.log(result);
    });
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
    .removeFromCart(prodId)
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
    req.user
    .getOrders()
    .then(orders => {
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Your Orders',
            orders: orders
        });
        console.log(orders);
    })
    .catch(err => console.log(err));
}

//Need to work on this, I may have missed this part
exports.postOrder = (req, res, next) => {
    let fetchedCart; //Might not need this line
    req.user
        .addOrder()
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
}