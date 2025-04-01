const express = require("express");
const roundsController = require("../controllers/rounds.controller");

var router = express.Router();

router.get("/",roundsController.getRounds);
/**
 * @swagger
 * /rounds:
 *   get:
 *     summary: Récupérer tous les rounds
 *     tags:
 *      - Rounds
 *     responses:
 *       200:
 *         description: Succès
 *       500:
 *         description: Erreur serveur
 */

router.post("/add",roundsController.createRound)
/**
 * @swagger
 * /rounds/add:
 *   post:
 *     summary: Ajouter un nouveau round
 *     tags:
 *      - Rounds
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                name:
 *                  type: string
 *                  example: 1/4 Finale
 *     responses:
 *       201:
 *         description: Round créé avec succès.
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Erreur lors de l'ajout du round
 */

router.patch("/edit",roundsController.editRound)
/**
 * @swagger
 * /rounds/edit:
 *   patch:
 *     summary: Modifier un round existant
 *     tags:
 *      - Rounds
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             id: "1"
 *             name: "1/4 Finale"
 *     responses:
 *       200:
 *         description: Round modifié avec succès.
 *       500:
 *         description: Erreur lors de la modification du round
 */


router.delete("/:id",roundsController.deleteRoundByID)


router.get("/:id",roundsController.getRoundByID);


module.exports = router;