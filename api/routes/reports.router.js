const express = require("express");
const reportsController = require("../controllers/reports.controller");
// const checkSession = require('../middleware/auth');

var router = express.Router();

router.get("/", reportsController.getReports);
/**
 * @swagger
 * /reports:
 *   get:
 *     summary: Récupérer tous les comptes signalements
 *     tags: [Signalements]
 *     responses:
 *       200:
 *         description: Une liste de signalements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: integer
 *                     example: 0
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "20-02-2025T00:00:00.000Z"
 *                   reason:
 *                     type: string
 *                     example: "Langage inapproprié"
 *                   state:
 *                     type: integer
 *                     example: 0
 *                   guestbook_entry_id:
 *                     type: integer
 *                     example: 0
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

router.post("/", reportsController.addReport);
/**
 * @swagger
 * /reports:
 *   post:
 *     summary: Ajouter un signalement
 *     tags: [Signalements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "20-02-2025T00:00:00.000Z"
 *               reason:
 *                 type: string
 *                 example: "Langage inapproprié"
 *               state:
 *                 type: integer
 *                 example: 0
 *               guestbook_entry_id:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       201:
 *         description: Signalement ajouté
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: integer
 *                   example: 0
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: "20-02-2025T00:00:00.000Z"
 *                 reason:
 *                   type: string
 *                   example: "Langage inapproprié"
 *                 state:
 *                   type: integer
 *                   example: 0
 *                 guestbook_entry_id:
 *                   type: integer
 *                   example: 0
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

router.put("/", reportsController.updateReport);
/**
 * @swagger
 * /reports:
 *   put:
 *     summary: Mettre à jour un signalement
 *     tags: [Signalements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: integer
 *                 example: 0
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "20-02-2025T00:00:00.000Z"
 *               reason:
 *                 type: string
 *                 example: "Langage inapproprié"
 *               state:
 *                 type: integer
 *                 example: 1
 *               guestbook_entry_id:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       200:
 *         description: Signalement mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: integer
 *                   example: 0
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: "20-02-2025T00:00:00.000Z"
 *                 reason:
 *                   type: string
 *                   example: "Langage inapproprié"
 *                 state:
 *                   type: integer
 *                   example: 1
 *                 guestbook_entry_id:
 *                   type: integer
 *                   example: 0
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

router.delete("/:id", reportsController.deleteReport);
/**
 * @swagger
 * /reports/{id}:
 *   delete:
 *     summary: Supprimer un signalement
 *     tags: [Signalements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du signalement à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Signalement supprimé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: integer
 *                   example: 0
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: "20-02-2025T00:00:00.000Z"
 *                 reason:
 *                   type: string
 *                   example: "Langage inapproprié"
 *                 state:
 *                   type: integer
 *                   example: 1
 *                 guestbook_entry_id:
 *                   type: integer
 *                   example: 0
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