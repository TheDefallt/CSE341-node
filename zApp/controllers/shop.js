//const stripe = require('stripe')('sk_test_Flc1Upp19T0q8ZgmKGDVJUI400j9emUSTr'); //Need to install this

const PDFDocument = require('pdfkit'); //Need to install this

//A copy of the product model to call functions
const Product = require('../models/airplane');
const Order = require('../models/order');

const ITEMS_PER_PAGE = 2;

exports.getProducts = (req, res, next) => {
    const page = +req.query.page || 1;
    let totalItems;

    Product.find()
    .countDocuments()
    .then(numProducts => {
        totalItems = numProducts;
        return Product.find()
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);
    })
    .then(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Products',
            path: '/products',
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalItems,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
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
    const page = +req.query.page || 1;
    let totalItems;
    
    Product.find()
    .countDocuments()
    .then(numProducts => {
        totalItems = numProducts;
        return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
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
            categories: categories,
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalItems,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
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

exports.getCheckout = (req, res, next) => {
    let products;
    let total = 0;
    req.user
      .populate('cart.items.productId')
      .execPopulate()
      .then(user => {
        products = user.cart.items;
        total = 0;
        products.forEach(p => {
          total += p.quantity * p.productId.price;
        });
  
        return stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: products.map(p => {
            return {
              name: p.productId.title,
              description: p.productId.description,
              amount: p.productId.price * 100,
              currency: 'usd',
              quantity: p.quantity
            };
          }),
          success_url: req.protocol + '://' + req.get('host') + '/checkout/success', // => http://localhost:3000
          cancel_url: req.protocol + '://' + req.get('host') + '/checkout/cancel'
        });
      })
      .then(session => {
        res.render('shop/checkout', {
          path: '/checkout',
          pageTitle: 'Checkout',
          products: products,
          totalSum: total,
          sessionId: session.id
        });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  };
  
  exports.getCheckoutSuccess = (req, res, next) => {
    req.user
      .populate('cart.items.productId')
      .execPopulate()
      .then(user => {
        const products = user.cart.items.map(i => {
          return { quantity: i.quantity, product: { ...i.productId._doc } };
        });
        const order = new Order({
          user: {
            email: req.user.email,
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
        res.redirect('/orders');
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  };

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
    if(req.user.cart.items.length > 0){
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
    } else {
        res.redirect('/cart');
    }
    
};