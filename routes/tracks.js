const express = require("express");
const router = express.Router();
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/tracks.js");
const { validatorCreateItem } = require("../validators/tracks.js");
const customHeader = require("../middleware/customHeader.js");

router.get("/", getItems);

router.get("/:id", getItem);

router.post("/", validatorCreateItem, customHeader, createItem);

router.put("/:id", validatorCreateItem, updateItem);

router.delete("/:id", deleteItem);

module.exports = router;