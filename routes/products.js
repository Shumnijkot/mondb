import express from 'express';
const router = express.Router();
import mongoose from "mongoose";

import productModel from "../models/ProductModel";

const productsToImport = [
    {
        name: "bunny",
        reviews: [
            {title:"good", fullText: "fluffy"},
            {title:"Nice", fullText: "very nice"}
        ]
    },
    {
        name: "bear",
        reviews: [
            {title:"scary", fullText: "But fluffy"},
            {title:"Awesome", fullText: "very awesome"}
        ]
    },
]

router.get('/', function(req, res, next) {
    productModel.find({}).then(result=>{
        res.send(JSON.stringify(result));
        return next();
    }).catch(err=>{
        res.status(500).send(err);
    });

});

router.get('/import', function(req, res, next) {
    productModel.insertMany(productsToImport).then((result, err)=>{
        if(!err){
            res.send('Ok');
            return next();
        } else {
            res.status(500).send(err);
        }
    }).catch(err=>{
        console.log("something went wrong");
        res.status(500).send(err);
    });
    
});

router.get('/:id', function(req, res, next) {
    const { id } = req.params;
    const castedId = mongoose.Types.ObjectId(id);

    if(!id){
        res.status(404).send("Wrong id");
    }
    productModel.findById(castedId).then(
        result=>{
            if(!result){
                res.sendStatus(404);
                return next();
            }
            res.send(JSON.stringify(result));
            return next();
        }
    ).catch(err=>{
        res.send(err);
        return next();
    })
});

router.get('/:id/reviews', function(req, res, next) {
    const { id } = req.params;
    const castedId = mongoose.Types.ObjectId(id);

    if(!id){
        res.status(404).send("Wrong id");
    }
    productModel.findById(castedId).then(
        result=>{
            if(!result){
                res.sendStatus(404);
                return next();
            }
            res.send(JSON.stringify(result.reviews || []));
            return next();
        }
    ).catch(err=>{
        res.send(err);
        return next();
    });
});

router.post('/', function(req, res, next) {
    if(!req.body){
        res.sendStatus(500);
    }
    const {name, reviews} = req.body;
    if(!name){
        res.status(400).send("Name can not be empty");
    }
    const parsedReviews = reviews ? JSON.parse(reviews) : null;
    const newProduct = new productModel({name, reviews: parsedReviews});

    newProduct.save().then(result=>{
        res.send("Ok");
        return next();
    }).catch(err=>{
        res.send(err);
    });
});

export default router;