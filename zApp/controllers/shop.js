//A copy of the product model to call functions
const Product = require('../models/airplane');

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            pageTitle: 'All planes', 
            prods: products, 
            docTitle: 'Shop', 
            path: '/products'
        });
    });
};

exports.getProduct = (req, res, netxt) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-detail', {
            product: product, 
            pageTitle: `${product.make} ${product.model}`,
            path: '/products'
        });
    });
    
}

// exports.getIndex = (req, res, next) => {
//     Product.fetchAll((products) => {
//         //Extra filtering code
//         let filteredProduct = [];
//         criteria = req.body.filterCriteria;
//         const categories = [];
//         for (product of products) {
//             if (!categories.includes(product.category)){
//                 categories.push(product.category);
//             }
//         }
//         //Extra filtering code
//         if(criteria === 'None' || !criteria){
//             filteredProduct = products;
//         } else {
//             filteredProduct = products.filter(product => product.category === criteria); 
//         }
        
//         res.render('shop/index', {
//             pageTitle: 'Shop', 
//             prods: filteredProduct, 
//             docTitle: 'Shop', 
//             path: '/',
//             categories: categories
//         });
//     });
// }

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
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
    .getCart()
    .then(products => {      
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
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
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