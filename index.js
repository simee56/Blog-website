const express = require('express');
const path = require('path');
const connectMongoDB = require('./connection');
const cookieParser = require('cookie-parser');
const {checkForAuthenticationCookie } = require('./middleware/authentication');

const app = express();
const PORT = 3000;

//SETTING UP VIEW ENGINE 
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))


//CONNECTING MONGODB
connectMongoDB("mongodb://127.0.0.1:27017/Blog").then(() =>
    console.log("MongoDb connected")
);

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));    //this is for form data
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));


//ROUTES
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');

app.use('/user', userRoute);
app.use('/blog', blogRoute);


app.get('/', (req, res) => {
    res.render("home", {
        user :req.user,
    });
})

app.listen(PORT, () => {
    console.log(`SERVER HAS STARTED AT THE PORT ${PORT}`);
})
