const Product = require('../models/airplane');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add-product', 
        path: '/admin/add-product', 
        editing: false
    });
};

//Triggered when adding a plane to the JSON file. Pulls data from the add-page and calls product.save to write it
exports.postAddProduct = (req, res, next) => {
    const make = req.body.make;
    const model = req.body.model;
    const year = req.body.year;
    const imageUrl = req.body.imageUrl;
    const category = req.body.category;
    const description = req.body.description;
    const price = req.body.price;

    const product = new Product(make, model, year, imageUrl, category, description, price);
    product.save();
    res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    console.log(editMode);
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    console.log(prodId);
    Product.findById(prodId, product => {
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit-product', 
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    });
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId);
    Product.deleteById(prodId);
    res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            pageTitle: 'Admin Products', 
            prods: products, 
            docTitle: 'Shop', 
            path: '/admin/products'
        });
    });
}