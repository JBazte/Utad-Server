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

const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        var data = "";
        if (process.env.ENGINE_DB === 'nosql') {
            data = await usersModel.deleteOne({ _id: id });
        } else {
            data = await usersModel.destroy({ where: { id: id } });
        }
        res.send(data);
    } catch (err) {
        console.log(err)
        handleHttpError(res, 'ERROR_DELETE_USER');
    }
}

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