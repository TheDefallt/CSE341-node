const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes.js');
const expressHbs = require('express-handlebars');

const app = express();


app.engine('hbs', expressHbs({layoutsDir: 'Notes/Views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}));
app.set('view engine', 'hbs');
app.set('views', 'Notes/Views');

const adminData = require('./Routes/admin.js');
const shopRoutes = require('./Routes/shop.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'Public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page not found'});
});

app.listen(3000);