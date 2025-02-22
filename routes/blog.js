const express = require("express");
const router = express.Router();

const { handleBlogRoute } = require('../controllers/blog');

router.get('/addnewblog', handleBlogRoute);


router.post('/', (req,res) => {
    console.log(req.body);
    return res.redirect('/')
})
module.exports = router;