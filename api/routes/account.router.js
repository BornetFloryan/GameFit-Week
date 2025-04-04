const express = require("express");
const accountController = require("../controllers/account.controller");
const { verifyToken, hasRole } = require("../middleware/authJWT");
const uploadImage = require('../middleware/multerConfig');

var router = express.Router();

router.get("/", accountController.getCustomersAccounts);
/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Récupérer tous les comptes clients
 *     tags: [Comptes]
 *     responses:
 *       200:
 *         description: Une liste de comptes clients
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
 *                   login:
 *                     type: string
 *                     example: "client"
 *                   privilege:
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

router.post("/token/refreshtoken", accountController.refreshToken);
/**
 * @swagger
 * /accounts/token/refreshtoken:
 *   post:
 *     tags: [Comptes]
 *     description: Utilisé pour rafraîchir le token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *     security:
 *       - jwt: []
 *     responses:
 *       '200':
 *         description: Ressource ajoutée avec succès
 *       '500':
 *         description: Erreur interne du serveur
 *       '400':
 *         description: Mauvaise requête
 */

router.post("/login", accountController.loginUser);
/**
 * @swagger
 * /accounts/login:
 *   post:
 *     summary: Connecter un utilisateur
 *     tags: [Comptes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 example: "client"
 *               password:
 *                 type: string
 *                 example: "client"
 *     responses:
 *       200:
 *         description: Utilisateur connecté avec succès
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
 *                       type: integer
 *                       example: 0
 *                     name:
 *                       type: string
 *                       example: "client"
 *                     login:
 *                       type: string
 *                       example: "client"
 *                     password:
 *                       type: string
 *                       example: "client"
 *                     email:
 *                       type: string
 *                       example: "client@client.com"
 *                     picture:
 *                       type: string
 *                       example: ""
 *                     description:
 *                       type: string
 *                       example: ""
 *                     privilege:
 *                       type: integer
 *                       example: 0
 *                     session:
 *                       type: string
 *                       example: ""
 *       401:
 *         description: Login ou mot de passe incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Non autorisé"
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

router.post("/register", accountController.addCustomerAccount);
/**
 * @swagger
 * /accounts/register:
 *   post:
 *     summary: Enregistrer un nouvel utilisateur
 *     tags: [Comptes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "newuser"
 *               login:
 *                 type: string
 *                 example: "newuser"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               email:
 *                 type: string
 *                 example: "newemail@new.com"
 *     responses:
 *       201:
 *         description: Utilisateur enregistré avec succès
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
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "newuser"
 *                     login:
 *                       type: string
 *                       example: "newuser"
 *                     password:
 *                       type: string
 *                       example: "password123"
 *                     email:
 *                       type: string
 *                       example: "newemail@new.com"
 *                     picture:
 *                       type: string
 *                       example: ""
 *                     description:
 *                       type: string
 *                       example: ""
 *                     privilege:
 *                       type: integer
 *                       example: 0
 *                     session:
 *                       type: string
 *                       example: ""
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

router.put("/profil", [verifyToken, hasRole([0, 1, 2])], accountController.modifyCustomerAccount);
/**
 * @swagger
 * /accounts/profil:
 *   put:
 *     summary: Modifier le profil de l'utilisateur
 *     tags: [Comptes]
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
 *               name:
 *                 type: string
 *                 example: "newname"
 *               email:
 *                 type: string
 *                 example: "newemail@new.com"
 *               login:
 *                 type: string
 *                 example: "newuser"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               picture:
 *                  type: string
 *                  example: ""
 *               description:
 *                  type: string
 *                  example: ""
 *               privilege:
 *                  type: integer
 *                  example: 0
 *               session:
 *                  type: string
 *                  example: ""
 *     responses:
 *       200:
 *         description: Profil utilisateur modifié avec succès
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
 *                       type: integer
 *                       example: 0
 *                     name:
 *                       type: string
 *                       example: "newname"
 *                     login:
 *                       type: string
 *                       example: "newuser"
 *                     password:
 *                       type: string
 *                       example: "password123"
 *                     email:
 *                       type: string
 *                       example: "newemail@new.com"
 *                     picture:
 *                       type: string
 *                       example: ""
 *                     description:
 *                       type: string
 *                       example: ""
 *                     privilege:
 *                       type: integer
 *                       example: 0
 *                     session:
 *                       type: string
 *                       example: ""
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

router.delete("/profil/:id", [verifyToken, hasRole([2])], accountController.deleteCustomerAccount);
/**
 * @swagger
 * /accounts/profil/{id}:
 *   delete:
 *     summary: Supprimer le profil de l'utilisateur
 *     tags: [Comptes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 0
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Profil utilisateur supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   example: 0
 *                 data:
 *                   type: integer
 *                   example: 0
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

router.get("/email/:email", accountController.getCustomerByEmail);
/**
 * @swagger
 * /accounts/email/{email}:
 *   get:
 *     summary: Récupérer un compte client par email
 *     tags: [Comptes]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           example: "client@client.com"
 *         description: L'email du compte client
 *     responses:
 *       200:
 *         description: Un compte client
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
 *                   example: "client"
 *                 login:
 *                   type: string
 *                   example: "client"
 *                 email:
 *                   type: string
 *                   example: "client@client.com"
 *                 privilege:
 *                   type: integer
 *                   example: 0
 *       404:
 *         description: Client non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Client non trouvé"
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

router.get("/name/:name", accountController.getCustomerByName);
/**
 * @swagger
 * /accounts/name/{name}:
 *   get:
 *     summary: Récupérer un compte client par nom
 *     tags: [Comptes]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *           example: "client"
 *         description: Le nom du compte client
 *     responses:
 *       200:
 *         description: Un compte client
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
 *                   example: "client"
 *                 login:
 *                   type: string
 *                   example: "client"
 *                 email:
 *                   type: string
 *                   example: "client@client.com"
 *                 privilege:
 *                   type: integer
 *                   example: 0
 *       404:
 *         description: Client non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Client non trouvé"
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

router.get("/:id(\\d+)", accountController.getCustomerById);
/**
 * @swagger
 * /accounts/{id}:
 *   get:
 *     summary: Récupérer un compte client par ID
 *     tags: [Comptes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 0
 *         description: L'ID du compte client
 *     responses:
 *       200:
 *         description: Un compte client
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: integer
 *                   example: 0
 *                 name:
 *                   type: string
 *                   example: "client"
 *                 login:
 *                   type: string
 *                   example: "client"
 *                 email:
 *                   type: string
 *                   example: "client@client.com"
 *                 privilege:
 *                   type: integer
 *                   example: 0
 *       404:
 *         description: Client non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Client non trouvé"
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

router.post('/upload', uploadImage('users'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Aucun fichier téléchargé.');
    }
    res.send({ imageUrl: `/assets/img/goodies/${req.file.filename}` });
});
/**
 * @swagger
 * /accounts/upload:
 *   post:
 *     summary: Télécharger une image de compte
 *     tags: [Comptes]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image téléchargée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageUrl:
 *                   type: string
 *                   example: "/assets/img/goodies/image.jpg"
 */

module.exports = router;