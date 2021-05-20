//TA05 PLACEHOLDER
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session); //Install connect-mongodb-session
const router = express.Router();



router.get('/',(req, res, next) => {
    res.render('pages/ta05', { 
        title: 'Team Activity 05', 
        path: '/ta05', // For pug, EJS 
        activeTA05: true, // For HBS
        contentCSS: true, // For HBS
    });
});

module.exports = router;