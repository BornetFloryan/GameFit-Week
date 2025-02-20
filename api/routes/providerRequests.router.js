const express = require("express");
const providerRequestsController = require("../controllers/providerRequests.controller");
const checkSession = require('../middleware/auth');

const router = express.Router();

router.get("/", providerRequestsController.getProviderRequests);
/**
 * @swagger
 * /provider-requests:
 *   get:
 *     summary: Récupérer toutes les demandes de prestataires
 *     tags: [Demandes des prestataires]
 *     responses:
 *       200:
 *         description: Une liste de demandes de prestataires
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
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-01-01T00:00:00.000Z"
 *                   customer_id:
 *                     type: integer
 *                     example: 1
 *                   state:
 *                     type: string
 *                     example: "0"
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

router.post("/", providerRequestsController.addProviderRequest);
/**
 * @swagger
 * /provider-requests:
 *   post:
 *     summary: Ajouter une nouvelle demande de prestataire
 *     tags: [Demandes des prestataires]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "provider@example.com"
 *               name:
 *                 type: string
 *                 example: "Nom du prestataire"
 *               prestationServices:
 *                 type: string
 *                 example: "0"
 *               login:
 *                 type: string
 *                 example: "providerlogin"
 *               password:
 *                 type: string
 *                 example: "providerpassword"
 *     responses:
 *       201:
 *         description: Demande de prestataire ajoutée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   example: 0
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "0"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-01-01T00:00:00.000Z"
 *                     customer_id:
 *                       type: integer
 *                       example: 1
 *                     state:
 *                       type: string
 *                       example: "0"
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

router.put("/", checkSession, providerRequestsController.modifyProviderRequest);
/**
 * @swagger
 * /provider-requests:
 *   put:
 *     summary: Modifier une demande de prestataire
 *     tags: [Demandes des prestataires]
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
 *               _id:
 *                 type: string
 *                 example: "0"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-01-01T00:00:00.000Z"
 *               customer_id:
 *                 type: integer
 *                 example: 1
 *               state:
 *                 type: string
 *                 example: "0"
 *     responses:
 *       200:
 *         description: Demande de prestataire modifiée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   example: 0
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "0"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-01-01T00:00:00.000Z"
 *                     customer_id:
 *                       type: integer
 *                       example: 1
 *                     state:
 *                       type: string
 *                       example: "0"
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

router.delete("/:id", checkSession, providerRequestsController.deleteProviderRequest);
/**
 * @swagger
 * /provider-requests/{id}:
 *   delete:
 *     summary: Supprimer une demande de prestataire
 *     tags: [Demandes des prestataires]
 *     parameters:
 *       - in: query
 *         name: session
 *         required: true
 *         schema:
 *           type: string
 *           example: "12abc45-953-cfb12"
 *         description: ID de session
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "0"
 *         description: ID de la demande de prestataire
 *     responses:
 *       200:
 *         description: Demande de prestataire supprimée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   example: 0
 *                 data:
 *                   type: string
 *                   example: "0"
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

router.get("/:id", providerRequestsController.getProviderRequestById);
/**
 * @swagger
 * /provider-requests/{id}:
 *   get:
 *     summary: Récupérer une demande de prestataire par ID
 *     tags: [Demandes des prestataires]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "1"
 *         description: L'ID de la demande de prestataire
 *     responses:
 *       200:
 *         description: Une demande de prestataire
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "0"
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-01-01T00:00:00.000Z"
 *                 customer_id:
 *                   type: integer
 *                   example: 1
 *                 state:
 *                   type: string
 *                   example: "0"
 *       404:
 *         description: Demande de prestataire non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Demande de prestataire non trouvée"
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

router.get("/customer/:customer_id", providerRequestsController.getProviderRequestsByCustomerId);
/**
 * @swagger
 * /provider-requests/customer/{customer_id}:
 *   get:
 *     summary: Récupérer les demandes de prestataires par ID client
 *     tags: [Demandes des prestataires]
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *         description: L'ID du client
 *     responses:
 *       200:
 *         description: Une liste de demandes de prestataires
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
 *                     example: "2025-10-29T23:00:00.000Z"
 *                   customer_id:
 *                     type: integer
 *                     example: 4
 *                   state:
 *                     type: string
 *                     example: "1"
 *       404:
 *         description: Aucune demande de prestataire trouvée pour ce client
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Aucune demande de prestataire trouvée pour ce client"
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