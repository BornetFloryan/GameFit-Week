const express = require("express");
const standsController = require("../controllers/stands.controller");

var router = express.Router();

router.get("/", standsController.getStands);
/**
 * @swagger
 * /stands:
 *   get:
 *     summary: Récupérer tous les stands
 *     tags: [Stands]
 *     responses:
 *       200:
 *         description: Une liste de stands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Nom du stand"
 *                   description:
 *                     type: string
 *                     example: "Description du stand"
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 100.0
 *                   customer_id:
 *                     type: integer
 *                     example: 1
 *                   pavillon_id:
 *                     type: integer
 *                     example: 1
 *       500:
 *         description: Erreur interne du serveur
 */

router.get("/pavillons", standsController.getPavillons);
/**
 * @swagger
 * /stands/pavillons:
 *   get:
 *     summary: Récupérer tous les pavillons
 *     tags: [Pavillons]
 *     responses:
 *       200:
 *         description: Une liste de pavillons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Nom du pavillon"
 *                   description:
 *                     type: string
 *                     example: "Description du pavillon"
 *       500:
 *         description: Erreur interne du serveur
 */

router.get("/reservations", standsController.getStandsReservations);
/**
 * @swagger
 * /stands/reservations:
 *   get:
 *     summary: Récupérer toutes les réservations de stands
 *     tags: [Réservations de stands]
 *     responses:
 *       200:
 *         description: Une liste de réservations de stands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: integer
 *                     example: 1
 *                   date:
 *                     type: string
 *                     example: "2023-01-01"
 *                   stand_id:
 *                     type: integer
 *                     example: 1
 *                   customer_id:
 *                     type: integer
 *                     example: 1
 *                   description:
 *                     type: string
 *                     example: "Description de la réservation"
 *                   start_time:
 *                     type: string
 *                     example: "10:00"
 *                   end_time:
 *                     type: string
 *                     example: "12:00"
 *                   service_id:
 *                     type: integer
 *                     example: 1
 *       500:
 *         description: Erreur interne du serveur
 */

router.post("/reservations", standsController.addStandReservation);
/**
 * @swagger
 * /stands/reservations:
 *   post:
 *     summary: Ajouter une nouvelle réservation de stand
 *     tags: [Réservations de stands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 example: "2023-01-01"
 *               stand_id:
 *                 type: integer
 *                 example: 1
 *               customer_id:
 *                 type: integer
 *                 example: 1
 *               description:
 *                 type: string
 *                 example: "Description de la réservation"
 *               start_time:
 *                 type: string
 *                 example: "10:00"
 *               end_time:
 *                 type: string
 *                 example: "12:00"
 *               service_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: La réservation de stand créée
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
 *                   example: "2023-01-01"
 *                 stand_id:
 *                   type: integer
 *                   example: 1
 *                 customer_id:
 *                   type: integer
 *                   example: 1
 *                 description:
 *                   type: string
 *                   example: "Description de la réservation"
 *                 start_time:
 *                   type: string
 *                   example: "10:00"
 *                 end_time:
 *                   type: string
 *                   example: "12:00"
 *                 service_id:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Erreur interne du serveur
 */

router.put("/", standsController.modifyStand);
/**
 * @swagger
 * /stands:
 *   put:
 *     summary: Modifier un stand
 *     tags: [Stands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: "Nom du stand mis à jour"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 150.0
 *               pavillon_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Le stand modifié
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Nom du stand mis à jour"
 *                 price:
 *                   type: number
 *                   format: float
 *                   example: 150.0
 *                 pavillon_id:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Stand non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */

router.put("/reservations", standsController.modifyStandsReservations);
/**
 * @swagger
 * /stands/reservations:
 *   put:
 *     summary: Modifier une réservation de stand
 *     tags: [Réservations de stands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: integer
 *                 example: 1
 *               date:
 *                 type: string
 *                 example: "2023-01-01"
 *               stand_id:
 *                 type: integer
 *                 example: 1
 *               customer_id:
 *                 type: integer
 *                 example: 1
 *               description:
 *                 type: string
 *                 example: "Description de la réservation mise à jour"
 *               start_time:
 *                 type: string
 *                 example: "10:00"
 *               end_time:
 *                 type: string
 *                 example: "12:00"
 *               service_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: La réservation de stand modifiée
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
 *                   example: "2023-01-01"
 *                 stand_id:
 *                   type: integer
 *                   example: 1
 *                 customer_id:
 *                   type: integer
 *                   example: 1
 *                 description:
 *                   type: string
 *                   example: "Description de la réservation mise à jour"
 *                 start_time:
 *                   type: string
 *                   example: "10:00"
 *                 end_time:
 *                   type: string
 *                   example: "12:00"
 *                 service_id:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Réservation de stand non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

router.delete("/reservations/:id", standsController.deleteStandReservation);
/**
 * @swagger
 * /stands/reservations/{id}:
 *   delete:
 *     summary: Supprimer une réservation de stand par ID
 *     tags: [Réservations de stands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID de la réservation de stand
 *     responses:
 *       200:
 *         description: L'ID de la réservation de stand supprimée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Réservation de stand non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

router.delete("/:id", standsController.deleteStand);
/**
 * @swagger
 * /stands/{id}:
 *   delete:
 *     summary: Supprimer un stand par ID
 *     tags: [Stands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID du stand
 *     responses:
 *       200:
 *         description: L'ID du stand supprimé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Stand non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/:id", standsController.getStandById);
/**
 * @swagger
 * /stands/{id}:
 *   get:
 *     summary: Récupérer un stand par ID
 *     tags: [Stands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID du stand
 *     responses:
 *       200:
 *         description: Un objet stand
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Nom du stand"
 *                 description:
 *                   type: string
 *                   example: "Description du stand"
 *                 price:
 *                   type: number
 *                   format: float
 *                   example: 100.0
 *                 customer_id:
 *                   type: integer
 *                   example: 1
 *                 pavillon_id:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Stand non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */

