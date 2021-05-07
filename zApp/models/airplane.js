const fs = require('fs');
const path = require('path');

//Path to airplanes.json file
const p = path.join(path.dirname(process.mainModule.filename), 
            'data', 
            'airplanes.json'
        );

//Gets all planes from the JSON file. Returns empty if there is an error.
const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
}


//Product class with all relavent data
module.exports = class Product {

    //Constructor that builds a new plane
    constructor(make, model, year, imageUrl, category, description, price) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.imageUrl = imageUrl;
        this.category = category;
        this.description = description;
        this.price = price;
    }
    
    //Saves this version of product to the airplanes.JSON file
    save() {
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        });
    }

    //Gets all planes contained in the airplanes.JSON file
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    //Gets a specific plane from the airplanes.JSON file
    static findById(id, cb){
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
}