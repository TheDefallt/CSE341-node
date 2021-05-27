//A copy of the product model to call functions
const Product = require('../models/airplane');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
    Product.find()
    .then(products => {
        res.render('shop/index', {
            pageTitle: 'All planes', 
            prods: products, 
            path: '/products'
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
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
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
}

exports.getIndex = (req, res, next) => {
    Product.find()
    .then(products => {

        //Gathers all available categories to be filtered from the database.
        const categories = [];
        for (product of products) {
            if (!categories.includes(product.category)){
                categories.push(product.category);
            }
        }
        
        //Creates an array of products that only have the filtering criteria.
        let filteredProduct = [];
        criteria = req.body.filterCriteria;
        if(criteria === 'None' || !criteria){
            filteredProduct = products;
        } else {
            filteredProduct = products.filter(product => product.category === criteria); 
        }

        //Renders the page
        res.render('shop/index', {
            pageTitle: 'Shop', 
            prods: filteredProduct, 
            path: '/',
            categories: categories
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
}


//The issue is here, everything is null for some reason.
exports.getCart = (req, res, next) => {
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {   
        const products = user.cart.items;
        
        //Keeps running total of the prices of all items in the cart
        let total = 0;
        for (product of products) {
            total += product.productId.price;
        }

        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products,
            total: total
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
    .then(product => {
        return req.user.addToCart(product);
    })
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
    .removeFromCart(prodId)
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
}

exports.getOrders = (req, res, next) => {
    Order.find({'user.userId': req.user._id})
    .then(orders => {
        res.render('shop/orders', {
            path: '/order',
            pageTitle: 'Your Orders',
            orders: orders
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
}

//Need to work on this, I may have missed this part
exports.postOrder = (req, res, next) => {
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {   
        const products = user.cart.items.map(i => {
            return {quantity: i.quantity, productData: { ...i.productId._doc } };
        });
        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user
            },
            products: products
        });  
        return order.save();
    })
    .then(result => {
        return req.user.clearCart();
    })
    .then(() => {
        res.redirect('/order');
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
};