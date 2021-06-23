const express = require('express');
const path = require('path');
const router = express.Router();
const app = express();

// Path to your JSON file, although it can be hardcoded in this file.
const dummyData = require('./data.json');

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', 'prove10');

router.get('/fetchAll', (req, res, next) => {
    console.log("Fetching List");
    res.json(dummyData);
});

router.post('/insert', (req, res, next) => {
    /************************************************
     * INSERT YOUR WEB ENDPOINT CODE HERE
     ************************************************/
});

app.get('/', (req, res, next) => {
    res.render('ta10', {
        title: 'Team Activity 10',
        path: '/ta10'
    });
});

module.exports = router;

app.listen(process.env.PORT || 5000);