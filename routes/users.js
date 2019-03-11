import express from 'express';
const router = express.Router();
import mongoose from "mongoose";

import userModel from "../models/UserModel";

const usersToImport = [
    {
        userName: "Vasia",
        login: "vasia@com.com",
        email: "vasia@com.com",
        password: "1234"        
    },
    {
        userName: "Marfa",
        login: "masha@com.com",
        email: "masha@com.com",
        password: "qwerty"
    }
];

router.get('/', function(req, res, next) {
    userModel.find({}).then(result=>{
        res.send(JSON.stringify(result));
        return next();
    }).catch(err=>{
        res.status(500).send(err);
    });

});

router.get('/import', function(req, res, next) {
    userModel.insertMany(usersToImport).then((result, err)=>{
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
    userModel.findById(castedId).then(
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

export default router;