const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const StorageSchema = new mongoose.Schema(
    {
        url: {
            type: String
        },
        filename: {
            type: String
        }
    },
    {
        timestamp: true,
        versionKey: false
    }
)

StorageSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("storages", StorageSchema);