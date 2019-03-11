import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Review = new Schema({
    title : {
        type: String,
        unique: false,
        required: false
    },
    fullText: {
        type: String,
        unique: false,
        required: false
    }
})

const Product = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    reviews: {
        type: [Review],
        unique: false,
        required: false
    }
},
{ collection : 'products' });

module.exports = mongoose.model('products', Product);