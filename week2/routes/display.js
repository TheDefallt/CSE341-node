//Required to be able to access book data.
const bookData = require('./input');

//Designates express
const express = require('express');

//Start router that will handle HTTP GET and POST calls
const router = express.Router();

/*Route that is trigger on an HTTP GET that ends with a leading /. 
Starts rendering the add-book page and passes all neccessary key pairs*/
router.get('/', (req, res, next) => {
    const books = bookData.books;
    res.render('display-book', {
        pageTitle: 'Book List', 
        books: books, 
        docTitle: 'Book List', 
        path: '/', 
        hasProducts: books.length > 0,
        activShop: true
    });
});

module.exports = router;