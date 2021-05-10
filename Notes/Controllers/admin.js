const Product = require('../Models/product_old');

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

    const product = new Product(title, imageUrl, description, price);
    product.save()
    .then(result => {
        console.log('Created Product');
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    });
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