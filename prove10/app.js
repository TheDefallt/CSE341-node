const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

app.use(bodyParser.json());

// Path to your JSON file, although it can be hardcoded in this file.
const dummyData = require('./data.json');

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', 'prove10');

app.use('/fetchAll', (req, res, next) => {
    res.json(dummyData);
});

app.use('/insert', (req, res, next) => {
    console.log(req.body.newHero);
    dummyData.avengers.push({name: req.body.newHero});
});

app.get('/', (req, res, next) => {
    res.render('ta10', {
        title: 'Hero Activity'
    });
});

app.listen(process.env.PORT || 5000);