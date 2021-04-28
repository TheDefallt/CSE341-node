//Import express functions
const express = require('express');

//Start router that will handle HTTP GET and POST calls
const router = express.Router();

//Array for storing user inputs. Data leaves when server restarts.
const products = [];

/*Route that is trigger on an HTTP GET that ends with /add-book. 
Starts rendering the add-book page and passes all neccessary key pairs*/
router.get('/add-book', (req, res, next) => {
    res.render('add-book', {
        pageTitle: 'Add Book', 
        path: 'add-book', 
        activeAddBook: true
    });
});

router.post('/add-book', (req, res, next) => {
    products.push({ 
        title: req.body.title, 
        summary:  req.body.summary
    });
    res.redirect('/');
});

exports.routes = router;
exports.products = products;