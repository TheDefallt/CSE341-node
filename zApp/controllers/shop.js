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
        console.log(err);
    });
}; //I removed docTitle from this function

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
        } //Fix filtering code
        //Extra filtering code
        if(criteria === 'None' || !criteria){
            filteredProduct = products;
        } else {
            filteredProduct = products.filter(product => product.category === criteria); 
        }

        res.render('shop/index', {
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
        //Fix cart total
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
    Order.find({'user.userId': req.user._id})
    .then(orders => {
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Your Orders',
            orders: orders
        });
    })
    .catch(err => console.log(err));
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
    .catch(err => console.log(err));
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
}