const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const secret = 'my-secret-key';

//define mongoose schemas
const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const courseSchema = new mongoose.Schema({
    title: String,
    description: String, 
    price: Number,
    imageLink: String,
    published: Boolean
});

//define mongoose models
const Admin = mongoose.model('Admin', adminSchema);
const course = mongoose.model('Course', courseSchema);

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split('')[1];
        jwt.verify(token, secret, (err, user) => {
            if(err){
                return res.status(403);
            }

            res.user = user;
            next();
        });
    }

    else{
        res.status(401);
    }
}

//connect to MongoDB
mongoose.connect('mongodb+srv://koustubhlap:kond018@koustubh18.qmw1c9a.mongodb.net/', {dbName: "courses"});

app.listen(port, () => {
    console.log('Course selling admin side backend server listening on port 3000');
});