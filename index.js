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

// Server Homepage
app.get('/', (req, res) => {
    res.send("Welcome To Job Monster Server")
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log("database connection errors:", err);
    const jobsCollection = client.db("jobmonster").collection("jobs");
    const adminCollection = client.db("jobmonster").collection("admin");
    const employerCollection = client.db("jobmonster").collection("employer");
    const seekerCollection = client.db("jobmonster").collection("seeker");

    // Add Job Api Insert
    app.post('/addjob/', (req, res) => {
        const jobs = req.body;
        console.log(jobs);
        jobsCollection.insertOne(jobs)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
      })

    // Add Admin Api Insert
    app.post('/addadmin/', (req, res) => {
        const admin = req.body;
        console.log(admin);
        adminCollection.insertOne(admin)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
      })

    // Add Employer Api Insert
    app.post('/addjob/', (req, res) => {
        const employer = req.body;
        console.log(employer);
        employerCollection.insertOne(employer)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
      })

    // Add Job Seeker Api Insert
    app.post('/addseeker/', (req, res) => {
        const seeker = req.body;
        console.log(seeker);
        seekerCollection.insertOne(seeker)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
      })




});

app.listen(process.env.PORT || port)