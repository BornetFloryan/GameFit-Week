const express = require('express');
const serviceCategoriesController = require('../controllers/serviceCategories.controller');

var router = express.Router();

router.get('/', serviceCategoriesController.getServiceCategories);
/**
 * @swagger
 * /service-categories:
 *   get:
 *     summary: Retrieve all service categories
 *     tags: [Service Categories]
 *     responses:
 *       200:
 *         description: A list of service categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "0"
 *                   name:
 *                     type: string
 *                     example: "Dédicaces"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Server error"
 */

router.get('/:id', serviceCategoriesController.getServiceCategoryById);
/**
 * @swagger
 * /service-categories/{id}:
 *   get:
 *     summary: Retrieve a service category by ID
 *     tags: [Service Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "0"
 *         description: The service category ID
 *     responses:
 *       200:
 *         description: A service category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "1"
 *                 name:
 *                   type: string
 *                   example: "Cleaning"
 *       404:
 *         description: Service category not found
 *       500:
 *         description: Internal server error
 */


module.exports = router;