const path = require('path');

const rootDir = require('../Util/path');
const adminData = require('./admin');

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    const products = adminData.products;
    res.render('shop', {pageTitle: 'Shop', prods: products, docTitle: 'Shop', path: '/'});
});

module.exports = router;