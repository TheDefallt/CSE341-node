const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const Cart = require('./cart');

//Product class with all relavent data
class Product {

    //Constructor that builds a new plane
    constructor(id, make, model, year, imageUrl, category, description, price) {
        this._id = id;
        this.make = make;
        this.model = model;
        this.year = year;
        this.imageUrl = imageUrl;
        this.category = category;
        this.description = description;
        this.price = price;
    }
    
    //Saves this version of product to the MongoDB.
    save() {
        const db = getDb();
        let dbOp;
        if(this._id){
            dbOp = db
            .collection('airplanes')
            .updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: this});
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

    //Gets all planes from the JSON file. Returns empty if there is an error.
// const getProductsFromFile = cb => {
//     fs.readFile(p, (err, fileContent) => {
//         if (err) {
//             cb([]);
//         } else {
//             cb(JSON.parse(fileContent));
//         }
//     });
// }
    
    // save() {
    //     getProductsFromFile(products => {
    //         if (this.id) {
    //             const existingProductIndex = products.findIndex(prod => prod.id === this.id);
    //             const updatedProducts = [...products];
    //             updatedProducts[existingProductIndex] = this;
                
    //             fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //                 console.log(err);
    //             });
    //         } else {
    //             this.id = Math.random().toString();
    //             products.push(this);
    //             fs.writeFile(p, JSON.stringify(products), err => {
    //                 console.log(err);
    //             });
    //         }
    //     });
    // }


    // static deleteById(id) {

    //     console.log(id);
    //     getProductsFromFile(products => {
    //         const product = products.find(prod => prod.id === id);
    //         const updatedProducts = products.filter(p => p.id !== id);
    //         fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //             if(!err){
    //                 Cart.deleteProduct(id, product.price);
    //             }
    //         });
    //     });
    // }

    // //Gets all planes contained in the airplanes.JSON file
    // static fetchAll(cb) {
    //     getProductsFromFile(cb);
    // }

    // //Gets a specific plane from the airplanes.JSON file
    // static findById(id, cb){
    //     getProductsFromFile(products => {
    //         const product = products.find(p => p.id === id);
    //         cb(product);
    //     });
    // }
}

module.exports = Product;