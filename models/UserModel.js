import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    login: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    }
},
{ collection : 'users' });

module.exports = mongoose.model('users', User);