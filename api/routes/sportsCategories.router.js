const express = require("express");
const sportsCategoriesController = require("../controllers/sportsCategories.controller");


const router = express.Router();

router.get("/", sportsCategoriesController.getSportsCategories);
/**
 * @swagger
 * /sports-categories:
 *   get:
 *     summary: Récupérer toutes les catégories de sports
 *     tags: [Catégories de sports]
 *     responses:
 *       200:
 *         description: Une liste de catégories de sports
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
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erreur du serveur"
 */

module.exports = router;