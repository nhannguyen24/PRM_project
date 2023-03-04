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
 *     Field:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         field_id:
 *           type: UUID
 *           description: The auto-generated id of the field
 *         field_name:
 *           type: string
 *           description: The field name
 *         available_slot:
 *           type: string
 *           description: The field's available slots
 *         image:
 *           type: string
 *           description: The field image
 *         price:
 *           type: number
 *           description: The field price
 *         status:
 *           type: enum
 *           description: The field status('active', 'deactive')
 *       example:
 *         field_id: fd6c5592-b6e3-4cbe-9348-62c0895c756a
 *         field_name: San Thong Nhat
 *         email: dnhan2426@gmail.com
 *         image: https://foba.vn/wp-content/uploads/2020/09/san-my-dinh-1.png
 *         price: 10000
 *         available_slot: 12:00
 */

/**
 * @swagger
 * /api/v1/fields:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns the list of all the fields paging
 *     tags: [field-controller]
 *     parameters:
 *       - name: field_name
 *         in: query
 *         schema:
 *           type: string
 *         description: Find fields by field_name
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
 *         description: Sort by (field_name/createdAt)
 *       - name: order[1]
 *         in: query
 *         schema:
 *           type: string
 *         description: Sort ASC/DESC
 *     responses:
 *       200:
 *         description: For get the list of the fields paging
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Field'
 */
router.get("/", controllers.getAllFields);

/**
 * @swagger
 * /api/v1/fields:
 *   post:
 *     security: 
 *         - BearerAuth: []
 *     summary: Create new field
 *     tags: [field-controller]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Field'
 *            example:
 *              field_name: San Thong Nhat
 *              image: https://foba.vn/wp-content/uploads/2020/09/san-my-dinh-1.png
 *              price: 10000
 *              available_slot: 12:00
 *              center_id: 242ca34e-5d87-4b2e-9788-31f1093d854d
 *              field_type_id: ebed2914-cfa2-4f64-8e16-a2f0aef551e1
 *     responses:
 *       200:
 *         description: Create new field successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Field'

 */
router.post("/", controllers.createField);


/**
 * @swagger
 * /api/v1/fields:
 *   put:
 *     security: 
 *         - BearerAuth: []
 *     summary: Update the field by id
 *     tags: [field-controller]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Field'
 *            example:
 *              field_id: fd6c5592-b6e3-4cbe-9348-62c0895c756a
 *              field_name: San Thong Nhat
 *              image: https://foba.vn/wp-content/uploads/2020/09/san-my-dinh-1.png
 *              price: 10000
 *              available_slot: 12:00
 *              center_id: 242ca34e-5d87-4b2e-9788-31f1093d854d
 *              field_type_id: ebed2914-cfa2-4f64-8e16-a2f0aef551e1
 *              status: Active
 *     responses:
 *       200:
 *         description: For update field
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Field'
 */
router.put("/", controllers.updateField);

/**
 * @swagger
 * /api/v1/fields/{id}:
 *   put:
 *     security: 
 *         - BearerAuth: []
 *     summary: Delete the fields by id
 *     tags: [field-controller]
 *     parameters:
 *       - name: field_ids[0]
 *         in: query
 *         schema:
 *           type: string
 *         description: Input field_id to delete
 *     responses:
 *       200:
 *         description: Delete the field by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Field'
 */
router.put("/:id", controllers.deleteField);

/**
 * @swagger
 * /api/v1/fields/{id}:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns the the field by id
 *     tags: [field-controller]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         description: Find field by student_id
 *     responses:
 *       200:
 *         description: For get the field by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Field'
 */
router.get("/:id", controllers.getFieldById);

module.exports = router;
