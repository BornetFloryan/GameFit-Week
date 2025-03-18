const express = require('express');
const router = express.Router();
const basketController = require('../controllers/basket.controller');

router.get('/', basketController.getAllBaskets);
/**
 * @swagger
 * /baskets:
 *   get:
 *     summary: Récupérer tous les paniers
 *     tags: [Paniers]
 *     responses:
 *       200:
 *         description: Liste des paniers
 *       500:
 *         description: Erreur interne du serveur
 */

router.get('/:customer_id', basketController.getBasketsByCustomer);
/**
 * @swagger
 * /baskets/{customer_id}:
 *   get:
 *     summary: Récupérer les paniers d'un client
 *     tags: [Paniers]
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du client
 *     responses:
 *       200:
 *         description: Liste des paniers du client
 *       500:
 *         description: Erreur interne du serveur
 */

router.post('/', basketController.createBasket);
/**
 * @swagger
 * /baskets:
 *   post:
 *     summary: Créer un nouveau panier
 *     tags: [Paniers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Panier créé avec succès
 *       500:
 *         description: Erreur interne du serveur
 */

router.put('/:basket_id', basketController.updateBasketState);
/**
 * @swagger
 * /baskets/{basket_id}:
 *   put:
 *     summary: Modifier l'état d'un panier
 *     tags: [Paniers]
 *     parameters:
 *       - in: path
 *         name: basket_id
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
 *               state:
 *                 type: integer
 *               is_order:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Panier mis à jour
 *       500:
 *         description: Erreur interne du serveur
 */

router.delete('/:basket_id', basketController.deleteBasket);
/**
 * @swagger
 * /baskets/{basket_id}:
 *   delete:
 *     summary: Supprimer un panier
 *     tags: [Paniers]
 *     parameters:
 *       - in: path
 *         name: basket_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Panier supprimé
 *       500:
 *         description: Erreur interne du serveur
 */

router.get('/:basket_id/items', basketController.getItemsByBasket);
/**
 * @swagger
 * /baskets/{basket_id}/items:
 *   get:
 *     summary: Récupérer les articles d'un panier
 *     tags: [Paniers]
 *     parameters:
 *       - in: path
 *         name: basket_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des articles du panier
 *       500:
 *         description: Erreur interne du serveur
 */

router.post('/:basket_id/items', basketController.addItemToBasket);
/**
 * @swagger
 * /baskets/{basket_id}/items:
 *   post:
 *     summary: Ajouter un article au panier
 *     tags: [Paniers]
 *     parameters:
 *       - in: path
 *         name: basket_id
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
 *               item_id:
 *                 type: integer
 *               item_type:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               price:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Article ajouté au panier
 *       500:
 *         description: Erreur interne du serveur
 */

router.put('/items/:basket_item_id', basketController.updateItemQuantity);
/**
 * @swagger
 * /baskets/items/{basket_item_id}:
 *   put:
 *     summary: Modifier la quantité d'un article du panier
 *     tags: [Paniers]
 *     parameters:
 *       - in: path
 *         name: basket_item_id
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
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Quantité mise à jour
 *       500:
 *         description: Erreur interne du serveur
 */

router.delete('/items/:basket_item_id', basketController.deleteItemFromBasket);
/**
 * @swagger
 * /baskets/items/{basket_item_id}:
 *   delete:
 *     summary: Supprimer un article du panier
 *     tags: [Paniers]
 *     parameters:
 *       - in: path
 *         name: basket_item_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Article supprimé du panier
 *       500:
 *         description: Erreur interne du serveur
 */


module.exports = router;
