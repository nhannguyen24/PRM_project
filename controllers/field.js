const services = require('../services');
const {BadRequestError, InternalServerError} = require('../errors');
const joi = require('joi');
const {field_name, image, price, available_slot, center_id, field_type_id, field_ids, field_id} = require('../helpers/joi_schema');

const getAllFields = async (req, res) => {
    try {
        const response = await services.getAllFields(req.query);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
};

const createField = async (req, res) => {
    try {
        const { error } = joi.object({field_name, image, price, available_slot, center_id, field_type_id}).validate(req.body);
        if (error) {
            return res.status(400).json({msg: error.details[0].message});
        }
        const response = await services.createField(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
};


const updateField = async (req, res) => {
    try {
        const { error } = joi.object({field_id}).validate({field_id: req.body.field_id});
        if (error) throw new BadRequestError(error.details[0].message);
        const response = await services.updateField(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
};

const deleteField = async (req, res) => {
    try {
        const { error } = joi.object({field_ids}).validate(req.query);
        if (error) throw new BadRequestError(error.details[0].message);
        const response = await services.deleteField(req.query.field_ids);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
};

const getFieldById = async (req, res) => {
    try {
        const { id: field_id } = req.params;
        const response = await services.getFieldById(field_id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error.message);
    }
};

module.exports = {getAllFields, createField, deleteField, getFieldById, updateField};