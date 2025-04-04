const express = require('express');
const router = express.Router();
const goodiesController = require('../controllers/goodies.controller');
const { verifyToken, hasRole } = require("../middleware/authJWT");
const uploadImage = require('../middleware/multerConfig');

router.get('/', goodiesController.getAllGoodies);
/**
 * @swagger
 * /goodies:
 *   get:
 *     summary: Récupérer tous les goodies
 *     tags: [Goodies]
 *     responses:
 *       200:
 *         description: Liste des goodies
 *       500:
 *         description: Erreur serveur
 */

router.get('/sizes', goodiesController.getGoodieSizes);
/**
 * @swagger
 * /goodies/sizes:
 *   get:
 *     summary: Récupérer toutes les tailles de goodies
 *     tags: [Goodies]
 *     responses:
 *       200:
 *         description: Liste des tailles disponibles
 *       500:
 *         description: Erreur serveur
 */

router.get('/:id', goodiesController.getGoodieById);
/**
 * @swagger
 * /goodies/{id}:
 *   get:
 *     summary: Récupérer un goodie par ID
 *     tags: [Goodies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du goodie
 *       404:
 *         description: Goodie non trouvé
 *       500:
 *         description: Erreur serveur
 */

router.post('/', [verifyToken, hasRole([1])], goodiesController.addGoodie);
/**
 * @swagger
 * /goodies:
 *   post:
 *     summary: Ajouter un goodie
 *     tags: [Goodies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               price:
 *                  type: number
 *                  format: float
 *               provider_service_categories_id:
 *                  type: integer
 *
 *     responses:
 *       201:
 *         description: Goodie ajouté
 *       500:
 *         description: Erreur serveur
 */

router.put('/:id', [verifyToken, hasRole([1])], goodiesController.updateGoodie);
/**
 * @swagger
 * /goodies/{id}:
 *   put:
 *     summary: Modifier un goodie
 *     tags: [Goodies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: integer
 *               provider_service_categories_id:
 *                  type: integer
 *     responses:
 *       200:
 *         description: Goodie mis à jour
 *       404:
 *         description: Goodie non trouvé
 *       500:
 *         description: Erreur serveur
 */

router.delete('/:id', [verifyToken, hasRole([1])], goodiesController.deleteGoodie);
/**
 * @swagger
 * /goodies/{id}:
 *   delete:
 *     summary: Supprimer un goodie
 *     tags: [Goodies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Goodie supprimé
 *       404:
 *         description: Goodie non trouvé
 *       500:
 *         description: Erreur serveur
 */

router.get('/:goodie_id/variations', goodiesController.getGoodieVariations);
/**
 * @swagger
 * /goodies/{goodie_id}/variations:
 *   get:
 *     summary: Récupérer les variations d’un goodie
 *     tags: [Goodies]
 *     parameters:
 *       - in: path
 *         name: goodie_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des variations disponibles pour ce goodie
 *       500:
 *         description: Erreur serveur
 */

router.post('/variations', [verifyToken, hasRole([1])], goodiesController.addGoodieVariation);
/**
 * @swagger
 * /goodies/variations:
 *   post:
 *     summary: Ajouter une variation de goodie
 *     tags: [Goodies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               goodie_id:
 *                 type: integer
 *               size_id:
 *                 type: integer
 *               price:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Variation ajoutée avec succès
 *       500:
 *         description: Erreur serveur
 */

router.get('/variations/:id', goodiesController.getGoodieVariationById);
/**
 * @swagger
 * /goodies/variations/{id}:
 *   get:
 *     summary: Récupérer une variation de goodie par ID
 *     tags: [Goodies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de la variation de goodie
 *       404:
 *         description: Variation non trouvée
 */

router.put('/variations/:id', goodiesController.updateGoodieVariation);
/**
 * @swagger
 * /goodies/variations/{id}:
 *   put:
 *     summary: Modifier une variation de goodie
 *     tags: [Goodies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stock:
 *                 type: integer
 *               goodie_id:
 *                 type: integer
 *               size_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Variation mise à jour avec succès
 *       404:
 *         description: Variation non trouvée
 */

router.delete('/variations/:id', [verifyToken, hasRole([1])], goodiesController.deleteGoodieVariation);
/**
 * @swagger
 * /goodies/variations/{id}:
 *   delete:
 *     summary: Supprimer une variation de goodie
 *     tags: [Goodies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Variation supprimée avec succès
 *       404:
 *         description: Variation non trouvée
 */

router.post('/upload', uploadImage('goodies'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Aucun fichier téléchargé.');
    }
    res.send({ imageUrl: `/assets/img/goodies/${req.file.filename}` });
});

/**
 * @swagger
 * /goodies/upload:
 *   post:
 *     summary: Télécharger une image de goodie
 *     tags: [Goodies]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image téléchargée avec succès
 *       400:
 *         description: Aucun fichier téléchargé
 *       500:
 *         description: Erreur serveur
 */

module.exports = router;