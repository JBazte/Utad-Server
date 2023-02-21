const mongoose = require('mongoose');

const dbConnect = () => {
    const db_uri = process.env.DB_URI
    mongoose.set('strictQuery', false);
    mongoose.connect(db_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, res) => {
        if (!err) {
            console.log("Successful connection to DB!");
        } else {
            console.error("Failed connection to DB!\nError: " + err);
        }
    });
}

module.exports = dbConnect;