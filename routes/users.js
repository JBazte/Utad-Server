const express = require("express");
const router = express.Router();
const { getItems, getItem, createItem, updateItem, deleteItem, updateAdminItem } = require("../controllers/users.js");
const { validatorUpdateAdminItem } = require("../validators/users.js");
const authMiddleware = require("../middleware/session.js");
const checkRol = require("../middleware/role.js");
const { validatorGetItem } = require("../validators/storage.js");

/**
 * @openapi
 * /api/auth/users:
 *  get:
 *      tags:
 *      - User
 *      summary: Get users in DB
 *      description: ''
 *      responses:
 *          '200':
 *              description: Returns all the users
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/", getItems);

router.get("/:id", getItem);

router.post("/", createItem);

router.put("/:id", updateItem);

/**
 * @openapi
 * /api/auth/update/{id}:
 *  put:
 *      tags:
 *      - User
 *      summary: Update a user
 *      description: Update a user by an admin
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id that need to be updated
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.put("/admin/:id", authMiddleware, checkRol(["admin"]), validatorUpdateAdminItem, updateAdminItem);

router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;