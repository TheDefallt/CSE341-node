const express = require('express')
const router = express.Router()

const users = ['admin'] // Dummy array for users

router.get('/', (req, res, next) => {
    res.render('pages/pr12-login', {
        title: 'Prove Activity 12',
        path: '/proveActivities/12'
    })
})

// Verify login submission to access chat room.
router.post('/login', (req, res, next) => {
    const {userName} = req.body;

    //Make sure username is not empty
    if(!userName){
        return res.status(400).send({error: 'Username cannot be blank.'});
    }

    //Make sure username is not a duplicate
    if(users.includes(userName.trim())){
        return res.status(409).send({error: 'Duplicate username. Please choose another.'});
    }

    //Add username to array
    users.push(userName.trim());

    //Save user to session variable
    req.session.user = userName;

    //Send success
    res.status(200).send({ username: userName.trim()});
})

// Render chat screen.
router.get('/chat', (req, res, next) => {
    res.render('pages/pr12-chat', {
        title: 'Prove Assignment 12',
        path: '/proveAssignments/12',
        user: req.session.user
    });
})

module.exports = router
