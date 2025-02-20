const express = require('express');
const router = express.Router();

router.get("/signin", (req, res) => {
    return res.render("Signin")
});

router.get("/signup", (req, res) => {
    return res.render("Signup")
});

module.exports = router;