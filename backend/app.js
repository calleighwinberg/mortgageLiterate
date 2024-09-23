const express = require('express');
const ejsMate = require('ejs-mate');
const cors = require("cors");

const app = express() ;

app.use(cors({
	origin: '*',
}));

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

app.engine('ejs', ejsMate) ;
app.set('view engine', 'ejs') ;

app.get("/api", (req, res) => {
    res.json({ fruits: ["apple", "orange", "banana"] }) ;
}) ;


app.listen(8080, ()=> {
    console.log('serving on port 8080')
}) ;