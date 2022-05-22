require('./config/config')

const express = require('express');
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();

// const { moongose } = require('./database')

// Middleware

app.use(morgan("dev"))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

// Start Server

const MongoClient = require('mongodb').MongoClient

const myurl = 'mongodb://localhost:27017';

MongoClient.connect(myurl, (err, client) => {
        if (err) return console.log(err)
        db = client.db('UFEG-img-DB')
        app.listen(process.env.PORT, () => {
                console.log("listening on port", process.env.PORT)
        })
})

// Routes

app.use(require("./routes/fetch.routes"))