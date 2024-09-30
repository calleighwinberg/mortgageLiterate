import express from "express" ;
//const express = require('express');
//const path = require('path');
//const ejsMate = require('ejs-mate');
//const cors = require("cors");
import cors from "cors" ;
//const mongoose = require('mongoose');
import mongoose from "mongoose" ;
import TCA from './models/tca.js';

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

//app.engine('ejs', ejsMate) ;
//app.set('view engine', 'ejs') ;
//app.set('views', path.join(__dirname, 'views')) ;


app.get('/tcas', async (req, res) => { //route for index page
    const tcas = await TCA.find({})
    res.send({ tcas })
    //res.render('tcas/index', {tcas})
});

app.get("/newTCA", async (req, res) => {         //post route to create a new TCA
    const tca = new TCA({firstName: 'calleigh'})
    //const tca = new TCA(req.body.tca);
    //tca.author = req.user._id;
    await tca.save();
    res.send(tca) ;
    //req.flash('success', 'Successfully made a new Financing Analysis') ;
    //res.redirect(`/tcas/${tca._id}/edit`);
}) ;



app.get("/", (req, res) => {
    res.send("backend express app is answerinfg") ;
}) ;

app.get("/api", (req, res) => {
    res.json({ fruits: ["apple", "orange", "banana"] }) ;
}) ;

app.get("/home", (req, res) => {
    res.render('home') ;
}) ;


app.listen(8080, ()=> {
    console.log('backend serving on port 8080')
}) ;