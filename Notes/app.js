const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./Controllers/error');
const routes = require('./routes.js');
const expressHbs = require('express-handlebars');
const mongoConnect = require('./Util/Database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'Notes/Views');

const adminRoutes = require('./Routes/admin.js');
const shopRoutes = require('./Routes/shop.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'Public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect((client) => {
    console.log(client);
    app.listen(3000);
});