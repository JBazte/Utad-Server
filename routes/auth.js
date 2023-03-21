const express = require("express");
const { validatorRegister, validatorLogin } = require("../validators/auth.js");
const { registerCtrl, loginCtrl } = require("../controllers/auth.js");
const router = express.Router();

/**
 * @openapi
 * /api/auth/register:
 *  post:
 *      tags:
 *      - User
 *      summary: User register
 *      description: Register a new user
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/user"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */
router.post("/register", validatorRegister, registerCtrl);

/**
 * @openapi
 * /api/auth/login:
 *  post:
 *      tags:
 *      - User
 *      summary: Login user
 *      description: ''
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/login"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */
router.post("/login", validatorLogin, loginCtrl);

module.exports = router;