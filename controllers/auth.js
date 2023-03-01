const services = require('../services');
const {BadRequestError, InternalServerError} = require('../errors');

const register = async (req, res) => {
    try {
        const {email: email, password: password, address: address, phone: phone} = req.body;
        if(!email) {
            throw new BadRequestError('Please provide email');
        }
        if(!password) {
            throw new BadRequestError('Please provide password');
        }
        if(!address) {
            throw new BadRequestError('Please provide password');
        }
        if(!phone) {
            throw new BadRequestError('Please provide password');
        }
        const response = await services.register(req.body)
        return res.status(200).json(response)

    } catch (error) {
        throw new InternalServerError(error);
    }
}
const login = async (req, res) => {
    try {
        const {email: email, password: password} = req.body;
        if(!email) {
            throw new BadRequestError('Please provide email');
        }
        if(!password) {
            throw new BadRequestError('Please provide password');
        }
        const response = await services.login(req.body)
        return res.status(200).json(response)
    } catch (error) {
        throw new InternalServerError(error);
    }
}

module.exports = {login, register};
