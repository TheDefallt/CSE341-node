const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session'); //Install express-session
const MongoDBStore = require('connect-mongodb-session')(session); //Install connect-mongodb-session
const csrf = require('csurf'); //Install csrf
const flash = require('connect-flash'); //Install connect-flash

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = 
    'mongodb+srv://thedefallt:Shotgunshell@byui-classes.ydypa.mongodb.net/airplaneShop?retryWrites=true&w=majority';

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'session'
});
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'zApp/views');

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

// app.use((req, res, next) => {
//     User.findById('609dfc95e65ce53c5000ea16')
//     .then(user => {
//         req.user = user;
//         next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
.connect(MONGODB_URI)
.then(result => {
    app.listen(process.env.PORT || 3000);
})
.catch(err => {
    console.log(err);
});