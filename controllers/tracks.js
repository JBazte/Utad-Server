const { tracksModel } = require('../models');
const { matchedData } = require('express-validator');
const { handleHttpError } = require('../utils/handleError');

/**
 * Obtain lists from DB 
 * @param {*} req 
 * @param {*} res 
 */

const getItems = async (req, res) => {
    try {
        var data;
        if (process.env.ENGINE_DB === 'nosql') {
            data = await tracksModel.find();
        } else {
            data = await tracksModel.findAll();
        }
        if (!data) {
            handleHttpError(res, 'ERROR_ITEMS_NOT_FOUND', 404);
        } else {
            res.send({ data });
        }
    } catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR_GET_ITEMS', 403);
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
        const data = await tracksModel.findOneData(id)
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
    try {
        const body = matchedData(req);
        const data = await tracksModel.create(body);
        if (!data) {
            handleHttpError(res, 'ERROR_ITEM_NOT_CREATED', 500);
        } else {
            res.send(data);
        }
    } catch (err) {
        handleHttpError(res, 'ERROR_CREATE_ITEM', 403);
    }
}

/**
 * Update a registry from DB
 * @param {*} req 
 * @param {*} res 
 */

const updateItem = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);
        const data = await tracksModel.findOneAndUpdate(id, body);
        if (!data) {
            handleHttpError(res, 'ERROR_ITEM_NOT_FOUND', 404);
        } else {
            res.send(data);
        }
    } catch (err) {
        handleHttpError(res, 'ERROR_UPDATE_ITEM', 403);
    }
}

/**
 * Delete a registry from DB
 * @param {*} req 
 * @param {*} res 
 */

const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await tracksModel.delete({ _id: id });
        if (!data) {
            handleHttpError(res, 'ERROR_ITEM_NOT_FOUND', 404);
        } else {
            res.send(data);
        }
    } catch (err) {
        handleHttpError(res, 'ERROR_DELETE_ITEM', 403);
    }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };