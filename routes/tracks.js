const express = require("express");
const router = express.Router();
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/tracks.js");
const { validatorCreateItem, validatorGetItem } = require("../validators/tracks.js");
const authMiddleware = require("../middleware/session.js");
const checkRol = require("../middleware/role.js");

router.get("/", authMiddleware, getItems);

router.get("/:id", validatorGetItem, getItem);

router.post("/", authMiddleware, checkRol(["admin"]), validatorCreateItem, createItem);

router.put("/:id", validatorCreateItem, updateItem);

router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;