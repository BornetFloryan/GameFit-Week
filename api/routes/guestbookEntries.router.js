const express = require('express');
const router = express.Router();
const guestbookEntriesController = require('../controllers/guestbookEntries.controller');
const {verifyToken, hasRole} = require("../middleware/authJWT");

router.get('/', guestbookEntriesController.getGuestbookEntries);
/**
 * @swagger
 * /guestbook-entries:
 *   get:
 *     summary: Récupérer toutes les entrées du livre d'or
 *     tags: [Entrées du livre d'or]
 *     responses:
 *       200:
 *         description: Une liste d'entrées du livre d'or
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

router.post('/', [verifyToken, hasRole([0])], guestbookEntriesController.addGuestbookEntry);
/**
 * @swagger
 * /guestbook-entries:
 *   post:
 *     summary: Ajouter une nouvelle entrée au livre d'or
 *     tags: [Entrées du livre d'or]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newEntry:
 *                 type: object
 *                 properties:
 *                   rating:
 *                     type: integer
 *                     example: 5
 *                   comment:
 *                     type: string
 *                     example: "Excellent service!"
 *               currentUser:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "0"
 *               prestataire:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "3"
 *     responses:
 *       201:
 *         description: Entrée du livre d'or ajoutée avec succès
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
 *                       example: "1"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-01-01T00:00:00.000Z"
 *                     rating:
 *                       type: integer
 *                       example: 5
 *                     comment:
 *                       type: string
 *                       example: "Excellent service!"
 *                     service_reservations_id:
 *                       type: string
 *                       example: "2"
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

router.put('/', [verifyToken, hasRole([2])], guestbookEntriesController.updateGuestbookEntry);
/**
 * @swagger
 * /guestbook-entries:
 *   put:
 *     summary: Mettre à jour une entrée du livre d'or
 *     tags: [Entrées du livre d'or]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               updatedEntry:
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
 *               currentUser:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "0"
 *               prestataire:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "3"
 *     responses:
 *       200:
 *         description: Entrée du livre d'or mise à jour avec succès
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
 *                       example: "1"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-01-01T00:00:00.000Z"
 *                     rating:
 *                       type: integer
 *                       example: 5
 *                     comment:
 *                       type: string
 *                       example: "Excellent service!"
 *                     service_reservations_id:
 *                       type: string
 *                       example: "2"
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

router.delete('/:_id', [verifyToken, hasRole([2])], guestbookEntriesController.deleteGuestbookEntry);
/**
 * @swagger
 * /guestbook-entries/{_id}:
 *   delete:
 *     summary: Supprimer une entrée du livre d'or
 *     tags: [Entrées du livre d'or]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID de l'entrée du livre d'or à supprimer
 *         schema:
 *           type: string
 *           example: "1"
 *     responses:
 *       200:
 *         description: Entrée du livre d'or supprimée avec succès
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
 *                       example: "1"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-01-01T00:00:00.000Z"
 *                     rating:
 *                       type: integer
 *                       example: 5
 *                     comment:
 *                       type: string
 *                       example: "Excellent service!"
 *                     service_reservations_id:
 *                       type: string
 *                       example: "2"
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