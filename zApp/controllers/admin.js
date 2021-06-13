const {validationResult} = require('express-validator/check');

const Product = require('../models/airplane');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add-product', 
        path: '/admin/add-product', 
        editing: false,
        hasError: false,
        errorMessage: null,
        validationErrors: []
    });
};

exports.postAddProduct = (req, res, next) => {
    
    const make = req.body.make;
    const model = req.body.model;
    const year = req.body.year;
    const imageUrl = req.body.imageUrl;
    const category = req.body.category;
    const description = req.body.description;
    const price = req.body.price;
    if (!image) {
        return res.status(422).render('admin/edit-product', {
          pageTitle: 'Add Product',
          path: '/admin/add-product',
          editing: false,
          hasError: true,
          product: {
            make: make, 
            model: model,
            year: year,
            imageUrl: imageUrl,
            category: category,
            description: description,
            price: price,
            userId: req.user
          },
          errorMessage: 'Attached file is not an image.',
          validationErrors: []
        });
    }
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(422).render('admin/edit-product', {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            editing: false,
            hasError: true,
            product: {
                make: make, 
                model: model,
                year: year,
                imageUrl: imageUrl,
                category: category,
                description: description,
                price: price,
                userId: req.user
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }
    
    //const imageUrl = image.path;

    const product = new Product({
        make: make, 
        model: model,
        year: year,
        imageUrl: imageUrl,
        category: category,
        description: description,
        price: price,
        userId: req.user
    });
    product
    .save()
    .then(result => {
        console.log('Created Product');
        res.redirect('/admin/products');
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(product => {
        if(!product){
            return res.redirect('/');
        }
        
        res.render('admin/edit-product', {
            pageTitle: 'Edit-product', 
            path: '/admin/edit-product',
            editing: editMode,
            product: product,
            hasError: false,
            errorMessage: null,
            validationErrors: []
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
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

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: true,
        hasError: true,
        product: {
            make: make, 
            model: model,
            year: year,
            imageUrl: imageUrl,
            category: category,
            description: description,
            price: price,
            userId: req.user
        },
        errorMessage: errors.array()[0].msg,
        validationErrors: errors.array()
        });
    }
    
    Product.findById(prodId)
    .then(product => {
        if (product.userId.toString() !== req.user._id.toString()) {
            return res.redirect('/');
        }
        product.make = updatedMake;
        product.model = updatedModel;
        product.year = updatedYear;
        product.imageUrl = updatedImageUrl;
        product.category = updatedCategory;
        product.description = updatedDescription;
        product.price = updatedPrice;
        return product.save().then(result => {
            console.log('UPDATED PRODUCT!');
            res.redirect('/admin/products');
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
};

exports.getProducts = (req, res, next) => {
    Product.find({ userId: req.user._id })
    .then(products => {
        res.render('admin/products', {
            pageTitle: 'Admin Products', 
            prods: products, 
            path: '/admin/products'
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
}

exports.deleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
    .then(product => {
        if (!product) {
          return next(new Error('Product not found.'));
        }
        fileHelper.deleteFile(product.imageUrl);
        return Product.deleteOne({ _id: prodId, userId: req.user._id });
      })
      .then(() => {
        console.log('DESTROYED PRODUCT');
        res.status(200).json({ message: 'Success!' });
      })
      .catch(err => {
        res.status(500).json({ message: 'Deleting product failed.' });
    });
};
