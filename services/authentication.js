const JWT = require("jsonwebtoken");
const secretKey = "#Bittu&$Ch**";

function createToken(user) {
    const payload = {
        _id :user._id,
        email : user.email,
        profilePicURL :user.profilePicURL,
        role : user.role
    };

    const token = JWT.sign(payload, secretKey);
    return token;
}

function validateToken(token) {
    const payload = JWT.verify(token, secretKey);
    return payload;
}

module.exports = {
    createToken,
    validateToken
}