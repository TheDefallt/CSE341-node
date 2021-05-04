const products = [];

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add-product', 
        path: '/admin/add-product', 
        productCSS: true,
        activeAddProduct: true
    });
};

exports.postAddProduct = (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    res.render('shop', {
        pageTitle: 'Shop', 
        prods: products, 
        docTitle: 'Shop', 
        path: '/', 
        hasProducts: products.length > 0,
        activShop: true,
        productCSS: true
    });
}