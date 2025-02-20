const User = require("../models/user");

async function handleUserSignUp(req, res) {
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect('/');
};

async function handleUserSignIn(req, res) {
    const { email, password } = req.body;
    const user = await User.matchPassword(email, password);

    console.log("USer", user);
    return res.redirect('/');
};


module.exports = {
    handleUserSignUp,
    handleUserSignIn
}