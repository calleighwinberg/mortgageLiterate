const express = require('express');
//const path = require('path');
const ejsMate = require('ejs-mate');
const cors = require("cors");
const mongoose = require('mongoose');
const TCA = require('./models/tca');

const app = express() ;

mongoose.connect("mongodb://localhost:27017/tcas") ;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use(cors({
	origin: '*',
}));

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

app.engine('ejs', ejsMate) ;
app.set('view engine', 'ejs') ;
//app.set('views', path.join(__dirname, 'views')) ;

app.get("/", (req, res) => {
    res.send("express app is answerinfg") ;
}) ;

app.get("/api", (req, res) => {
    res.json({ fruits: ["apple", "orange", "banana"] }) ;
}) ;

app.get("/home", (req, res) => {
    res.render('home') ;
}) ;


app.listen(8080, ()=> {
    console.log('serving on port 8080')
}) ;