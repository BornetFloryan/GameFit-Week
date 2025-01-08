const express = require("express");
const providerRequestsController = require("../controllers/providerRequests.controller");

const router = express.Router();

router.get("/", providerRequestsController.getProviderRequests);
/**
 * @swagger
 * /provider-requests:
 *   get:
 *     summary: Retrieve all provider requests
 *     tags: [Provider Requests]
 *     responses:
 *       200:
 *         description: A list of provider requests
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
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-01-01T00:00:00.000Z"
 *                   customer_id:
 *                     type: integer
 *                     example: 1
 *                   state:
 *                     type: string
 *                     example: "0"
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

router.post("/", providerRequestsController.addProviderRequest);
/**
 * @swagger
 * /provider-requests:
 *   post:
 *     summary: Add a new provider request
 *     tags: [Provider Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "provider@example.com"
 *               name:
 *                 type: string
 *                 example: "Provider Name"
 *               prestationServices:
 *                 type: string
 *                 example: "0"
 *               login:
 *                 type: string
 *                 example: "providerlogin"
 *               password:
 *                 type: string
 *                 example: "providerpassword"
 *     responses:
 *       201:
 *         description: Provider request added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   example: 0
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "0"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-01-01T00:00:00.000Z"
 *                     customer_id:
 *                       type: integer
 *                       example: 1
 *                     state:
 *                       type: string
 *                       example: "0"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input"
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

router.put("/", providerRequestsController.modifyProviderRequest);
/**
 * @swagger
 * /provider-requests:
 *   put:
 *     summary: Modify a provider request
 *     tags: [Provider Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 example: "0"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-01-01T00:00:00.000Z"
 *               customer_id:
 *                 type: integer
 *                 example: 1
 *               state:
 *                 type: string
 *                 example: "0"
 *     responses:
 *       200:
 *         description: Provider request modified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   example: 0
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "0"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-01-01T00:00:00.000Z"
 *                     customer_id:
 *                       type: integer
 *                       example: 1
 *                     state:
 *                       type: string
 *                       example: "0"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input"
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

router.delete("/", providerRequestsController.deleteProviderRequest);
/**
 * @swagger
 * /provider-requests:
 *   delete:
 *     summary: Delete a provider request
 *     tags: [Provider Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 example: "0"
 *     responses:
 *       200:
 *         description: Provider request deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   example: 0
 *                 data:
 *                   type: string
 *                   example: "0"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input"
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

router.get("/:id", providerRequestsController.getProviderRequestById);
/**
 * @swagger
 * /provider-requests/{id}:
 *   get:
 *     summary: Retrieve a provider request by ID
 *     tags: [Provider Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "0"
 *         description: The provider request ID
 *     responses:
 *       200:
 *         description: A provider request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "0"
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-01-01T00:00:00.000Z"
 *                 customer_id:
 *                   type: integer
 *                   example: 1
 *                 state:
 *                   type: string
 *                   example: "0"
 *       404:
 *         description: Provider request not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Provider request not found"
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

router.get("/customer/:customer_id", providerRequestsController.getProviderRequestsByCustomerId);
/**
 * @swagger
 * /provider-requests/customer/{customer_id}:
 *   get:
 *     summary: Retrieve provider requests by customer ID
 *     tags: [Provider Requests]
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *         description: The customer ID
 *     responses:
 *       200:
 *         description: A list of provider requests
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
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-10-29T23:00:00.000Z"
 *                   customer_id:
 *                     type: integer
 *                     example: 4
 *                   state:
 *                     type: string
 *                     example: "1"
 *       404:
 *         description: No provider requests found for this customer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No provider requests found for this customer"
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

module.exports = router;