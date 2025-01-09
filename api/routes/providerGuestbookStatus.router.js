const express = require('express');
const router = express.Router();
const guestbookStatusController = require('../controllers/providerGuestbookStatus.controller');

router.get('/', guestbookStatusController.getGuestbookStatus);
/**
 * @swagger
 * /guestbook-status:
 *   get:
 *     summary: Récupérer le statut du livre d'or
 *     tags: [Statut du livre d'or]
 *     responses:
 *       200:
 *         description: Le statut du livre d'or
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Actif"
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

router.post('/', guestbookStatusController.addGuestbookStatus);
/**
 * @swagger
 * /guestbook-status:
 *   post:
 *     summary: Ajouter un nouveau statut au livre d'or
 *     tags: [Statut du livre d'or]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: string
 *                 example: "1"
 *     responses:
 *       201:
 *         description: Statut du livre d'or ajouté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Actif"
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
 *                   example: "Erreur du serveur"
 */

router.put('/', guestbookStatusController.modifyGuestbookStatus);
/**
 * @swagger
 * /guestbook-status:
 *   put:
 *     summary: Modifier le statut du livre d'or
 *     tags: [Statut du livre d'or]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 example: "1"
 *               guestbook_activated:
 *                 type: boolean
 *                 example: false
 *               customer_id:
 *                 type: string
 *                 example: 2
 *     responses:
 *       200:
 *         description: Statut du livre d'or modifié avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 guestbook_activated:
 *                   type: boolean
 *                   example: false
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
 *                   example: "Erreur du serveur"
 */

router.get('/customer/:customer_id', guestbookStatusController.getProviderGuestbookStatusByCustomerId);
/**
 * @swagger
 * /guestbook-status/customer/{customer_id}:
 *   get:
 *     summary: Récupérer les entrées du livre d'or par ID client
 *     tags: [Statut du livre d'or]
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         schema:
 *           type: string
 *           example: "3"
 *         description: ID du client
 *     responses:
 *       200:
 *         description: Une liste d'entrées du livre d'or pour le client spécifié
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "1"
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-01-01T00:00:00.000Z"
 *                   rating:
 *                     type: integer
 *                     example: 5
 *                   comment:
 *                     type: string
 *                     example: "Excellent service!"
 *                   service_reservations_id:
 *                     type: string
 *                     example: "2"
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