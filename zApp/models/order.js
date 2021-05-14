const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [
        {
            productData: {type: Object, required: true},
            quantity: {type:Number, required: true}
        }
    ],
    user: {
        name: {
            type: String,
            rquired: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            requred: true,
            ref: 'User'
        }
    }
});

module.exports = mongoose.model('Order', orderSchema);