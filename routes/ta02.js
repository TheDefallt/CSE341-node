//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself! 
const express = require('express');
const router = express.Router();

const users = ["Tony Stark", "Bruce Banner", "Peter Parker"];

const userExists = true;

router.get('/',(req, res, next) => {
    res.render('pages/ta02', { 
        title: 'Team Activity 02', 
        path: '/ta02', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
        users: users
    });
});

router.post('/addUser', (req, res, next) => {
    users.push(req.body.username);
    res.redirect('/ta02');
});

router.post('/removeuser', (req, res, next) => {
    if (users.indexOf(req.body.userremove) < 0) {

    }
    users.splice(users.indexOf(req.body.userremove), 1);
    res.redirect('/ta02');
});

module.exports = router;