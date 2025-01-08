const express = require("express");
const accountController = require("../controllers/account.controller");

var router = express.Router();

router.get("/", accountController.getCustomersAccounts);
/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Retrieve all customer accounts
 *     tags: [Accounts]
 *     responses:
 *       200:
 *         description: A list of customer accounts
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

router.post("/login", accountController.loginUser);
/**
 * @swagger
 * /accounts/login:
 *   post:
 *     summary: Login a user
 *     tags: [Accounts]
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
 *         description: User logged in successfully
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
 *         description: Login or password incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
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

router.post("/register", accountController.addCustomerAccount);
/**
 * @swagger
 * /accounts/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Accounts]
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
 *         description: User registered successfully
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
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input"
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

router.put("/profil", accountController.modifyCustomerAccount);
/**
 * @swagger
 * /accounts/profil:
 *   put:
 *     summary: Modify user's profile
 *     tags: [Accounts]
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
 *         description: User profile modified successfully
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
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input"
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

router.delete("/profil", accountController.deleteCustomerAccount);
/**
 * @swagger
 * /accounts/profil:
 *   delete:
 *     summary: Delete user's profile
 *     tags: [Accounts]
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
 *     responses:
 *       200:
 *         description: User profile deleted successfully
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
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input"
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


router.get("/email/:email", accountController.getCustomerByEmail);
/**
 * @swagger
 * /accounts/email/{email}:
 *   get:
 *     summary: Retrieve a customer account by email
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           example: "client@client.com"
 *         description: The customer account email
 *     responses:
 *       200:
 *         description: A customer account
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
 *         description: Customer not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Customer not found"
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

router.get("/name/:name", accountController.getCustomerByName);
/**
 * @swagger
 * /accounts/name/{name}:
 *   get:
 *     summary: Retrieve a customer account by name
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *           example: "client"
 *         description: The customer account name
 *     responses:
 *       200:
 *         description: A customer account
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
 *         description: Customer not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Customer not found"
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

router.get("/:id", accountController.getCustomerById);
/**
 * @swagger
 * /accounts/{id}:
 *   get:
 *     summary: Retrieve a customer account by ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 0
 *         description: The customer account ID
 *     responses:
 *       200:
 *         description: A customer account
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
 *         description: Customer not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Customer not found"
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

module.exports = router;