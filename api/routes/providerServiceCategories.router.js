const express = require('express');
const providerServiceCategoriesController = require('../controllers/providerServiceCategories.controller');
const checkSession = require('../middleware/auth');

var router = express.Router();

router.get('/', providerServiceCategoriesController.getProviderServiceCategories);
/**
 * @swagger
 * /provider-service-categories:
 *   get:
 *     summary: Récupérer toutes les catégories de services des prestataires
 *     tags: [Catégories de services des prestataires]
 *     responses:
 *       200:
 *         description: Une liste de catégories de services des prestataires
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
 *                   state:
 *                     type: string
 *                     example: "0"
 *                   customer_id:
 *                     type: string
 *                     example: "1"
 *                   service_id:
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

router.post('/', providerServiceCategoriesController.addProviderServiceCategory);
/**
 * @swagger
 * /provider-service-categories:
 *   post:
 *     summary: Ajouter une nouvelle catégorie de services des prestataires
 *     tags: [Catégories de services des prestataires]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     example: "prestataire@prestataire.com"
 *               serviceCategory:
 *                 type: string
 *                 example: "2"
 *     responses:
 *       200:
 *         description: La catégorie de services des prestataires créée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "1"
 *                 state:
 *                   type: string
 *                   example: "0"
 *                 customer_id:
 *                   type: string
 *                   example: "1"
 *                 service_id:
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

router.put('/', checkSession, providerServiceCategoriesController.modifyProviderServiceCategory);
/**
 * @swagger
 * /provider-service-categories:
 *   put:
 *     summary: Modifier une catégorie de services des prestataires existante
 *     tags: [Catégories de services des prestataires]
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
 *               state:
 *                 type: string
 *                 example: "0"
 *               customer_id:
 *                 type: string
 *                 example: "1"
 *               service_id:
 *                 type: string
 *                 example: "1"
 *     responses:
 *       200:
 *         description: La catégorie de services des prestataires modifiée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "1"
 *                 state:
 *                   type: string
 *                   example: "0"
 *                 customer_id:
 *                   type: string
 *                   example: "1"
 *                 service_id:
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

router.delete('/:id', checkSession, providerServiceCategoriesController.deleteProviderServiceCategory);
/**
 * @swagger
 * /provider-service-categories/{id}:
 *   delete:
 *     summary: Supprimer une catégorie de services des prestataires
 *     tags: [Catégories de services des prestataires]
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
 *           example: "1"
 *         description: ID de la catégorie de services des prestataires
 *     responses:
 *       200:
 *         description: L'ID de la catégorie de services des prestataires supprimée
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

router.get('/customer/:customer_id', providerServiceCategoriesController.getProviderServiceCategoriesByCustomerId);
/**
 * @swagger
 * /provider-service-categories/customer/{customer_id}:
 *   get:
 *     summary: Récupérer les catégories de services des prestataires par ID client
 *     tags: [Catégories de services des prestataires]
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         schema:
 *           type: string
 *           example: "3"
 *         description: L'ID du client
 *     responses:
 *       200:
 *         description: Une liste de catégories de services des prestataires
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
 *                   state:
 *                     type: string
 *                     example: "0"
 *                   customer_id:
 *                     type: string
 *                     example: "1"
 *                   service_id:
 *                     type: string
 *                     example: "1"
 *       500:
 *         description: Erreur interne du serveur
 */

router.get('/customer/:customer_id/service/:service_id', checkSession, providerServiceCategoriesController.getProviderServiceCategoriesByCustomerIdAndServiceID);
/**
 * @swagger
 * /provider-service-categories/customer/{customer_id}/service/{service_id}:
 *   get:
 *     summary: Récupérer une catégorie de services des prestataires par ID client et ID service
 *     tags: [Catégories de services des prestataires]
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         schema:
 *           type: string
 *           example: "3"
 *         description: L'ID du client
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
 *         description: Une catégorie de services des prestataires
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "1"
 *                 state:
 *                   type: string
 *                   example: "0"
 *                 customer_id:
 *                   type: string
 *                   example: "1"
 *                 service_id:
 *                   type: string
 *                   example: "1"
 *       404:
 *         description: Catégorie de services des prestataires non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

router.get('/customer-ids', checkSession, providerServiceCategoriesController.getProviderServiceCategoriesCustomerId);
/**
 * @swagger
 * /provider-service-categories/customer-ids:
 *   get:
 *     summary: Récupérer les IDs distincts des clients des catégories de services des prestataires
 *     tags: [Catégories de services des prestataires]
 *     parameters:
 *       - in: query
 *         name: session
 *         required: true
 *         schema:
 *           type: string
 *           example: "12abc45-953-cfb12"
 *         description: ID de session
 *     responses:
 *       200:
 *         description: Une liste d'IDs de clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "1"
 *       500:
 *         description: Erreur interne du serveur
 */

router.get('/provider-offering-services', checkSession, providerServiceCategoriesController.getProviderOfferingServices);
/**
 * @swagger
 * /provider-service-categories/provider-offering-services:
 *   get:
 *     summary: Récupérer les prestataires offrant des services
 *     tags: [Catégories de services des prestataires]
 *     parameters:
 *       - in: query
 *         name: session
 *         required: true
 *         schema:
 *           type: string
 *           example: "12abc45-953-cfb12"
 *         description: ID de session
 *     responses:
 *       200:
 *         description: Une liste de prestataires offrant des services
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
 *                   email:
 *                     type: string
 *                     example: "provider@example.com"
 *                   name:
 *                     type: string
 *                     example: "Nom du prestataire"
 *       500:
 *         description: Erreur interne du serveur
 */

module.exports = router;