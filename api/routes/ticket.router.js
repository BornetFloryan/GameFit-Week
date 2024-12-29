const ticketController = require('../controllers/ticket.controller');
const router = require('express').Router();

router.get('/', ticketController.getTickets);
/**
 * @swagger
 * /tickets:
 *   get:
 *     tags:
 *       - tickets
 *     description: Récupérer la liste des tickets
 *     responses:
 *       200:
 *         description: Succès
 *       500:
 *         description: Erreur serveur
 */

router.post('/', ticketController.addTickets);
/**
 * @swagger
 * /tickets:
 *   post:
 *     tags:
 *       - tickets
 *     description: Ajouter des tickets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@test.com
 *               date:
 *                 type: string
 *                 example: 2024/12/19
 *               time:
 *                 type: string
 *                 example: 14:00
 *               ticketCount:
 *                 type: integer
 *                 example: 1
 *               animation_category_id:
 *                 type: integer
 *                 example: 0
 *               age_category_id:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: integer
 *                   example: 1
 *                 date:
 *                   type: string
 *                   example: 2024/12/19
 *                 time:
 *                   type: string
 *                   example: 14:00
 *                 customer_id:
 *                   type: integer
 *                   example: 0
 *                 price_id:
 *                   type: integer
 *                   example: 0
 *       500:
 *         description: Erreur serveur
 */

router.delete('/', ticketController.deleteTicket);
/**
 * @swagger
 * /tickets:
 *   delete:
 *     tags:
 *       - tickets
 *     description: Supprimer un ticket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 example: 0
 *     responses:
 *       200:
 *         description: Succès
 *       500:
 *         description: Erreur serveur
 */

router.get('/animation-categories', ticketController.getTicketsAnimationCategories);
/**
 * @swagger
 * /tickets/animation-categories:
 *   get:
 *     tags:
 *       - tickets
 *     description: Récupérer la liste des catégories d'animation des tickets
 *     responses:
 *       200:
 *         description: Succès
 *       500:
 *         description: Erreur serveur
 */

router.get('/age-categories', ticketController.getTicketsAgeCategories);
/**
 * @swagger
 * /tickets/age-categories:
 *   get:
 *     tags:
 *       - tickets
 *     description: Récupérer la liste des catégories d'âge des tickets
 *     responses:
 *       200:
 *         description: Succès
 *       500:
 *         description: Erreur serveur
 */

router.post('/prices', ticketController.getTicketPrices);
/**
 * @swagger
 * /tickets/prices:
 *   post:
 *     tags:
 *       - tickets
 *     description: Récupérer le prix des tickets
 *     responses:
 *       200:
 *         description: Succès
 *       500:
 *         description: Erreur serveur
 */
module.exports = router;