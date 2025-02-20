const { Schema, model } = require('mongoose');
const { createHmac, randomBytes } = require('crypto');

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {      //Salt is a random string.
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicURL: {
        type: String,
        default: "./images/image.png"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },
},
    { timestamps: true }
);

userSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified("password"))
        return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

    this.salt = salt;
    this.passowrd = hashedPassword;

    next();
})


userSchema.static("matchPassword", async function (email, password) {
    const user = await this.findOne({ email });

    if (!user)
       throw new Error("User is not found!");

    const salt = user.salt;
    const hashedPassword = user.passowrd;

    const userProvideHash = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

        if(hashedPassword===userProvideHash)
            throw new Error("Incorrect Password");

    return user;
})





const User = model("user", userSchema);

module.exports = User;
