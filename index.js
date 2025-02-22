const express = require('express');
const path = require('path');
const connectMongoDB = require('./connection');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

//SETTING UP VIEW ENGINE 
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))


//CONNECTING MONGODB
connectMongoDB("mongodb://127.0.0.1:27017/Blog").then(() =>
    console.log("MongoDb connected")
);


//ROUTES
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');
const checkForAuthenticationCookie = require('./middleware/authentication');


// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));    //this is for form data
app.use(checkForAuthenticationCookie("token"))
app.use(cookieParser());

app.use('/', staticRoute);                 // static router = frontend pages
app.use('/user', userRoute);


app.get('/', (req, res) => {
    res.render("home", {
        user :req.user,
    });
})

app.listen(PORT, () => {
    console.log(`SERVER HAS STARTED AT THE PORT ${PORT}`);
})
