const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
    "users",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.ENUM,
            values: ["user", "admin"],
            defaultValue: "user"
        }
    },
    {
        timestamps: true
    }
);

module.exports = User;