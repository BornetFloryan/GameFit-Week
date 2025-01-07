const express = require('express');
const serviceReservationController = require('../controllers/serviceReservation.controller');

var router = express.Router();

router.get('/', serviceReservationController.getServiceReservations);
/**
 * @swagger
 * /service-reservations:
 *   get:
 *     summary: Retrieve all service reservations
 *     tags: [Service Reservations]
 *     responses:
 *       200:
 *         description: A list of service reservations
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
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Server error"
 */

router.post('/', serviceReservationController.addServiceReservation);
/**
 * @swagger
 * /service-reservations:
 *   post:
 *     summary: Add a new service reservation
 *     tags: [Service Reservations]
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
 *         description: The created service reservation
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
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Server error"
 */

router.put('/', serviceReservationController.modifyServiceReservation);
/**
 * @swagger
 * /service-reservations:
 *   put:
 *     summary: Modify an existing service reservation
 *     tags: [Service Reservations]
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
 *                 example: "1"
 *               service_id:
 *                 type: string
 *                 example: "1"
 *               stand_reservation_id:
 *                 type: string
 *                 example: "1"
 *     responses:
 *       200:
 *         description: The modified service reservation
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
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Server error"
 */

router.delete('/', serviceReservationController.deleteServiceReservation);
/**
 * @swagger
 * /service-reservations:
 *   delete:
 *     summary: Delete a service reservation
 *     tags: [Service Reservations]
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
 *         description: The deleted service reservation ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "1"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Server error"
 */

router.get('/:id', serviceReservationController.getServiceReservationsById);
/**
 * @swagger
 * /service-reservations/{id}:
 *   get:
 *     summary: Retrieve a service reservation by ID
 *     tags: [Service Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The service reservation ID
 *     responses:
 *       200:
 *         description: A service reservation
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
 *         description: Service reservation not found
 *       500:
 *         description: Internal server error
 */

router.get('/ticket/:ticket_id', serviceReservationController.getServiceReservationsByTicketId);
/**
 * @swagger
 * /service-reservations/ticket/{ticket_id}:
 *   get:
 *     summary: Retrieve service reservations by ticket ID
 *     tags: [Service Reservations]
 *     parameters:
 *       - in: path
 *         name: ticket_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ticket ID
 *     responses:
 *       200:
 *         description: A list of service reservations
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
 *         description: Internal server error
 */

router.get('/service/:service_id', serviceReservationController.getServiceReservationByServiceId);
/**
 * @swagger
 * /service-reservations/service/{service_id}:
 *   get:
 *     summary: Retrieve service reservations by service ID
 *     tags: [Service Reservations]
 *     parameters:
 *       - in: path
 *         name: service_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The service ID
 *     responses:
 *       200:
 *         description: A list of service reservations
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
 *         description: Internal server error
 */

router.get('/stand/:standsReservationsId/service/:service_id', serviceReservationController.getServiceReservationsByStandsReservationsIdAndServiceId);
/**
 * @swagger
 * /service-reservations/stand/{standsReservationsId}/service/{service_id}:
 *   get:
 *     summary: Retrieve service reservations by stand reservation ID and service ID
 *     tags: [Service Reservations]
 *     parameters:
 *       - in: path
 *         name: standsReservationsId
 *         required: true
 *         schema:
 *           type: string
 *         description: The stand reservation ID
 *       - in: path
 *         name: service_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The service ID
 *     responses:
 *       200:
 *         description: A list of service reservations
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
 *         description: Internal server error
 */

router.get('/ticket/:ticket_id/date/:date', serviceReservationController.getServiceReservationsByTicketIdAndDate);
/**
 * @swagger
 * /service-reservations/ticket/{ticket_id}/date/{date}:
 *   get:
 *     summary: Retrieve service reservations by ticket ID and date
 *     tags: [Service Reservations]
 *     parameters:
 *       - in: path
 *         name: ticket_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ticket ID
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         description: The date
 *     responses:
 *       200:
 *         description: A list of service reservations
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
 *         description: Internal server error
 */

router.get('/date/:date', serviceReservationController.getServiceReservationsByDate);
/**
 * @swagger
 * /service-reservations/date/{date}:
 *   get:
 *     summary: Retrieve service reservations by date
 *     tags: [Service Reservations]
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         description: The date
 *     responses:
 *       200:
 *         description: A list of service reservations
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
 *         description: Internal server error
 */

module.exports = router;