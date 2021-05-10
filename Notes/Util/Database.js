const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://thedefallt:T%3Fikoacsh@byui-classes.ydypa.mongodb.net/BYUI-Classes?retryWrites=true&w=majority'
    )
    .then(client => {
        console.log('Connected!');
        callback(client);
    })
    .catch(err => {
        console.log(err);
    });
};

module.exports = mongoConnect;