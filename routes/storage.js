const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage.js");
const { getItems, getItem, createItem, deleteItem } = require("../controllers/storage.js");
const { validatorGetItem } = require('../validators/storage.js');

router.get("/", getItems);

router.get("/:id", validatorGetItem, getItem);

router.post("/", uploadMiddleware.single("image"), createItem);

router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;