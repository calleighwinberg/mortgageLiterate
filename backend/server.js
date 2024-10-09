import express from "express" ;
//const express = require('express');
//const path = require('path');
//const ejsMate = require('ejs-mate');
//const cors = require("cors");
import cors from "cors" ;
//const mongoose = require('mongoose');
import bodyParser from "body-parser";
import mongoose from "mongoose" ;
import TCA from './models/tca.js';

const app = express() ;

const corsOptions = {
    origin: 'http://localhost:5173'
};

mongoose.set("strictQuery", false) ;
mongoose.connect("mongodb://localhost:27017/tcas") ;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use(cors(corsOptions));
//app.use(bodyParser.urlencoded({ extended: false })) ;
app.use(bodyParser.json());
//var jsonParser = bodyParser.json() ;
//app.use(bodyParser.urlencoded({extended: false}));
//app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
//app.use(cors({ origin: '*', }));
//app.engine('ejs', ejsMate) ;
//app.set('view engine', 'ejs') ;
//app.set('views', path.join(__dirname, 'views')) ;

app.get('/tcas', async (req, res) => { //route for index page
    const tcas = await TCA.find({})
    res.send({ tcas })
    //res.render('tcas/index', {tcas})
});

app.post("/tcas/new", async (req, res) => {
    const tca = new TCA(req.body) 
    await tca.save()
    res.send(tca._id)
})

app.get("/newTCA", async (req, res) => {         //post route to create a new TCA
    const tca = new TCA({firstName: 'calleigh'})
    //const tca = new TCA(req.body.tca);
    //tca.author = req.user._id;
    await tca.save();
    res.send(tca) ;
    //req.flash('success', 'Successfully made a new Financing Analysis') ;
    //res.redirect(`/tcas/${tca._id}/edit`);
}) ;

app.get("/tcas/:id", async (req, res) => { //get route to show dislay page 
    const tca = await TCA.findById(req.params.id);
    //const tca = await TCA.findById(req.params.id).populate('author') ;
    //res.render('tcas/show', { tca });
    res.send({ tca });
}) ;

app.post("/tcas/:id/edit", async(req,res) => {
    const tca = await TCA.findByIdAndUpdate(req.params.id, {...req.body}) ;
    res.send(tca._id);
})



app.get("/", (req, res) => {
    res.send("backend express app is answering") ;
}) ;


app.get("/home", (req, res) => {
    res.render('home') ;
}) ;


app.listen(8080, ()=> {
    console.log('backend serving on port 8080')
}) ;