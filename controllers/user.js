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
    try {
        const token = await User.matchPasswordAndCreateToken(email, password);

        console.log("token", token);
        return res.cookie("token", token).redirect('/');
    } 
    catch (error) {
        return res.render("signin", {
            error: "Incorrect Email or Password",
        });
    }
};


module.exports = {
    handleUserSignUp,
    handleUserSignIn
}