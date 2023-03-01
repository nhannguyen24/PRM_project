const controllers = require('../controllers');
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verify_token');

/**
 * @swagger
 * components:
 *   schemas:
 *     User-login:
 *       type: object
 *       properties:
 *         email:
 *           type: String
 *           description: User email
 *         password:
 *           type: String
 *           description: User password
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User-register:
 *       type: object
 *       properties:
 *         email:
 *           type: String
 *           description: User email
 *         password:
 *           type: String
 *           description: User password
 *         address:
 *           type: String
 *           description: User address
 *         phone:
 *           type: String
 *           description: User phone
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: For login 
 *     tags: [auth-controller]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User-login'
 *            example:
 *              email: dnhan2426@gmail.com
 *              password: "123456"
 *     responses:
 *       200:
 *         description: For login 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.post('/login', controllers.login);

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: For register new account
 *     tags: [auth-controller]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User-register'
 *            example:
 *              email: dnhan2426@gmail.com
 *              password: "123456" 
 *              address: 1/1 D5 Q.9 
 *              phone: "1234567890"
 *     responses:
 *       200:
 *         description: For register new account
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.post('/register', controllers.register);

module.exports = router;
