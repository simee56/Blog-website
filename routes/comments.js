const express = require("express");
const router = express.Router();

const {handleComments} = require("../controllers/comments");

router.post('/comment/:blogId',handleComments)

module.exports = router;