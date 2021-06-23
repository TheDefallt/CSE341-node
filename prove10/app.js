const express = require('express');
    const router = express.Router();

    // Path to your JSON file, although it can be hardcoded in this file.
    const dummyData = require('../../data/ta10-data.json')

    router.get('/', (req, res, next) => {
        res.render('pages/teamActivities/ta10', {
            title: 'Team Activity 10',
            path: '/teamActivities/10',
        });
    });

    router.get('/fetchAll', (req, res, next) => {
        res.json(dummyData);
    });

    router.post('/insert', (req, res, next) => {
    /************************************************
     * INSERT YOUR WEB ENDPOINT CODE HERE
     ************************************************/
    });