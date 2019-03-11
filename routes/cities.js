import express from 'express';
import MongoClient from "mongodb";

const router = express.Router();

let dataBase = null;
let citiesCollection = null;
MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }, function(err,client){
    if(!err){
        console.log("Database connected");
        const db = client.db('mondb');
        dataBase = db;
        citiesCollection = db.collection("cities");
        return db;
    }
    else if(err){
        console.log("here");
        throw new Error(err);
    }
})

router.get('/', function(req, res, next) {
    if(citiesCollection){
        const cities = citiesCollection.findOne({}, (err, result)=>{
            if(err){
                throw new Error(err);
            }
            res.send(JSON.stringify(result));
            return next();
        });
    } else {
        res.sendStatus(500);
        return next();    
    }
});

export default router;


