import express, { json } from 'express';
import pkg1 from 'jsonwebtoken';
import { Schema, model, connect } from 'mongoose';
import cors from 'cors';
import pkg from 'body-parser';
const port = 3000;

const app = express();

const {json: _json} = pkg;
const {verify, sign} = pkg1;

app.use(cors());
app.use(_json());

const secret = 'my-secret-key';

//define mongoose schemas
const adminSchema = new Schema({
    username: String,
    password: String
});

const courseSchema = new Schema({
    title: String,
    description: String, 
    price: Number,
    imageLink: String,
    published: String
});

//define mongoose models
const Admin = model('Admin', adminSchema);
const Course = model('Course', courseSchema);

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(' ')[1];
        verify(token, secret, (err, user) => {
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
connect('mongodb+srv://koustubhlap:kond018@koustubh18.qmw1c9a.mongodb.net/', {dbName: "coursesdata"});

app.post('/admin/signup', (req, res) => {
    const {username, password} = req.body;
    //console.log(req.body);
    function callback(admin){
        if(admin){
            res.status(403).json({message: 'Admin already exists'});
        }

        else{
            const obj = {username: username, password: password};
            const newAdmin = new Admin(obj);
            newAdmin.save();
            const token = sign({username, role: 'admin'}, secret, {expiresIn: '1h'});
            res.json({message: 'Admin created successfully', token});
        }
    }

    Admin.findOne({username}).then(callback);
});

app.post('/admin/login', async (req, res) => {
  const {username, password} = req.headers;
  const admin = await Admin.findOne({username, password});

  if(admin){
    const token = sign({username, role: 'admin'}, secret, {expiresIn: '1h'});
    res.json({message: 'Admin logged in successfully', token});
  }

  else{
    res.status(403).json({message: 'Invalid username or password'});
  }
});

app.post('/admin/courses', authenticateJwt, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({message: 'Course created successfully', courseId: course.id});
});

app.put('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {new: true});

  if(course){
    res.json({message: 'Course Updated successfully'});
  }

  else{
    res.status(404).json({message: 'Course not found'});
  }
});

app.get('/admin/courses', authenticateJwt, async (req, res) => {
  const courses = await Course.find({});
  res.json({courses});
});

app.listen(port, () => {
    console.log('Course selling admin side backend server listening on port 3000');
});