// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// app.use(express.json());
// app.use(cors());
const express = require('express');
const mongoose = require('mongoose'); // Only declare once
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const SECRET = "top s3cr3t";

const userSchema  = new mongoose.Schema({
  username : {type : String},
  password : String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const adminSchema = new mongoose.Schema({
  username : String,
  password : String
});

const courseSchema = new mongoose.Schema({
  title : String,
  description : String,
  price : Number,
  imageLink : String,
  published : Boolean,
  publishedBy : String
});

// const Users = mongoose.model('User',userSchema);
// const Admin = mongoose.model('Admin',adminSchema);
// const Course = mongoose.model('Course',courseSchema);
const Users = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);

mongoose.connect('mongodb+srv://captainshaheenbagh:TW8f2Tq4UxRW4SK5@cluster0.sqtpm.mongodb.net/',{ dbName: "courses" });
console.log('db connext');

const authorization = (req,res,next) =>{
    const authheader = req.headers.authorization;
    if (authheader) {
      const token = authheader.split(' ')[1];
      jwt.verify(token,SECRET,(err,user)=>{
        if(err){
          return res.sendStatus(403).json({ message: 'Authorization error' });
        }
        req.user = user;
        next();
      });
    } else {
      return res.sendStatus(401).json({message : "authentication header missing"});
    }
  };
app.get('/me',authorization,(req,res)=>{
  res.json({
    username:req.user.username
  })  
})

// Admin routes
app.post('/admin/signup', (req, res) => {  //tested
  // logic to sign up admin
  const { username, password } = req.body;
  function callback(admin) {
    if (admin) {
      res.status(403).json({ message: 'Admin already exists' });
    } else {
      const obj = { username: username, password: password };
      const newAdmin = new Admin(obj);
      newAdmin.save();
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Admin created successfully', token });
    }

  }
  Admin.findOne({ username }).then(callback);
});
// both does the same job but one is  more industry efficinet code
app.post('/admin/login', async(req, res) => { // tested
  // logic to log in admin
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.post('/admin/courses', authorization, async (req, res) => {
  try {
    const { title, description, price, imageLink, published } = req.body;
// Create a new course linked to the admin
    const course = new Course({
      title :title,
      description : description,
      price : price,
      imageLink : imageLink,
      published: published || false, // Default to false if not provided
      publishedBy: req.user.username, // Use the logged-in admin's username
    });
    await course.save();
    res.status(201).json({ message: 'Course created successfully', courseId: course._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/admin/courses/:courseId', authorization, async(req, res) => {
  // logic to edit a course
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
  if (course) {
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});
app.get('/admin/courses',authorization, async (req, res) => { //tested
  // logic to get all courses
  const courses = await Course.find({publishedBy:req.user.username});
  res.json({courses});
});
const mongoose = require('mongoose');

app.delete('/admin/delete/:courseId', authorization, async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid Course ID' });
    }
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    console.log("Course deleted:", deletedCourse);
    res.json({ message: 'Course deleted successfully', deletedCourse });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User routes
app.post('/users/signup', async(req, res) => {  // tested
  // logic to sign up user
  const {username , password} = req.body;
  const user = await Users.findOne({username});
  if (user) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    const obj = {username,password};
    const newUser = new Users(obj);  // or new User({ username, password })
    newUser.save();
    const token = jwt.sign({username,role:'user'},SECRET,{expiresIn:'1h'});
    res.json({ message: 'User created successfully', token });
  }
});

app.post('/users/login', async(req, res) => { //tested
  // logic to log in user
  const {username , password} = req.headers;
  const user = await Users.findOne({username,password});
  if(user){
    const token = jwt.sign({username,role:'user'},SECRET,{expiresIn:"1h"});
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.get('/users/courses',authorization, async(req, res) => { // tested
  // logic to list all courses  
  const courses = await Course.findOne({published:true});
  res.send({courses})
});
app.post('/users/courses/:courseId', authorization, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  console.log(course);
  if (course) {
    const user = await Users.findOne({ username: req.user.username });
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: 'Course purchased successfully' });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/users/purchasedCourses', authorization, async (req, res) => {
  const user = await Users.findOne({ username: req.user.username }).populate('purchasedCourses');
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: 'User not found' });
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