router.get("/reservations/:id", standsController.getStandReservationById);
/**
 * @swagger
 * /stands/reservations/{id}:
 *   get:
 *     summary: Récupérer une réservation de stand par ID
 *     tags: [Réservations de stands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID de la réservation de stand
 *     responses:
 *       200:
 *         description: Un objet réservation de stand
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
 *                   example: "2023-01-01"
 *                 stand_id:
 *                   type: integer
 *                   example: 1
 *                 customer_id:
 *                   type: integer
 *                   example: 1
 *                 description:
 *                   type: string
 *                   example: "Description de la réservation"
 *                 start_time:
 *                   type: string
 *                   example: "10:00"
 *                 end_time:
 *                   type: string
 *                   example: "12:00"
 *                 service_id:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Réservation de stand non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

router.get("/stand/:stand_id/reservations", standsController.getStandReservationsByStandId);
/**
 * @swagger
 * /stands/stand/{stand_id}/reservations:
 *   get:
 *     summary: Récupérer toutes les réservations pour un stand spécifique
 *     tags: [Réservations de stands]
 *     parameters:
 *       - in: path
 *         name: stand_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID du stand
 *     responses:
 *       200:
 *         description: Une liste de réservations de stand
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: integer
 *                     example: 1
 *                   date:
 *                     type: string
 *                     example: "2023-01-01"
 *                   stand_id:
 *                     type: integer
 *                     example: 1
 *                   customer_id:
 *                     type: integer
 *                     example: 1
 *                   description:
 *                     type: string
 *                     example: "Description de la réservation"
 *                   start_time:
 *                     type: string
 *                     example: "10:00"
 *                   end_time:
 *                     type: string
 *                     example: "12:00"
 *                   service_id:
 *                     type: integer
 *                     example: 1
 *       500:
 *         description: Erreur interne du serveur
 */

router.get("/stand/:stand_id/reservations/:date", standsController.getStandsReservationsByStandIdAndDate);
/**
 * @swagger
 * /stands/stand/{stand_id}/reservations/{date}:
 *   get:
 *     summary: Récupérer toutes les réservations pour un stand spécifique à une date spécifique
 *     tags: [Réservations de stands]
 *     parameters:
 *       - in: path
 *         name: stand_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID du stand
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         description: La date des réservations
 *     responses:
 *       200:
 *         description: Une liste de réservations de stand
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: integer
 *                     example: 1
 *                   date:
 *                     type: string
 *                     example: "2023-01-01"
 *                   stand_id:
 *                     type: integer
 *                     example: 1
 *                   customer_id:
 *                     type: integer
 *                     example: 1
 *                   description:
 *                     type: string
 *                     example: "Description de la réservation"
 *                   start_time:
 *                     type: string
 *                     example: "10:00"
 *                   end_time:
 *                     type: string
 *                     example: "12:00"
 *                   service_id:
 *                     type: integer
 *                     example: 1
 *       500:
 *         description: Erreur interne du serveur
 */

router.get("/customer/:customer_id/reservations", standsController.getStandsReservationsByCustomerId);
/**
 * @swagger
 * /stands/customer/{customer_id}/reservations:
 *   get:
 *     summary: Récupérer toutes les réservations pour un client spécifique
 *     tags: [Réservations de stands]
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID du client
 *     responses:
 *       200:
 *         description: Une liste de réservations de stand
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: integer
 *                     example: 1
 *                   date:
 *                     type: string
 *                     example: "2023-01-01"
 *                   stand_id:
 *                     type: integer
 *                     example: 1
 *                   customer_id:
 *                     type: integer
 *                     example: 1
 *                   description:
 *                     type: string
 *                     example: "Description de la réservation"
 *                   start_time:
 *                     type: string
 *                     example: "10:00"
 *                   end_time:
 *                     type: string
 *                     example: "12:00"
 *                   service_id:
 *                     type: integer
 *                     example: 1
 *       500:
 *         description: Erreur interne du serveur
 */

