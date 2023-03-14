const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/mongo.js");
const morganBody = require("morgan-body");
require('dotenv').config();
const loggerStream = require("./utils/handleLogger.js");


const app = express();
const port = process.env.PORT || 3000;

morganBody(app, {
    noColors: true,
    skip: function (req, res) {
        return res.statusCode < 400
    },
    stream: loggerStream
})

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));
app.use("/api", require("./routes")); // reads routes/index.js by default

app.listen(port, () => {
    console.log("Server listening on port " + port);
    dbConnect();
});