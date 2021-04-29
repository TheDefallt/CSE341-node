//Require modules
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

//Express app start
const app = express();

//Set EJS as views engine, and week 2 views folder as view folder
app.set('view engine', 'ejs');
app.set('views', 'week2/views');

//Set routes constants
const inputRoutes = require('./routes/input.js');
const displayRoutes = require('./routes/display.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//Pass data to route files
app.use(inputRoutes.routes);
app.use(displayRoutes);

//Default 404 page not found route
app.use((req, res, next) => {
    res.status(404).render('404', {path: '', pageTitle: 'Page not found'});
});

//Starts app listening on port 3000 for local testing, or the designated port given by heroku
app.listen(process.env.PORT || 3000); 