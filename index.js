const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lufn0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Welcome To Job Monster Server")
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log("database connection errors:", err);
    const jobCollection = client.db("jobmonster").collection("jobs");


});

app.listen(process.env.PORT || port)