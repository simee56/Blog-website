const express = require("express");
const router = express.Router();

const {handleUserSignUp, handleUserSignIn, handleUserLogout} = require('../controllers/user')

router.get("/signup", (req, res) => {
     res.render("signup")
});
router.post('/signup', handleUserSignUp);


router.get("/signin", (req, res) => {
     res.render("signin")
});
router.post('/signin', handleUserSignIn);

router.get('/logout',handleUserLogout);

module.exports = router;