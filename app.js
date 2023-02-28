const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/mongo.js')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));
app.use("/api", require("./routes")); // reads routes/index.js by default

app.listen(port, () => {
    console.log("Server listening on port " + port);
    dbConnect();
});