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
 *                     example: 1
 *                   login:
 *                     type: string
 *                     example: "user1"
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
 *                 example: "test"  # Default value for testing
 *               password:
 *                 type: string
 *                 example: "test"
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
 *                       example: "test"
 *                     login:
 *                       type: string
 *                       example: "test"
 *                     password:
 *                       type: string
 *                       example: "test"
 *                     email:
 *                       type: string
 *                       example: "test@test.com"
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

module.exports = router;
