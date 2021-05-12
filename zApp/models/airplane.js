const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

//Product class with all relavent data
class Product {

    //Constructor that builds a new plane
    constructor(id, make, model, year, imageUrl, category, description, price, userId) {
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.make = make;
        this.model = model;
        this.year = year;
        this.imageUrl = imageUrl;
        this.category = category;
        this.description = description;
        this.price = price;
        this.userId = userId;
    }
    
    //Saves this version of product to the MongoDB.
    save() {
        const db = getDb();
        let dbOp;
        if(this._id){
            dbOp = db
            .collection('airplanes')
            .updateOne({_id: this._id}, {$set: this});
        } else {
            dbOp = db.collection('airplanes').insertOne(this);
        }
        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDb();
        return db
        .collection('airplanes')
        .find()
        .toArray()
        .then(products => {
            console.log(products);
            return products;
        })
        .catch(err => {
            console.log(err);
        });
    }

    static findById(prodId){
        
        const db = getDb();
        return db.collection('airplanes')
        .find({_id: mongodb.ObjectId(prodId)})
        .next()
        .then(product => {
            console.log(product);
            return product;
        })
        .catch(err => {
            console.log(err);
        });
    }

    static deleteById(prodId) {
        const db = getDb();
        return db
        .collection('airplanes')
        .deleteOne({_id: new mongodb.ObjectId(prodId)})
        .then(result => {
            console.log('Deleted');
        })
        .catch(err => {
            console.log(err);
        });
    }
}

module.exports = Product;