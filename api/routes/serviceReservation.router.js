const express = require('express');
const serviceReservationController = require('../controllers/serviceReservation.controller');
const checkSession = require("../middleware/auth");

var router = express.Router();

router.get('/', serviceReservationController.getServiceReservations);
/**
 * @swagger
 * /service-reservations:
 *   get:
 *     summary: Récupérer toutes les réservations de service
 *     tags: [Réservations de service]
 *     responses:
 *       200:
 *         description: Une liste de réservations de service
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
 *                     example: "2023-01-01"
 *                   time:
 *                     type: string
 *                     example: "10:00"
 *                   ticket_id:
 *                     type: string
 *                     example: "1"
 *                   service_id:
 *                     type: string
 *                     example: "1"
 *                   stand_reservation_id:
 *                     type: string
 *                     example: "1"
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

router.post('/', serviceReservationController.addServiceReservation);
/**
 * @swagger
 * /service-reservations:
 *   post:
 *     summary: Ajouter une nouvelle réservation de service
 *     tags: [Réservations de service]
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
 *               time:
 *                 type: string
 *                 example: "10:00"
 *               ticket_id:
 *                 type: string
 *                 example: "0"
 *               service_id:
 *                 type: string
 *                 example: "0"
 *               stand_reservation_id:
 *                 type: string
 *                 example: "0"
 *     responses:
 *       200:
 *         description: La réservation de service créée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "1"
 *                 date:
 *                   type: string
 *                   example: "2023-01-01"
 *                 time:
 *                   type: string
 *                   example: "10:00"
 *                 ticket_id:
 *                   type: string
 *                   example: "1"
 *                 service_id:
 *                   type: string
 *                   example: "1"
 *                 stand_reservation_id:
 *                   type: string
 *                   example: "1"
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

router.put('/', checkSession, serviceReservationController.modifyServiceReservation);
/**
 * @swagger
 * /service-reservations:
 *   put:
 *     summary: Modifier une réservation de service existante
 *     tags: [Réservations de service]
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
 *                 example: "1"
 *               date:
 *                 type: string
 *                 example: "2023-01-01"
 *               time:
 *                 type: string
 *                 example: "10:00"
 *               ticket_id:
 *                 type: string
 *                 example: "0"
 *               service_id:
 *                 type: string
 *                 example: "1"
 *               stand_reservation_id:
 *                 type: string
 *                 example: "1"
 *     responses:
 *       200:
 *         description: La réservation de service modifiée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "1"
 *                 date:
 *                   type: string
 *                   example: "2023-01-01"
 *                 time:
 *                   type: string
 *                   example: "10:00"
 *                 ticket_id:
 *                   type: string
 *                   example: "1"
 *                 service_id:
 *                   type: string
 *                   example: "1"
 *                 stand_reservation_id:
 *                   type: string
 *                   example: "1"
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

router.delete('/', serviceReservationController.deleteServiceReservation);
/**
 * @swagger
 * /service-reservations:
 *   delete:
 *     summary: Supprimer une réservation de service
 *     tags: [Réservations de service]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "1"
 *     responses:
 *       200:
 *         description: L'ID de la réservation de service supprimée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "1"
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

router.get('/:id', checkSession, serviceReservationController.getServiceReservationsById);
/**
 * @swagger
 * /service-reservations/{id}:
 *   get:
 *     summary: Récupérer une réservation de service par ID
 *     tags: [Réservations de service]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "0"
 *         description: L'ID de la réservation de service
 *       - in: query
 *         name: session
 *         required: true
 *         schema:
 *           type: string
 *           example: "12abc45-953-cfb12"
 *         description: ID de session
 *     responses:
 *       200:
 *         description: Une réservation de service
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "1"
 *                 date:
 *                   type: string
 *                   example: "2023-01-01"
 *                 time:
 *                   type: string
 *                   example: "10:00"
 *                 ticket_id:
 *                   type: string
 *                   example: "1"
 *                 service_id:
 *                   type: string
 *                   example: "1"
 *                 stand_reservation_id:
 *                   type: string
 *                   example: "1"
 *       404:
 *         description: Réservation de service non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

router.get('/ticket/:ticket_id', serviceReservationController.getServiceReservationsByTicketId);
/**
 * @swagger
 * /service-reservations/ticket/{ticket_id}:
 *   get:
 *     summary: Récupérer les réservations de service par ID de ticket
 *     tags: [Réservations de service]
 *     parameters:
 *       - in: path
 *         name: ticket_id
 *         required: true
 *         schema:
 *           type: string
 *           example: "0"
 *         description: L'ID du ticket
 *     responses:
 *       200:
 *         description: Une liste de réservations de service
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
 *                     example: "2023-01-01"
 *                   time:
 *                     type: string
 *                     example: "10:00"
 *                   ticket_id:
 *                     type: string
 *                     example: "1"
 *                   service_id:
 *                     type: string
 *                     example: "1"
 *                   stand_reservation_id:
 *                     type: string
 *                     example: "1"
 *       500:
 *         description: Erreur interne du serveur
 */

