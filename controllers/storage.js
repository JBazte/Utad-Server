const { storageModel } = require('../models');
const { handleHttpError } = require('../utils/handleError')
const { matchedData } = require('express-validator')
const fs = require("fs")
const MEDIA_PATH = __dirname + "/../storage"

/**
 * Obtain lists from DB 
 * @param {*} req 
 * @param {*} res 
 */

const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({})
        res.send(data)
    } catch (err) {
        handleHttpError(res, 'ERROR_LIST_ITEMS')
    }
}

/**
 * Obtain a detail from DB
 * @param {} req 
 * @param {*} res 
 */

const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await storageModel.findById(id);
        if (!data) {
            handleHttpError(res, 'ERROR_ITEM_NOT_FOUND', 404);
        } else {
            res.send(data);
        }
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEM', 403);
    }
}

/**
 * Insert a registry to DB
 * @param {*} req 
 * @param {*} res 
 */

const createItem = async (req, res) => {
    const { body, file } = req;
    const fileData = {
        filename: file.filename,
        url: process.env.PUBLIC_URL + "/" + file.filename
    };
    const data = await storageModel.create(fileData);
    res.send(data);
}

/**
 * Delete a registry from DB
 * @param {*} req 
 * @param {*} res 
 */

const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const dataFile = await storageModel.findById(id);
        if (!dataFile) {
            handleHttpError(res, 'ERROR_ITEM_NOT_FOUND', 404);
        } else {
            await storageModel.deleteOne({ _id: id });
            const filePath = MEDIA_PATH + "/" + dataFile.filename;
            fs.unlinkSync(filePath);
            const data = {
                filePath,
                deleted: true
            }
            res.send(data);
        }
    } catch (err) {
        handleHttpError(res, "ERROR_GET_ITEM");
    }
}

module.exports = { getItems, getItem, createItem, deleteItem };