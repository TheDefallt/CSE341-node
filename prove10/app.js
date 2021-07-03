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

    dummyData.avengers.forEach(element => {
        if(req.body.newHero !== undefined){
            let newHero = req.body.newHero;

            if(!dummyData.avengers.some(a => a.name === newHero)){
                dummyData.avengers.push({name: req.body.newHero});
                console.log("Avenger Added");
            }
        }
    })
});

app.get('/', (req, res, next) => {
    res.render('ta10', {
        title: 'Hero Activity'
    });
});

const server = app.listen(process.env.PORT || 5000);
const io = require('socket.io')(server);
io.on('connection', (socket) =>{
    console.log('Client Connected');

    socket.on('newName', () => {
        socket.broadcast.emit('update');
    })
});