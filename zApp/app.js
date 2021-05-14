const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'zApp/views');

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('609dfc95e65ce53c5000ea16')
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(
    'mongodb+srv://thedefallt:Shotgunshell@byui-classes.ydypa.mongodb.net/airplaneShop?retryWrites=true&w=majority'
)
.then(result => {
    User.findOne()
    .then(user => {
        if (!user) {
            const user = new User({
                name: 'Admin',
                email: 'admin@planes.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    });
    app.listen(process.env.PORT || 3000);
})
.catch(err => {
    console.log(err);
});