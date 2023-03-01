const services = require('../services');
const {BadRequestError, InternalServerError} = require('../errors');
const joi = require('joi');
const {user_id, user_ids, user_name, email, avatar, role_id, major_id} = require('../helpers/joi_schema');

const getAllUser = async (req, res) => {
    try {
        const response = await services.getAllUser(req.query);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
};

const updateUser = async (req, res) => {
    try {
        const { error } = joi.object({user_id}).validate({user_id: req.body.user_id});
        if (error) throw new BadRequestError(error.details[0].message);
        const response = await services.updateUser(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { error } = joi.object({user_ids}).validate(req.query);
        if (error) throw new BadRequestError(error.details[0].message);
        const response = await services.deleteUser(req.query.user_ids);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
};

const getUserById = async (req, res) => {
    try {
        const { id: user_id } = req.params;
        const response = await services.getUserById(user_id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error.message);
    }
};

module.exports = {getAllUser, updateUser, deleteUser, getUserById};