const ticketController = require('../controllers/ticket.controller');
const router = require('express').Router();
const checkSession = require("../middleware/auth");

router.get('/', ticketController.getTickets);
/**
 * @swagger
 * /Tickets:
 *   get:
 *     tags:
 *       - Tickets
 *     description: Récupérer la liste des Tickets
 *     responses:
 *       200:
 *         description: Succès
 *       500:
 *         description: Erreur serveur
 */

router.post('/', ticketController.addTickets);
/**
 * @swagger
 * /Tickets:
 *   post:
 *     tags:
 *       - Tickets
 *     description: Ajouter des Tickets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: client@client.com
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
 *       201:
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

router.delete('/', checkSession, ticketController.deleteTicket);
/**
 * @swagger
 * /Tickets:
 *   delete:
 *     tags:
 *       - Tickets
 *     description: Supprimer un ticket
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 0
 *     responses:
 *       204:
 *         description: Succès
 *       500:
 *         description: Erreur serveur
 */

router.get('/animation-categories', ticketController.getTicketsAnimationCategories);
/**
 * @swagger
 * /Tickets/animation-categories:
 *   get:
 *     tags:
 *       - Tickets
 *     description: Récupérer la liste des catégories d'animation des Tickets
 *     responses:
 *       200:
 *         description: Succès
 *       500:
 *         description: Erreur serveur
 */

router.get('/age-categories', ticketController.getTicketsAgeCategories);
/**
 * @swagger
 * /Tickets/age-categories:
 *   get:
 *     tags:
 *       - Tickets
 *     description: Récupérer la liste des catégories d'âge des Tickets
 *     responses:
 *       200:
 *         description: Succès
 *       500:
 *         description: Erreur serveur
 */

router.post('/prices', ticketController.getTicketPrices);
/**
 * @swagger
 * /Tickets/prices:
 *   post:
 *     tags:
 *       - Tickets
 *     description: Récupérer le prix des Tickets
 *     responses:
 *       200:
 *         description: Succès
 *       500:
 *         description: Erreur serveur
 */

router.get('/:id', ticketController.getTicketById);
/**
 * @swagger
 * /Tickets/{id}:
 *   get:
 *     tags:
 *       - Tickets
 *     description: Récupérer un ticket par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 0
 *         description: ID du ticket
 *     responses:
 *       200:
 *         description: Succès
 *       404:
 *         description: Ticket non trouvé
 *       500:
 *         description: Erreur serveur
 */

router.get('/prices/:id', ticketController.getTicketPricesPriceById);
/**
 * @swagger
 * /Tickets/prices/{id}:
 *   get:
 *     tags:
 *       - Tickets
 *     description: Récupérer le prix d'un ticket par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 0
 *         description: ID du prix du ticket
 *     responses:
 *       200:
 *         description: Succès
 *       404:
 *         description: Prix du ticket non trouvé
 *       500:
 *         description: Erreur serveur
 */

router.get('/prices/categories/:animationCategoryId/:ageCategoryId', ticketController.getTicketPriceByCategories);
/**
 * @swagger
 * /Tickets/prices/categories/{animationCategoryId}/{ageCategoryId}:
 *   get:
 *     tags:
 *       - Tickets
 *     description: Récupérer le prix d'un ticket par catégories
 *     parameters:
 *       - in: path
 *         name: animationCategoryId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 0
 *         description: ID de la catégorie d'animation
 *       - in: path
 *         name: ageCategoryId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 0
 *         description: ID de la catégorie d'âge
 *     responses:
 *       200:
 *         description: Succès
 *       404:
 *         description: Prix du ticket non trouvé
 *       500:
 *         description: Erreur serveur
 */

router.get('/animation-categories/:id', ticketController.getTicketsAnimationCategoryById);
/**
 * @swagger
 * /Tickets/animation-categories/{id}:
 *   get:
 *     tags:
 *       - Tickets
 *     description: Récupérer une catégorie d'animation de ticket par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 0
 *         description: ID de la catégorie d'animation
 *     responses:
 *       200:
 *         description: Succès
 *       404:
 *         description: Catégorie d'animation non trouvée
 *       500:
 *         description: Erreur serveur
 */

router.get('/age-categories/:id', ticketController.getTicketsAgeCategoryById);
/**
 * @swagger
 * /Tickets/age-categories/{id}:
 *   get:
 *     tags:
 *       - Tickets
 *     description: Récupérer une catégorie d'âge de ticket par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 0
 *         description: ID de la catégorie d'âge
 *     responses:
 *       200:
 *         description: Succès
 *       404:
 *         description: Catégorie d'âge non trouvée
 *       500:
 *         description: Erreur serveur
 */

router.get('/customer/:customerId', ticketController.getTicketsByCustomerId);
/**
 * @swagger
 * /Tickets/customer/{customerId}:
 *   get:
 *     tags:
 *       - Tickets
 *     description: Récupérer les Tickets par ID client
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 0
 *         description: ID du client
 *     responses:
 *       200:
 *         description: Succès
 *       500:
 *         description: Erreur serveur
 */

module.exports = router;