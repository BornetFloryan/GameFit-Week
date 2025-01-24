const express = require('express');
const serviceCategoriesController = require('../controllers/serviceCategories.controller');

var router = express.Router();

router.get('/', serviceCategoriesController.getServiceCategories);
/**
 * @swagger
 * /service-categories:
 *   get:
 *     summary: Récupérer toutes les catégories de services
 *     tags: [Catégories de Services]
 *     responses:
 *       200:
 *         description: Une liste de catégories de services
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

router.get('/:id', serviceCategoriesController.getServiceCategoryById);
/**
 * @swagger
 * /service-categories/{id}:
 *   get:
 *     summary: Récupérer une catégorie de service par ID
 *     tags: [Catégories de Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "0"
 *         description: L'ID de la catégorie de service
 *     responses:
 *       200:
 *         description: Une catégorie de service
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "0"
 *                 name:
 *                   type: string
 *                   example: "Dédicaces"
 *       404:
 *         description: Catégorie de service non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */


module.exports = router;