router.get("/service/:service_id/reservations", standsController.getStandsReservationsByServiceId);
/**
 * @swagger
 * /stands/service/{service_id}/reservations:
 *   get:
 *     summary: Récupérer toutes les réservations pour un service spécifique
 *     tags: [Réservations de stands]
 *     parameters:
 *       - in: path
 *         name: service_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID du service
 *     responses:
 *       200:
 *         description: Une liste de réservations de stand
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: integer
 *                     example: 1
 *                   date:
 *                     type: string
 *                     example: "2023-01-01"
 *                   stand_id:
 *                     type: integer
 *                     example: 1
 *                   customer_id:
 *                     type: integer
 *                     example: 1
 *                   description:
 *                     type: string
 *                     example: "Description de la réservation"
 *                   start_time:
 *                     type: string
 *                     example: "10:00"
 *                   end_time:
 *                     type: string
 *                     example: "12:00"
 *                   service_id:
 *                     type: integer
 *                     example: 1
 *       500:
 *         description: Erreur interne du serveur
 */

router.get("/customer/:customer_id/service/:service_id/reservations", standsController.getStandsReservationsByCustomerIdAndServiceId);
/**
 * @swagger
 * /stands/customer/{customer_id}/service/{service_id}/reservations:
 *   get:
 *     summary: Récupérer toutes les réservations pour un client et un service spécifiques
 *     tags: [Réservations de stands]
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID du client
 *       - in: path
 *         name: service_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID du service
 *     responses:
 *       200:
 *         description: Une liste de réservations de stand
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: integer
 *                     example: 1
 *                   date:
 *                     type: string
 *                     example: "2023-01-01"
 *                   stand_id:
 *                     type: integer
 *                     example: 1
 *                   customer_id:
 *                     type: integer
 *                     example: 1
 *                   description:
 *                     type: string
 *                     example: "Description de la réservation"
 *                   start_time:
 *                     type: string
 *                     example: "10:00"
 *                   end_time:
 *                     type: string
 *                     example: "12:00"
 *                   service_id:
 *                     type: integer
 *                     example: 1
 *       500:
 *         description: Erreur interne du serveur
 */

router.get("/customer/:customer_id/service/:service_id/date/:date/reservations", standsController.getStandsReservationsByCustomerIdAndServiceIdAndDate);
/**
 * @swagger
 * /stands/customer/{customer_id}/service/{service_id}/date/{date}/reservations:
 *   get:
 *     summary: Récupérer toutes les réservations pour un client, un service et une date spécifiques
 *     tags: [Réservations de stands]
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID du client
 *       - in: path
 *         name: service_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID du service
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         description: La date des réservations
 *     responses:
 *       200:
 *         description: Une liste de réservations de stand
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: integer
 *                     example: 1
 *                   date:
 *                     type: string
 *                     example: "2023-01-01"
 *                   stand_id:
 *                     type: integer
 *                     example: 1
 *                   customer_id:
 *                     type: integer
 *                     example: 1
 *                   description:
 *                     type: string
 *                     example: "Description de la réservation"
 *                   start_time:
 *                     type: string
 *                     example: "10:00"
 *                   end_time:
 *                     type: string
 *                     example: "12:00"
 *                   service_id:
 *                     type: integer
 *                     example: 1
 *       500:
 *         description: Erreur interne du serveur
 */

router.get("/customer/:customer_id/date/:date/excluding-stand/:stand_id/reservations", standsController.getStandsReservationsByCustomerIdAndDateAndExcludingStandId);
/**
 * @swagger
 * /stands/customer/{customer_id}/date/{date}/excluding-stand/{stand_id}/reservations:
 *   get:
 *     summary: Récupérer toutes les réservations pour un client et une date spécifiques, en excluant un stand spécifique
 *     tags: [Réservations de stands]
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID du client
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         description: La date des réservations
 *       - in: path
 *         name: stand_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID du stand à exclure
 *     responses:
 *       200:
 *         description: Une liste de réservations de stand
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: integer
 *                     example: 1
 *                   date:
 *                     type: string
 *                     example: "2023-01-01"
 *                   stand_id:
 *                     type: integer
 *                     example: 1
 *                   customer_id:
 *                     type: integer
 *                     example: 1
 *                   description:
 *                     type: string
 *                     example: "Description de la réservation"
 *                   start_time:
 *                     type: string
 *                     example: "10:00"
 *                   end_time:
 *                     type: string
 *                     example: "12:00"
 *                   service_id:
 *                     type: integer
 *                     example: 1
 *       500:
 *         description: Erreur interne du serveur
 */

module.exports = router;