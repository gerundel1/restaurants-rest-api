/*********************************************************************************
*  Name: German Malikov
*  Heroku Link: https://radiant-thicket-90968.herokuapp.com/
********************************************************************************/ 

const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

const RestaurantDB = require("./modules/restaurantDB.js");
const db = new RestaurantDB("mongodb+srv://gerundel:83109754116gW@cluster0.prfhi.mongodb.net/sample_restaurants?retryWrites=true&w=majority");


db.initialize().then(()=>{
    app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
    });
   }).catch((err)=>{
    console.log(err);
   });

app.get("/", (req,res) => {
    res.json({ message: "API Listening" });
});

app.post("/api/restaurants", (req, res) => {
    db.addNewRestaurant(req.body)
    .then((rest) => {res.status(201).json({ message: `${rest}` })})
    .catch(res.status(500).json({ message: "An error occurred" }));
});

app.get("/api/restaurants", (req, res) =>{
    db.getAllRestaurants(req.query.page, req.query.perPage, req.query.borough)
    .then((arr) => {
        res.status(200).json(arr);
    })
    .catch((err) => (res.status(500).json({message: `${err}`})));
});

app.get("/api/restaurants/:id", (req, res) =>{
    db.getRestaurantById(req.params.id)
    .then((restaurant) => {
        res.send(restaurant);
    })
    .catch((err) => {
        res.status(500).json({ message: "An error occurred" })
    });
});

app.put("/api/restaurants/:id", (req, res) =>{
    db.updateRestaurantById(req.body, req.params.id)
    .then((msg) => {res.status(201).json({ message: `${msg}` })})
    .catch((err) => {
        res.status(500).json({ message: "An error occurred" })
    });
});

app.delete("/api/restaurants/:id", (req, res) =>{
    db.deleteRestaurantById(req.params.id)
    .then((msg) => {res.status(204).json({ message: `${msg}` })})
    .catch((err) => {
        res.status(500).json({ message: "An error occurred" })
    });
});

