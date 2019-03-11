import express from "express";
import session from "express-session";

import bodyParser from "body-parser";

import cities from "./routes/cities";
import citiesMongoose from "./routes/citiesMongoose";
import products from "./routes/products";
import users from "./routes/users";

// Connect to DB:
import dbConnection from "./services/dbConnect";

const app = express();
app.use(session({
    secret: "cats-park-101",
    cookie: { someCookie: "one" },
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req,res,next)=>{
    if(req.user){
        res.send(`Hello`);
        return;
    }
    res.send("Hello");
})

app.get("/api", (req, res, next) =>{
    res.send("Not implemented");
});

app.use("/api/cities", cities);
app.use("/api/citiesMongoose", citiesMongoose);
app.use("/api/products", products);
app.use("/api/users", users);


export default app;