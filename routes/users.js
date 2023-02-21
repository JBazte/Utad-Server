const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const data = ["Hello", "world", "users"];
    res.send({ data });
});

module.exports = router;