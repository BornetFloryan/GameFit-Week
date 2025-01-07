const express = require("express");
const sportsCategoriesController = require("../controllers/sportsCategories.controller");


const router = express.Router();

router.get("/", sportsCategoriesController.getSportsCategories);
/**
 * @swagger
 * /sports-categories:
 *   get:
 *     summary: Retrieve all sports categories
 *     tags: [Sports Categories]
 *     responses:
 *       200:
 *         description: A list of sports categories
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
 *                     example: "Football"
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