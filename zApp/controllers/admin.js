const mongodb = require('mongodb');
const Product = require('../models/airplane');

const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add-product', 
        path: '/admin/add-product', 
        editing: false
    });
};

//Triggered when adding a plane to MongoDb. Pulls data from the add-page and calls product.save to write it
exports.postAddProduct = (req, res, next) => {
    const make = req.body.make;
    const model = req.body.model;
    const year = req.body.year;
    const imageUrl = req.body.imageUrl;
    const category = req.body.category;
    const description = req.body.description;
    const price = req.body.price;

    const product = new Product(null, make, model, year, imageUrl, category, description, price);
    product.save()
    .then(result => {
        console.log('Created Product');
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    });
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

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedMake = req.body.make;
    const updatedModel = req.body.model;
    const updatedYear = req.body.year;
    const updatedImageUrl = req.body.imageUrl;
    const updatedCategory = req.body.category;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;
    const updatedProduct = new Product(prodId, updatedMake, updatedModel, updatedYear, updatedImageUrl, updatedCategory, updatedDescription, updatedPrice)
    updatedProduct.save();
    res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId);
    Product.deleteById(prodId);
    res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    .then(products => {
        res.render('admin/products', {
            pageTitle: 'Admin Products', 
            prods: products, 
            docTitle: 'Shop', 
            path: '/admin/products'
        });
    })
    .catch(err => console.log(err));
}