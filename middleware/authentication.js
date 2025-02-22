const { validateToken } = require('../services/authentication');

//GENERIC MIDDLEWARE - verify the token at every request.

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];

        if (!tokenCookieValue) {
            next();
        };

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        }
        catch (error) { }
        next();
    }
}

module.exports = checkForAuthenticationCookie;