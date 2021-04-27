const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes.js');

const app = express();

const adminRoutes = require('./Routes/admin.js');
const shopRoutes = require('./Routes/shop.js');

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(__dirname(path.join__dirname, 'views', '404.html'));
});

app.listen(3000);