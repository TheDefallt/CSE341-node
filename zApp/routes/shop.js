const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

//Index page => GET
router.get('/', shopController.getIndex);

//Index page => POST
router.post('/', shopController.getIndex);

//Cart page => GET
router.get('/cart', shopController.getCart);

//Cart page => POST
router.post('/cart', shopController.postCart);

//Delete => POST
router.post('/cart-delete-item', shopController.postCartDeleteProduct);

//Detail page => GET
router.get('/product-details/:productId', shopController.getProduct);


module.exports = router;