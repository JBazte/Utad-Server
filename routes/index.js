const express = require("express");
const fs = require("fs");
const router = express.Router();
const { getItems, getItem, createItem } = require('../controllers/tracks.js');
const removeExtension = (fileName) => {
    return fileName.split('.').shift();
}

fs.readdirSync(__dirname).filter((file) => {
    const name = removeExtension(file); // index, users, storage, tracks
    if (name !== 'index') {
        // Example: http://localhost:3000/api/tracks
        router.use('/' + name, require('./' + name));
    }
});

router.get("/", getItems);

router.get("/:id", getItem);

router.post("/", createItem);

module.exports = router;