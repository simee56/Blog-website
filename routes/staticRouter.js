const router = require('../routes/user');

router.get("/signin", (req, res) => {
    return res.render("Signin")
});

router.get("/signup", (req, res) => {
    return res.render("Signup")
});