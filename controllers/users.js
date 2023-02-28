const { usersModel } = require('../models');

/**
 * Obtain lists from DB 
 * @param {*} req 
 * @param {*} res 
 */

const getItems = async (req, res) => {
    const data = await tracksModel.find({});
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

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };