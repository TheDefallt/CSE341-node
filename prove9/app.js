const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', 'prove9/views');


app.get('/', (req, res, next) => {
    res.render('index');
})

app.listen(process.env.PORT || 5000);