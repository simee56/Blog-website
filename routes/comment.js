const express = require("express");
const router = express.Router();

const Comment = require('../models/comments');

const { handleComment } = require('../controllers/comment');

router.post("/comment/:blogId", handleComment);

module.exports = router;