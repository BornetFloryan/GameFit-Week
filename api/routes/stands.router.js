const express = require("express");
const standsController = require("../controllers/stands.controller");

var router = express.Router();

router.get("/", standsController.getStands);
/**
 * @swagger
 * /stands:
 *   get:
 *     summary: Retrieve all stands
 *     tags: [Stands]
 *     responses:
 *       200:
 *         description: A list of stands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Stand Name"
 *                   description:
 *                     type: string
 *                     example: "Description of the stand"
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 100.0
 *                   customer_id:
 *                     type: integer
 *                     example: 1
 *                   pavillon_id:
 *                     type: integer
 *                     example: 1
 *       500:
 *         description: Internal server error
 */

module.exports = router;