const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

var validatorCreateItem = [];

if (process.env.ENGINE_DB === "nosql") {
    validatorCreateItem = [
        check("name").exists().notEmpty(),
        check("album").exists().notEmpty(),
        check("cover").exists().notEmpty(),
        check("artist").exists().notEmpty(),
        check("artist.name").exists().notEmpty(),
        check("artist.nickname").exists().notEmpty(),
        check("artist.nationality").exists().notEmpty(),
        check("duration.start").exists().notEmpty().isInt(),
        check("duration.end").exists().notEmpty().isInt(),
        check("mediaId").exists().notEmpty(),
        (req, res, next) => validateResults(req, res, next)
    ];
} else {
    validatorCreateItem = [
        check("name").exists().notEmpty(),
        check("album").exists().notEmpty(),
        check("cover").exists().notEmpty(),
        check("artist_name").exists().notEmpty(),
        check("artist_nickname").exists().notEmpty(),
        check("artist_nationality").exists().notEmpty(),
        check("duration_start").exists().notEmpty().isInt(),
        check("duration_end").exists().notEmpty().isInt(),
        check("mediaId").exists().notEmpty(),
        (req, res, next) => validateResults(req, res, next)
    ];
}

const validatorGetItem = [
    check("id").exists().notEmpty(),
    (req, res, next) => validateResults(req, res, next)
];

const validatorUpdateUser = [
    check("id").exists().notEmpty(),
    (req, res, next) => validateResults(req, res, next)
];

module.exports = { validatorCreateItem, validatorGetItem, validatorUpdateUser }