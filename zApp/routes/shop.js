const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

//Index page => GET
router.get('/', shopController.getIndex);

//Cart page => GET
router.get('/cart', shopController.getCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.get('/product-details/:productId', shopController.getProduct);

//Cart page => POST
router.post('/cart', shopController.postCart);

module.exports = router;