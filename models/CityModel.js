import mongoose from "mongoose";
const Schema = mongoose.Schema;
const City = new Schema({
    name: {
        type: String,
        unique: false,
        required: false
    },
    country: {
        type: String,
        unique: false,
        required: true
    },
    capital: {
        type: Boolean,
        unique: false,
        required: false
    }
},
{ collection : 'cities' });

module.exports = mongoose.model('cities', City);