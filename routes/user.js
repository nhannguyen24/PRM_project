const controllers = require('../controllers');
const express = require('express');
const verifyToken = require('../middlewares/verify_token');
const verifyRole = require('../middlewares/verify_role');

const router = express.Router();

router.use(verifyToken);
router.use(verifyRole);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         student_id:
 *           type: UUID
 *           description: The auto-generated id of the student
 *         student_name:
 *           type: string
 *           description: The student name
 *         email:
 *           type: string
 *           description: The student email
 *         avatar:
 *           type: string
 *           description: The student avatar
 *         status:
 *           type: enum
 *           description: The student status('active', 'deactive')
 *       example:
 *         student_id: V2sSC1HSLASNtTT0RhzwqDxxwri2
 *         student_name: Nhan Nguyen
 *         email: dnhan2426@gmail.com
 *         avatar: https://lh3.googleusercontent.com/a/AEdFTp4508ZdzGjVRFFIwb0ULZXYm5V5_vyRsiKq-cfA=s96-c
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns the list of all the users paging
 *     tags: [user-controller]
 *     parameters:
 *       - name: user_name
 *         in: query
 *         schema:
 *           type: string
 *         description: Find users by user_name
 *       - name: page
 *         in: query
 *         schema:
 *           type: int
 *         description: Paging page number
 *       - name: limit
 *         in: query
 *         schema:
 *           type: int
 *         description: Paging limit row to get in 1 page
 *       - name: order[0]
 *         in: query
 *         schema:
 *           type: string
 *         description: Sort by (user_name/createdAt)
 *       - name: order[1]
 *         in: query
 *         schema:
 *           type: string
 *         description: Sort ASC/DESC
 *     responses:
 *       200:
 *         description: For get the list of the users paging
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", controllers.getAllUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns the the users by id
 *     tags: [user-controller]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         description: Find user by user_id
 *     responses:
 *       200:
 *         description: For get the users by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/:id", controllers.getUserById);

/**
 * @swagger
 * /api/v1/users:
 *   put:
 *     security: 
 *         - BearerAuth: []
 *     summary: Update the user by id
 *     tags: [user-controller]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *            example:
 *              user_id: eade5e05-c27e-4fc8-96f2-50af09b7924d
 *              user_name: Nhan Nguyen
 *              avatar: https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png
 *              address: 1/2 D2 Q.9
 *              phone: "123456789"
 *              role_id: bd86e723-a2d5-47f5-87f2-9a4bc6fe8bb2
 *              status: Active
 *     responses:
 *       200:
 *         description: For get the list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.put("/", controllers.updateUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     security: 
 *         - BearerAuth: []
 *     summary: Delete the users by id
 *     tags: [user-controller]
 *     parameters:
 *       - name: user_ids[0]
 *         in: query
 *         schema:
 *           type: string
 *         description: Input user_id to delete
 *     responses:
 *       200:
 *         description: Delete the user by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.put("/:id", controllers.deleteUser);

module.exports = router;
