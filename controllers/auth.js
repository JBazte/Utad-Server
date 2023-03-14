const { matchedData } = require("express-validator");
const { tokenSign } = require("../utils/handleJwt");
const { encrypt, compare } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleError");
const { usersModel } = require("../models");

/**
 * Controller method to handle user registration.
 * @param {*} req - The request object.
 * @param {*} res - The response object.
*/

const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = { ...req, password }
        const dataUser = await usersModel.create(body);
        if (!dataUser) {
            handleHttpError(res, 'ERROR_USER_NOT_CREATED', 500);
        } else {
            dataUser.set('password', undefined, { strict: false });
            const data = {
                token: await tokenSign(dataUser),
                user: dataUser
            }
            res.send(data);
        }
    } catch (err) {
        handleHttpError(res, "ERROR_REGISTER_USER");
    }
}

/**
 * Controller method to handle user login.
 * @param {*} req - The request object.
 * @param {*} res - The response object.
*/

const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const user = await usersModel.findOne({ email: req.email }).select("password name role email");

        if (!user) {
            handleHttpError(res, "USER_NOT_EXISTS", 404);
            return
        }

        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword);

        if (!check) {
            handleHttpError(res, "INVALID_PASSWORD", 401);
            return
        }

        user.set('password', undefined, { strict: false });
        const data = {
            token: await tokenSign(user),
            user
        };
        res.send(data);
    } catch (err) {
        handleHttpError(res, "ERROR_LOGIN_USER");
    }
}

module.exports = { registerCtrl, loginCtrl }