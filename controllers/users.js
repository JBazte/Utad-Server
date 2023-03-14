const { usersModel } = require('../models');
const { matchedData } = require('express-validator');
const { handleHttpError } = require("../utils/handleError");

/**
 * Obtain lists from DB 
 * @param {*} req 
 * @param {*} res 
 */

const getItems = async (req, res) => {
    const data = await usersModel.find({});
    res.send(data)
}

/**
 * Obtain a detail from DB
 * @param {} req 
 * @param {*} res 
 */

const getItem = (req, res) => { }

/**
 * Insert a registry to DB
 * @param {*} req 
 * @param {*} res 
 */

const createItem = async (req, res) => {
    const { body } = req;
    const data = await usersModel.create(body);
    res.send(data)
}

/**
 * Update a registry from DB
 * @param {*} req 
 * @param {*} res 
 */

const updateItem = (req, res) => { }

/**
 * Delete a registry from DB
 * @param {*} req 
 * @param {*} res 
 */

const deleteItem = (req, res) => { }

/**
 * Update a user role to admin from DB
 * @param {*} req 
 * @param {*} res 
 */

const updateAdminItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await usersModel.findById(id);
        if (!data) {
            handleHttpError(res, 'ERROR_USER_NOT_FOUND', 404);
        } else {
            data.role = "admin";
            const user = await usersModel.updateOne({ "_id": id }, data);
            res.send(user);
        }
    } catch (err) {
        handleHttpError(res, 'ERROR_UPDATE_USER', 403);
    }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem, updateAdminItem };