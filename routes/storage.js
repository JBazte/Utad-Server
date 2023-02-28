const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage.js");
const { createItem } = require("../controllers/storage.js")

router.post("/", uploadMiddleware.single("image"), createItem);

module.exports = router;