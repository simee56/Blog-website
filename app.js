require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const {checkForAuthenticationCookie } = require('./middleware/authentication');

const Blog = require('./models/blog');
const app = express();
const PORT = process.env.PORT || 3000; // it as and environment variable for cloud service 

//SETTING UP VIEW ENGINES
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))


//CONNECTING MONGODB
mongoose
.connect(process.env.MONGO_URL)
.then((e) => console.log("MongoDb COnnected"));



// MIDDLEWARESS
app.use(express.urlencoded({ extended: false }));    //this is for form data
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));


//ROUTES
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const commentRoute = require('./routes/comments');

app.use('/user', userRoute);
app.use('/blog', blogRoute);
app.use('/comment',commentRoute);


//RENDERING  HOME PAGE
app.get('/', async(req, res) => {
    const allBlogs = await Blog.find({})
    res.render("home", {
        user :req.user,
        blogs : allBlogs,
    });
});

app.listen(PORT, () => {
    console.log(`SERVER HAS STARTED AT THE PORT ${PORT}`);
});
