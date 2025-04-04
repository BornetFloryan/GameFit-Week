const express = require("express");
const contentHomeController = require("../controllers/content_home.controller");
const { verifyToken, hasRole } = require("../middleware/authJWT");
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

router.put("/", [verifyToken, hasRole([2])], contentHomeController.modifyContentHome);
/**
 * @swagger
 * /content-home:
 *   put:
 *     summary: Modifier le contenu de la page principale
 *     tags: [Content Home]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               explain:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   image_url:
 *                     type: string
 *               main:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   image_url:
 *                     type: string
 *               cards:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     image_url:
 *                       type: string
 *     responses:
 *       200:
 *         description: Contenu de la page principale modifié avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
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

router.post('/upload', uploadImage('home'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Aucun fichier téléchargé.');
    }
    res.send({ imageUrl: `/assets/img/goodies/${req.file.filename}` });
});
/**
 * @swagger
 * /content-home/upload:
 *   post:
 *     summary: Télécharger une image de contenu
 *     tags: [Content Home]
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
 *     responses:
 *       200:
 *         description: Image téléchargée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageUrl:
 *                   type: string
 *                   example: "/assets/img/goodies/image.jpg"
 *       400:
 *         description: Aucun fichier téléchargé
 */

module.exports = router;