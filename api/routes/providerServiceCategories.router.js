const express = require('express');
const providerServiceCategoriesController = require('../controllers/providerServiceCategories.controller');

var router = express.Router();

router.get('/', providerServiceCategoriesController.getProviderServiceCategories);
/**
 * @swagger
 * /provider-service-categories:
 *   get:
 *     summary: Retrieve all provider service categories
 *     tags: [Provider Service Categories]
 *     responses:
 *       200:
 *         description: A list of provider service categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "1"
 *                   state:
 *                     type: string
 *                     example: "0"
 *                   customer_id:
 *                     type: string
 *                     example: "1"
 *                   service_id:
 *                     type: string
 *                     example: "1"
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

router.post('/', providerServiceCategoriesController.addProviderServiceCategory);
/**
 * @swagger
 * /provider-service-categories:
 *   post:
 *     summary: Add a new provider service category
 *     tags: [Provider Service Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     example: "user@example.com"
 *               serviceCategory:
 *                 type: string
 *                 example: "1"
 *     responses:
 *       200:
 *         description: The created provider service category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "1"
 *                 state:
 *                   type: string
 *                   example: "0"
 *                 customer_id:
 *                   type: string
 *                   example: "1"
 *                 service_id:
 *                   type: string
 *                   example: "1"
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

router.put('/', providerServiceCategoriesController.modifyProviderServiceCategory);
/**
 * @swagger
 * /provider-service-categories:
 *   put:
 *     summary: Modify an existing provider service category
 *     tags: [Provider Service Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 example: "1"
 *               state:
 *                 type: string
 *                 example: "0"
 *               customer_id:
 *                 type: string
 *                 example: "1"
 *               service_id:
 *                 type: string
 *                 example: "1"
 *     responses:
 *       200:
 *         description: The modified provider service category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "1"
 *                 state:
 *                   type: string
 *                   example: "0"
 *                 customer_id:
 *                   type: string
 *                   example: "1"
 *                 service_id:
 *                   type: string
 *                   example: "1"
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

router.delete('/', providerServiceCategoriesController.deleteProviderServiceCategory);
/**
 * @swagger
 * /provider-service-categories:
 *   delete:
 *     summary: Delete a provider service category
 *     tags: [Provider Service Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 example: "1"
 *     responses:
 *       200:
 *         description: The deleted provider service category ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "1"
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
router.get('/provider-service-categories/customer/:customer_id', providerServiceCategoriesController.getProviderServiceCategoriesByCustomerId);
/**
 * @swagger
 * /provider-service-categories/customer/{customer_id}:
 *   get:
 *     summary: Retrieve provider service categories by customer ID
 *     tags: [Provider Service Categories]
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The customer ID
 *     responses:
 *       200:
 *         description: A list of provider service categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "1"
 *                   state:
 *                     type: string
 *                     example: "0"
 *                   customer_id:
 *                     type: string
 *                     example: "1"
 *                   service_id:
 *                     type: string
 *                     example: "1"
 *       500:
 *         description: Internal server error
 */

router.get('/provider-service-categories/customer/:customer_id/service/:service_id', providerServiceCategoriesController.getProviderServiceCategoriesByCustomerIdAndServiceID);
/**
 * @swagger
 * /provider-service-categories/customer/{customer_id}/service/{service_id}:
 *   get:
 *     summary: Retrieve a provider service category by customer ID and service ID
 *     tags: [Provider Service Categories]
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The customer ID
 *       - in: path
 *         name: service_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The service ID
 *     responses:
 *       200:
 *         description: A provider service category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "1"
 *                 state:
 *                   type: string
 *                   example: "0"
 *                 customer_id:
 *                   type: string
 *                   example: "1"
 *                 service_id:
 *                   type: string
 *                   example: "1"
 *       404:
 *         description: Provider service category not found
 *       500:
 *         description: Internal server error
 */

router.get('/provider-service-categories/customer-ids', providerServiceCategoriesController.getProviderServiceCategoriesCustomerId);
/**
 * @swagger
 * /provider-service-categories/customer-ids:
 *   get:
 *     summary: Retrieve distinct customer IDs from provider service categories
 *     tags: [Provider Service Categories]
 *     responses:
 *       200:
 *         description: A list of customer IDs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "1"
 *       500:
 *         description: Internal server error
 */

router.get('/provider-service-categories/provider-offering-services', providerServiceCategoriesController.getProviderOfferingServices);
/**
 * @swagger
 * /provider-service-categories/provider-offering-services:
 *   get:
 *     summary: Retrieve providers offering services
 *     tags: [Provider Service Categories]
 *     responses:
 *       200:
 *         description: A list of providers offering services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "1"
 *                   email:
 *                     type: string
 *                     example: "provider@example.com"
 *                   name:
 *                     type: string
 *                     example: "Provider Name"
 *       500:
 *         description: Internal server error
 */

module.exports = router;
