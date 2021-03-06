require("dotenv").config()
const express = require('express');
const formidable = require('express-formidable')
const animals = require('./routes/animals')
const food = require('./routes/food')
const accesorie = require('./routes/accesorie')
const cors = require('cors')


//set up express app

const app = express();

//import db-connection
require('./database')


app.use("/", express.static('docs'))

//allow request from other origins
app.use(cors());

//parse http form data
app.use(formidable())

//set up app routes
app.use("/api/v1", animals)
app.use("/api/v1", food)
app.use("/api/v1", accesorie)


app.listen(process.env.PORT || 4000, function() {
    console.log("now listening for requests on port 4000")
});