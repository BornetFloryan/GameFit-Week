const express = require("express");
const matchsController = require("../controllers/matchs.controller");

var router = express.Router();

router.get("/",matchsController.getMatchs);
/**
 * @swagger
 * /matchs:
 *   get:
 *     summary: Récupérer tous les matchs
 *     tags:
 *      - Matchs
 *     responses:
 *       200:
 *         description: Succès
 *       500:
 *         description: Erreur serveur
 */

router.post("/add",matchsController.createMatch);
/**
 * @swagger
 * /matchs/add:
 *   post:
 *     summary: Ajouter un nouveau match
 *     tags:
 *      - Matchs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             round_id: "1"
 *             equipe1_id: "1"
 *             equipe2_id: "2"
 *             date_match: "2025-03-25T19:22:26.755Z"
 *     responses:
 *       201:
 *         description: Match créé avec succès.
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Erreur lors de la création du match.
 */

router.patch("/edit",matchsController.editMatch);
/**
 * @swagger
 * /matchs/edit:
 *   patch:
 *     summary: Modifier un match existant
 *     tags:
 *      - Matchs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             id: "1"
 *             round_id: "1"
 *             equipe1_id: "1"
 *             equipe2_id: "2"
 *             date_match: "2025-03-25T19:22:26.755Z"
 *     responses:
 *       200:
 *         description: Match modifié avec succès.
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Erreur lors de la modification du match.
 */

router.delete("/:id",matchsController.deleteMatchByID);
/**
 * @swagger
 * /matchs/{id}:
 *   delete:
 *     summary: Supprimer un match par ID
 *     tags:
 *      - Matchs
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 1
 *         required: true
 *         description: ID du match à supprimer
 *     responses:
 *       200:
 *         description: Match supprimé avec succès.
 *       400:
 *         description: Match non trouvé.
 *       500:
 *         description: Erreur lors de la suppression du match.
 */

router.get("/:id",matchsController.getMatchByID);

module.exports = router;