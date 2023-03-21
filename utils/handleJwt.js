const jwt = require("jsonwebtoken");
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Method to sign a JSON Web Token (JWT) for a given user.
 * @param {*} user - The user object that the token will be signed for.
 * @returns {string} - The signed JWT token.
 */

const tokenSign = (user) => {
    const sign = jwt.sign(
        {
            [propertiesKey.id]: user[propertiesKey.id],
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );
    return sign;
}

/**
 * Method to verify the validity of a given JWT token.
 * @param {string} tokenJwt - The JWT token to verify.
 * @returns {*} - If the token is valid, returns the decoded token payload object. Otherwise, returns undefined.
*/

const verifyToken = (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET);
    } catch (err) {
        console.log(err);
    }
}

module.exports = { tokenSign, verifyToken }