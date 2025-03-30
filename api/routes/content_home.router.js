const express = require("express");
const contentHomeController = require("../controllers/content_home.controller");
const checkSession = require('../middleware/auth');
const uploadImage = require('../middleware/multerConfig');

var router = express.Router();

router.get("/", contentHomeController.getContentHome);
/**
 * @swagger
 * /content-home:
 *   get:
 *     summary: Récupérer le contenu de la page principale
 *     tags: [Content Home]
 *     responses:
 *       200:
 *         description: Contenu de la page principale récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erreur lors de la récupération de la page principale"
 */
router.put("/", checkSession, uploadImage('file'), contentHomeController.modifyContentHome);
/**
 * @swagger
 * /content-home:
 *   put:
 *     summary: Modifier le contenu de la page principale
 *     tags: [Content Home]
 *     parameters:
 *       - in: query
 *         name: session
 *         required: true
 *         schema:
 *           type: string
 *           example: "12abc45-953-cfb12"
 *         description: ID de session
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               content:
 *                 type: string
 *                 example: "Nouveau contenu"
 *     responses:
 *       200:
 *         description: Contenu de la page principale modifié avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *       400:
 *         description: Mauvaise requête
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Entrée invalide"
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erreur lors de la modification de la page principale"
 */
module.exports = router;