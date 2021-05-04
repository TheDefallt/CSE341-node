const Product = require('../Models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('Admin/add-product', {
        pageTitle: 'Add-product', 
        path: '/admin/add-product', 
        productCSS: true,
        activeAddProduct: true
    });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('Shop/product-list', {
            pageTitle: 'Shop', 
            prods: products, 
            docTitle: 'Shop', 
            path: '/', 
            hasProducts: products.length > 0,
            activShop: true,
            productCSS: true
        });
    });
};