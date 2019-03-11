import mongoose from "mongoose"; 

// set mongoose by default
var mongoDB = 'mongodb://127.0.0.1/mondb';

class dbConnect{
    constructor(){
        mongoose.connect(mongoDB);
        // get mongose Propmise to use global Promise
        mongoose.Promise = global.Promise;

        // Get connection
        const db = mongoose.connection;
        
        // Bind db errors to console
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        
        return db
    }
}

module.exports = new dbConnect();