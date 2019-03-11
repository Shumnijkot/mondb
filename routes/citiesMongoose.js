import express from 'express';

const router = express.Router();

import cityModel from "../models/CityModel";

router.get('/', function(req, res, next) {
    cityModel.find().then((result, err)=>{
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

export default router;