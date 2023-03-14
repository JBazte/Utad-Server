const express = require("express");
const router = express.Router();
const { getItems, getItem, createItem, updateItem, deleteItem, updateAdminItem } = require("../controllers/users.js");
const { validatorUpdateAdminItem } = require("../validators/users.js");
const authMiddleware = require("../middleware/session.js");
const checkRol = require("../middleware/role.js");

router.get("/", getItems);

router.get("/:id", getItem);

router.post("/", createItem);

router.put("/:id", updateItem);

router.put("/admin/:id", authMiddleware, checkRol(["admin"]), validatorUpdateAdminItem, updateAdminItem);

router.delete("/:id", deleteItem);

module.exports = router;