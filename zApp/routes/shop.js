const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

//Index page => GET
router.get('/', shopController.getIndex);

//Index page => GET
router.post('/', shopController.getIndex);

//Cart page => GET
router.get('/cart', isAuth, shopController.getCart);

//Cart page => POST
router.post('/cart', isAuth, shopController.postCart);

//Delete => POST
router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

//Detail page => GET
router.get('/product-details/:productId', shopController.getProduct);

//Order page => POST
router.post('/create-order', isAuth, shopController.postOrder);

router.get('/checkout', isAuth, shopController.getCheckout);

router.get('/checkout/success', shopController.getCheckoutSuccess);

router.get('/checkout/cancel', shopController.getCheckout);

//Order page => GET
router.get('/order', isAuth, shopController.getOrders);

//router.get('/orders/:orderId', isAuth, shopController.getInvoice);

module.exports = router;