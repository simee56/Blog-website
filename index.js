const express = require('express');
const path = require('path');
const connectMongoDB = require('./connection');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))


//connection
connectMongoDB("mongodb://127.0.0.1:27017/Blog").then(() =>
    console.log("MongoDb connected")
);


//Routes
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));    //this is for form data


app.use('/', staticRoute);                 // static router = frontend pages
app.use('/user', userRoute);

app.get('/', (req, res) => {
    res.render("home");
})


app.listen(PORT, () => {
    console.log(`SERVER HAS STARTED AT THE PORT ${PORT}`);
})