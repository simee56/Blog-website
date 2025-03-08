const express = require("express");
const router = express.Router();

const { handleComment } = require('../controllers/comment');

router.post("/comment/:blogId", handleComment);

module.exports = router;