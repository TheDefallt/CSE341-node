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
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(title, price, description, imageUrl);
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
    console.log("Edit Attempt");
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    })
    .catch(err => {
        console.log(err);
    });
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