router.get('/service/:service_id', checkSession, serviceReservationController.getServiceReservationByServiceId);
/**
 * @swagger
 * /service-reservations/service/{service_id}:
 *   get:
 *     summary: Récupérer les réservations de service par ID de service
 *     tags: [Réservations de service]
 *     parameters:
 *       - in: path
 *         name: service_id
 *         required: true
 *         schema:
 *           type: string
 *           example: "0"
 *         description: L'ID du service
 *       - in: query
 *         name: session
 *         required: true
 *         schema:
 *           type: string
 *           example: "12abc45-953-cfb12"
 *         description: ID de session
 *     responses:
 *       200:
 *         description: Une liste de réservations de service
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
 *                     example: "2023-01-01"
 *                   time:
 *                     type: string
 *                     example: "10:00"
 *                   ticket_id:
 *                     type: string
 *                     example: "1"
 *                   service_id:
 *                     type: string
 *                     example: "1"
 *                   stand_reservation_id:
 *                     type: string
 *                     example: "1"
 *       500:
 *         description: Erreur interne du serveur
 */

router.get('/stand/:standsReservationsId/service/:service_id', checkSession, serviceReservationController.getServiceReservationsByStandsReservationsIdAndServiceId);
/**
 * @swagger
 * /service-reservations/stand/{standsReservationsId}/service/{service_id}:
 *   get:
 *     summary: Récupérer les réservations de service par ID de réservation de stand et ID de service
 *     tags: [Réservations de service]
 *     parameters:
 *       - in: path
 *         name: standsReservationsId
 *         required: true
 *         schema:
 *           type: string
 *           example: "0"
 *         description: L'ID de la réservation de stand
 *       - in: path
 *         name: service_id
 *         required: true
 *         schema:
 *           type: string
 *           example: "0"
 *         description: L'ID du service
 *       - in: query
 *         name: session
 *         required: true
 *         schema:
 *           type: string
 *           example: "12abc45-953-cfb12"
 *         description: ID de session
 *     responses:
 *       200:
 *         description: Une liste de réservations de service
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
 *                     example: "2023-01-01"
 *                   time:
 *                     type: string
 *                     example: "10:00"
 *                   ticket_id:
 *                     type: string
 *                     example: "1"
 *                   service_id:
 *                     type: string
 *                     example: "1"
 *                   stand_reservation_id:
 *                     type: string
 *                     example: "1"
 *       500:
 *         description: Erreur interne du serveur
 */

router.get('/ticket/:ticket_id/date/:date', serviceReservationController.getServiceReservationsByTicketIdAndDate);
/**
 * @swagger
 * /service-reservations/ticket/{ticket_id}/date/{date}:
 *   get:
 *     summary: Récupérer les réservations de service par ID de ticket et date
 *     tags: [Réservations de service]
 *     parameters:
 *       - in: path
 *         name: ticket_id
 *         required: true
 *         schema:
 *           type: string
 *           example: "0"
 *         description: L'ID du ticket
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2025-07-06T22:00:00.000Z"
 *         description: La date
 *     responses:
 *       200:
 *         description: Une liste de réservations de service
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
 *                     example: "2025-07-06T22:00:00.000Z"
 *                   time:
 *                     type: string
 *                     example: "09:00:00"
 *                   ticket_id:
 *                     type: string
 *                     example: "0"
 *                   service_id:
 *                     type: string
 *                     example: "0"
 *                   stand_reservation_id:
 *                     type: string
 *                     example: "0"
 *       500:
 *         description: Erreur interne du serveur
 */

router.get('/date/:date', serviceReservationController.getServiceReservationsByDate);
/**
 * @swagger
 * /service-reservations/date/{date}:
 *   get:
 *     summary: Récupérer les réservations de service par date
 *     tags: [Réservations de service]
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2025-07-06T22:00:00.000Z"
 *         description: La date
 *       - in: query
 *         name: session
 *         required: true
 *         schema:
 *           type: string
 *           example: "12abc45-953-cfb12"
 *         description: ID de session
 *     responses:
 *       200:
 *         description: Une liste de réservations de service
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
 *                     example: "2025-07-06T22:00:00.000Z"
 *                   time:
 *                     type: string
 *                     example: "10:00:00"
 *                   ticket_id:
 *                     type: string
 *                     example: "0"
 *                   service_id:
 *                     type: string
 *                     example: "1"
 *                   stand_reservation_id:
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

module.exports = router;