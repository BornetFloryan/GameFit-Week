const express = require('express');
const router = express.Router();
const providerScheduleStatusController = require('../controllers/providerScheduleStatus.controller');

router.get('/', providerScheduleStatusController.getScheduleStatus);
/**
 * @swagger
 * /provider-schedule-status:
 *   get:
 *     summary: Récupérer le statut du planning du prestataire
 *     tags: [Statut du planning du prestataire]
 *     responses:
 *       200:
 *         description: Le statut du planning du prestataire
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

router.post('/', providerScheduleStatusController.addScheduleStatus);
/**
 * @swagger
 * /provider-schedule-status:
 *   post:
 *     summary: Ajouter un nouveau statut au planning du prestataire
 *     tags: [Statut du planning du prestataire]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "client@client.com"
 *     responses:
 *       201:
 *         description: Statut du planning du prestataire ajouté avec succès
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

router.put('/', providerScheduleStatusController.modifyScheduleStatus);
/**
 * @swagger
 * /provider-schedule-status:
 *   put:
 *     summary: Modifier le statut du planning du prestataire
 *     tags: [Statut du planning du prestataire]
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
 *               schedule_activated:
 *                 type: boolean
 *                 example: false
 *               customer_id:
 *                 type: string
 *                 example: "2"
 *     responses:
 *       200:
 *         description: Statut du planning du prestataire modifié avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 schedule_activated:
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

router.get('/customer/:customer_id', providerScheduleStatusController.getScheduleStatusByCustomerId);
/**
 * @swagger
 * /provider-schedule-status/customer/{customer_id}:
 *   get:
 *     summary: Récupérer le statut du planning par ID client
 *     tags: [Statut du planning du prestataire]
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
 *         description: Le statut du planning pour le client spécifié
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "1"
 *                 schedule_activated:
 *                   type: boolean
 *                   example: false
 *                 customer_id:
 *                   type: string
 *                   example: "2"
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