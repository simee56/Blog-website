const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

//MIDDLEWARES
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))

app.get('/', (req,res)=> {
    res.render("home")
})
app.listen(PORT, () => {
    console.log(`SERVER HAS STARTED AT THE PORT ${PORT}`);
})